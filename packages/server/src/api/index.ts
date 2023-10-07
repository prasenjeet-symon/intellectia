import { Router } from 'express';
import { PrismaClientSingleton } from '../utils';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

/**
 * Add new blog topic
 * TODO : Admin task
 */
router.post('/topic', async (req, res) => {
    if (!('title' in req.body) || !('description' in req.body)) {
        res.status(400).send({ error: 'Title and description are required' });
        return;
    }

    if (!req.body.title || !req.body.description) {
        res.status(400).send({ error: 'Title and description are required' });
        return;
    }

    const title = req.body.title;
    const description = req.body.description;
    const logo = 'logo' in req.body ? req.body.logo : '';

    // add new blog topic
    const prisma = PrismaClientSingleton.prisma;
    const topic = await prisma.topic.create({
        data: {
            title,
            description,
            logo,
        },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            logo: true,
            updatedAt: true,
        },
    });

    res.send(topic);
});

/**
 *
 * Update the topic by id
 * TODO : Admin task
 *
 */
router.put('/topic/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!('title' in req.body) || !('description' in req.body)) {
        res.status(400).send({ error: 'Title and description are required' });
        return;
    }

    if (!req.body.title || !req.body.description) {
        res.status(400).send({ error: 'Title and description are required' });
        return;
    }

    const id = +req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const logo = 'logo' in req.body ? req.body.logo : '';

    // update the blog topic by id
    const prisma = PrismaClientSingleton.prisma;
    const updatedTopic = await prisma.topic.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            description: description,
            logo: logo,
        },
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            logo: true,
            updatedAt: true,
        },
    });

    res.send(updatedTopic);
});

/**
 *
 * Delete the topic by id
 * TODO : Admin task
 */
router.delete('/topic/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id;
    const prisma = PrismaClientSingleton.prisma;
    const deletedTopic = await prisma.topic.delete({
        where: {
            id: id,
        },
    });

    res.send(deletedTopic);
});

/**
 * Get all topics
 */
router.get('/topics', async (req, res) => {
    const prisma = PrismaClientSingleton.prisma;
    const topics = await prisma.topic.findMany();
    res.send(topics);
});
/**
 * Get the single topic by id
 */
router.get('/topic/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id;

    const prisma = PrismaClientSingleton.prisma;
    const topic = await prisma.topic.findUnique({
        where: {
            id: id,
        },
    });

    res.send(topic);
});
/**
 *
 * Assign multiple topics to the user
 *
 */
router.put('/user/topics', async (req, res) => {
    if (!('topics' in req.body)) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    const topics = req.body.topics as number[];

    if (!Array.isArray(topics)) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    const isTopicIdsValid = topics.every((topicId) => {
        return typeof topicId === 'number';
    });

    if (!isTopicIdsValid) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    const prisma = PrismaClientSingleton.prisma;

    // disconnect all the topics, before adding new topics
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                set: [],
            },
        },
    });

    // connect the topics
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                connect: topics.map((topicId) => ({
                    id: topicId,
                })),
            },
        },
    });

    res.send('Topics added');
});

/**
 *
 * Assign single topic to the user
 *
 */
router.put('/user/topic', async (req, res) => {
    if (!('id' in req.body)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.body.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const topicId = +req.body.id; // topic id

    const prisma = PrismaClientSingleton.prisma;
    // disconnect the topic from the user
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                disconnect: {
                    id: topicId,
                },
            },
        },
    });

    // connect the topic
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                connect: {
                    id: topicId,
                },
            },
        },
    });

    res.send('Topic added');
});

/**
 *
 * Delete the topic by id from the user
 *
 */
router.delete('/user/topic/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const topicId = +req.params.id; // topic id

    const prisma = PrismaClientSingleton.prisma;
    // disconnect the topic from the user
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                disconnect: {
                    id: topicId,
                },
            },
        },
    });

    res.send('Topic deleted');
});
/**
 *
 * Delete multiple topics from the user
 *
 */
router.delete('/user/topics', async (req, res) => {
    // topics is required
    if (!('topics' in req.body)) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    // topics is array of topic ids that is numbers
    if (!Array.isArray(req.body.topics)) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    const topics = req.body.topics as number[];

    // check if all the topics are valid
    const isTopicIdsValid = topics.every((topicId) => {
        return typeof topicId === 'number';
    });

    if (!isTopicIdsValid) {
        res.status(400).send({ error: 'Topics are required' });
        return;
    }

    const prisma = PrismaClientSingleton.prisma;
    // disconnect all the topics
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            topics: {
                disconnect: topics.map((topicId) => ({
                    id: topicId,
                })),
            },
        },
    });

    res.send('Topics deleted');
});
/**
 * Add an article to the article series
 */
router.put('/user/article_series/:id/article', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!('id' in req.body)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.body.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id; // article series id
    const articleId = +req.body.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // remove old article from the article series
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: {
                        id: id,
                    },
                    data: {
                        articles: {
                            disconnect: {
                                id: articleId,
                            },
                        },
                    },
                },
            },
        },
    });

    // add new article to the article series
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: {
                        id: id,
                    },
                    data: {
                        articles: {
                            connect: {
                                id: articleId,
                            },
                        },
                    },
                },
            },
        },
    });

    res.send('Article added to series');
});
/**
 * Delete an article from the article series
 */
router.delete('/user/article_series/:id/article', async (req, res) => {
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // id is required
    if (!('id' in req.body)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.body.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id; // article series id
    const articleId = +req.body.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // disconnect the article from the article series
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: {
                        id: id,
                    },
                    data: {
                        articles: {
                            disconnect: {
                                id: articleId,
                            },
                        },
                    },
                },
            },
        },
    });

    res.send('Article deleted from series');
});
/**
 * Add multiple articles to the article series
 */
router.put('/user/article_series/:id/articles', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!('articles' in req.body)) {
        res.status(400).send({ error: 'Articles is required' });
        return;
    }

    // articles is array of article ids that is numbers
    if (!Array.isArray(req.body.articles)) {
        res.status(400).send({ error: 'Articles is required' });
        return;
    }

    const articleIds = req.body.articles as number[];
    // check if all the articles are valid
    const isArticleIdsValid = articleIds.every((articleId) => {
        return typeof articleId === 'number';
    });

    if (!isArticleIdsValid) {
        res.status(400).send({ error: 'Articles are required' });
        return;
    }

    const id = +req.params.id; // article series id
    const prisma = PrismaClientSingleton.prisma;
    // remove old articles
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: { id: id },
                    data: {
                        articles: {
                            disconnect: articleIds.map((articleId) => ({
                                id: articleId,
                            })),
                        },
                    },
                },
            },
        },
    });

    // add new articles
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: { id: id },
                    data: {
                        articles: {
                            connect: articleIds.map((articleId) => ({
                                id: articleId,
                            })),
                        },
                    },
                },
            },
        },
    });

    res.send('Articles added to series');
});
/**
 * Delete multiple articles from the article series
 */
router.delete('/user/article_series/:id/articles', async (req, res) => {
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // articles is array of article ids that is numbers
    if (!Array.isArray(req.body.articles)) {
        res.status(400).send({ error: 'Articles is required' });
        return;
    }

    const articleIds = req.body.articles as number[];
    const id = +req.params.id; // article series id

    const isArticleIdsValid = articleIds.every((articleId) => {
        return typeof articleId === 'number';
    });

    if (!isArticleIdsValid) {
        res.status(400).send({ error: 'Articles are required' });
        return;
    }

    const prisma = PrismaClientSingleton.prisma;

    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: {
                        id: id,
                    },
                    data: {
                        articles: {
                            disconnect: articleIds.map((articleId) => ({
                                id: articleId,
                            })),
                        },
                    },
                },
            },
        },
    });

    res.send('Articles deleted from series');
});
/**
 * Add article series
 */
router.post('/user/article_series', async (req, res) => {
    // title is required
    if (!('title' in req.body)) {
        res.status(400).send({ error: 'Title is required' });
        return;
    }

    if (!req.body.title) {
        res.status(400).send({ error: 'Title is required' });
        return;
    }

    const title = req.body.title as string;
    const prisma = PrismaClientSingleton.prisma;

    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                create: {
                    title: title,
                },
            },
        },
    });

    res.send('Article series created');
});

/**
 * Update article series
 */
router.put('/user/article_series/:id', async (req, res) => {
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!('title' in req.body)) {
        res.status(400).send({ error: 'Title is required' });
        return;
    }

    const title = req.body.title as string;
    const description = 'description' in req.body ? req.body.description : '';
    const logo = 'logo' in req.body ? req.body.logo : '';
    const id = +req.params.id; // article series id

    const prisma = PrismaClientSingleton.prisma;
    // update article series
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: {
                        id: id,
                    },
                    data: {
                        title: title,
                        description: description,
                        logo: logo,
                    },
                },
            },
        },
    });

    res.send('Article series updated');
});

/**
 * Delete article series
 */
router.delete('/user/article_series/:id', async (req, res) => {
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id; // article series id

    const prisma = PrismaClientSingleton.prisma;
    // disconnect all articles from article series
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                update: {
                    where: { id: id },
                    data: {
                        articles: {
                            set: [],
                        },
                    },
                },
            },
        },
    });

    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleSeries: {
                delete: {
                    id: id,
                },
            },
        },
    });

    res.send('Article series deleted');
});

/**
 * Get all the article series
 */
router.get('/user/article_series', async (req, res) => {
    const prisma = PrismaClientSingleton.prisma;
    const articleSeries = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            articleSeries: true,
        },
    });

    if (!articleSeries) {
        res.status(404).send({ error: 'Article series not found' });
        return;
    }

    // only return article series
    res.send(articleSeries.articleSeries);
});
/**
 * Get single article series
 */
router.get('/user/article_series/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id; // article series id

    const prisma = PrismaClientSingleton.prisma;
    const articleSeries = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            articleSeries: {
                where: {
                    id: id,
                },
            },
        },
    });

    if (!articleSeries) {
        res.status(404).send({ error: 'Article series not found' });
        return;
    }

    // only return article series
    res.send(articleSeries.articleSeries);
});
/**
 * Get all the articles of given article series
 */
router.get('/user/article_series/:id/articles', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const id = +req.params.id; // article series id

    const prisma = PrismaClientSingleton.prisma;
    // get all the articles of given article series
    const articles = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            articleSeries: {
                where: {
                    id: id,
                },
                select: {
                    articles: {
                        include: {
                            topics: true,
                        },
                    },
                },
            },
        },
    });

    if (!articles) {
        res.status(404).send({ error: 'Article series not found' });
        return;
    }

    if (articles.articleSeries.length === 0) {
        res.status(404).send({ error: 'Article series not found' });
        return;
    }

    // only return articles
    res.send(articles.articleSeries[0].articles);
});
/**
 * Add article
 */
router.post('/user/article', async (req, res) => {
    // title is required , subtitle is required, htmlContent is required, markdownContent is required
    if (!('title' in req.body) || !('subtitle' in req.body) || !('htmlContent' in req.body) || !('markdownContent' in req.body)) {
        res.status(400).send({ error: 'Title, subtitle, htmlContent and markdownContent are required' });
        return;
    }

    // title is string, subtitle is string, htmlContent is string, markdownContent is string
    if (!req.body.title || !req.body.subtitle || !req.body.htmlContent || !req.body.markdownContent) {
        res.status(400).send({ error: 'Title, subtitle, htmlContent and markdownContent are required' });
        return;
    }

    if (typeof req.body.title !== 'string' || typeof req.body.subtitle !== 'string' || typeof req.body.htmlContent !== 'string' || typeof req.body.markdownContent !== 'string') {
        res.status(400).send({ error: 'Title, subtitle, htmlContent and markdownContent are required' });
        return;
    }

    const title = req.body.title as string;
    const subtitle = req.body.subtitle as string;
    const htmlContent = req.body.htmlContent as string;
    const markdownContent = req.body.markdownContent as string;

    const prisma = PrismaClientSingleton.prisma;

    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articles: {
                create: {
                    title: title,
                    subtitle: subtitle,
                    htmlContent: htmlContent,
                    markdownContent: markdownContent,
                    readTimeMinutes: 0,
                },
            },
        },
    });

    res.send('Article added');
});
/**
 * Publish article
 */
router.put('/user/article/:id/publish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // topic ids is required, articleSeriesId is required
    if (!('topicIds' in req.body)) {
        res.status(400).send({ error: 'Topic ids are required' });
        return;
    }

    const articleId = +req.params.id; // article id
    const topicIds = req.body.topicIds as number[];
    const articleSeriesId = 'articleSeriesId' in req.body ? req.body.articleSeriesId : 0;

    // check if all the topics are valid
    const isTopicIdsValid = topicIds.every((topicId) => {
        return typeof topicId === 'number';
    });

    if (!isTopicIdsValid) {
        res.status(400).send({ error: 'Topic ids are invalid' });
        return;
    }

    const prisma = PrismaClientSingleton.prisma;
    // update the article and connect the topics
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articles: {
                update: {
                    where: {
                        id: articleId,
                    },
                    data: {
                        isPublished: true,
                        topics: {
                            connect: topicIds.map((topicId) => {
                                return {
                                    id: topicId,
                                };
                            }),
                        },
                    },
                },
            },
        },
    });

    // if the article is published, update the article series
    if (articleSeriesId) {
        await prisma.user.update({
            where: {
                email: res.locals.email,
            },
            data: {
                articleSeries: {
                    update: {
                        where: {
                            id: articleSeriesId,
                        },
                        data: {
                            articles: {
                                connect: {
                                    id: articleId,
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    res.send('Article published');
});
/**
 * Update article
 */
router.put('/user/article/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // title is required, subtitle is required, htmlContent is required, markdownContent is required
    if (!('title' in req.body) || !('subtitle' in req.body) || !('htmlContent' in req.body) || !('markdownContent' in req.body)) {
        res.status(400).send({ error: 'Title, subtitle, htmlContent and markdownContent are required' });
        return;
    }

    // title is string, subtitle is string, htmlContent is string, markdownContent is string
    if (!req.body.title || !req.body.subtitle || !req.body.htmlContent || !req.body.markdownContent) {
        res.status(400).send({ error: 'Title, subtitle, htmlContent and markdownContent are required' });
        return;
    }

    const articleId = +req.params.id; // article id
    const title = req.body.title as string;
    const subtitle = req.body.subtitle as string;
    const htmlContent = req.body.htmlContent as string;
    const markdownContent = req.body.markdownContent as string;
    const coverImage = 'coverImage' in req.body ? req.body.coverImage : '';

    const prisma = PrismaClientSingleton.prisma;
    // update the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articles: {
                update: {
                    where: {
                        id: articleId,
                    },
                    data: {
                        title: title,
                        subtitle: subtitle,
                        htmlContent: htmlContent,
                        markdownContent: markdownContent,
                        coverImage: coverImage,
                    },
                },
            },
        },
    });

    res.send('Article updated');
});
/**
 * Unpublish article
 */
router.put('/user/article/:id/unpublish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // update the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articles: {
                update: {
                    where: {
                        id: articleId,
                    },
                    data: {
                        isPublished: false,
                    },
                },
            },
        },
    });

    res.send('Article unpublished');
});
/**
 * Republish article
 */
router.put('/user/article/:id/republish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // update the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articles: {
                update: {
                    where: {
                        id: articleId,
                    },
                    data: {
                        isPublished: true,
                    },
                },
            },
        },
    });

    res.send('Article republished');
});
/**
 * Get all the articles of user
 */
router.get('/user/articles/:status', async (req, res) => {
    // status is required
    if (!('status' in req.params)) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    if (!req.params.status) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    const status = req.params.status as string;

    const prisma = PrismaClientSingleton.prisma;
    // get all the articles
    const articles = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        include: {
            articles: {
                where: {
                    isPublished: status === 'published' ? true : false,
                },
                include: {
                    topics: true,
                },
            },
        },
    });

    if (!articles) {
        res.status(404).send({ error: 'Articles not found' });
        return;
    }

    res.send(articles.articles);
});
/**
 * Get all the articles of user with pagination
 */
router.get('/user/articles/:status/:size/:cursor', async (req, res) => {
    // cursor is optional but it number , size is required and number , status is required and string
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!('status' in req.params)) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    if (!req.params.status) {
        // status is enum of published or unpublished
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    // check for types
    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }
    }

    const status = req.params.status as string;
    const size = +req.params.size; // size
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0;

    const prisma = PrismaClientSingleton.prisma;
    // get all the articles
    const articles = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        include: {
            articles: {
                where: {
                    isPublished: status === 'published' ? true : false,
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    topics: true,
                },
                take: size,
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!articles) {
        res.status(404).send({ error: 'No articles found' });
        return;
    }

    res.send(articles.articles);
});
/**
 * Create a comment
 */
router.post('/user/article/:id/comment', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // comment is required
    if (!('comment' in req.body)) {
        res.status(400).send({ error: 'Comment is required' });
        return;
    }

    if (!req.body.comment) {
        res.status(400).send({ error: 'Comment is required' });
        return;
    }

    const articleId = +req.params.id; // article id
    const comment = req.body.comment as string;
    const parentCommentId = 'parentCommentId' in req.body ? req.body.parentCommentId : 0;

    const prisma = PrismaClientSingleton.prisma;

    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            comment: {
                create: {
                    content: comment,
                    parentComment: parentCommentId
                        ? {
                              connect: {
                                  id: parentCommentId,
                              },
                          }
                        : undefined,
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            },
        },
    });

    res.send('Comment added');
});
/**
 * Update single comment
 */
router.put('/user/comment/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // comment is required
    if (!('comment' in req.body)) {
        res.status(400).send({ error: 'Comment is required' });
        return;
    }

    if (!req.body.comment) {
        res.status(400).send({ error: 'Comment is required' });
        return;
    }

    const commentId = +req.params.id; // comment id
    const comment = req.body.comment as string;

    const prisma = PrismaClientSingleton.prisma;
    // update the comment
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            comment: {
                update: {
                    where: {
                        id: commentId,
                    },
                    data: {
                        content: comment,
                    },
                },
            },
        },
    });

    res.send('Comment updated');
});
/**
 * Delete single comment
 */
router.delete('/user/comment/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const commentId = +req.params.id; // comment id

    const prisma = PrismaClientSingleton.prisma;
    // delete the comment and all it's replies
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            comment: {
                delete: {
                    id: commentId,
                },
            },
        },
    });

    res.send('Comment deleted');
});
/**
 * Get all the parent comments of given article
 */
router.get('/user/article/:id/comments/:size/:cursor', async (req, res) => {
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const size = +req.params.size;
    const articleId = +req.params.id; // article id
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0;

    const prisma = PrismaClientSingleton.prisma;
    // get all the parent comments
    const comments = await prisma.comment.findMany({
        where: {
            articleId: articleId,
            parentComment: {
                is: null,
            },
            id: {
                gt: cursor,
            },
        },
        take: size,
        include: {
            author: true,
        },
        orderBy: {
            id: 'asc',
        },
    });

    res.send(comments);
});
/**
 * Get all the replies of given comment
 */
router.get('/user/comment/:id/replies/:size/:cursor', async (req, res) => {
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    // size should be number or convertible to number
    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const size = +req.params.size; // size
    const commentId = +req.params.id; // comment id
    const cursor = 'cursor' in req.params ? +req.params.cursor : undefined;
    const prisma = PrismaClientSingleton.prisma;

    const replies = await prisma.comment.findMany({
        where: {
            parentComment: {
                id: commentId,
            },
            id: {
                gt: cursor,
            },
        },
        include: {
            author: true,
        },
        take: size,
        orderBy: {
            id: 'asc',
        },
    });

    res.send(replies);
});
/**
 *
 * Add article to read later
 *
 */
router.post('/user/read_later', async (req, res) => {
    // id ( article id ) is required
    if (!('id' in req.body)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.body.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.body.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // add the article to read later
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            readLater: {
                create: {
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            },
        },
    });

    res.send('Article added to read later');
});

/**
 *
 * Remove article from read later
 *
 */
router.delete('/user/read_later/:id', async (req, res) => {
    // read later id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const readLaterId = +req.params.id; // read later id

    const prisma = PrismaClientSingleton.prisma;
    // remove the article from read later
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            readLater: {
                delete: {
                    id: readLaterId,
                },
            },
        },
    });

    res.send('Article removed from read later');
});

/**
 *
 * Get all the read later articles
 *
 */
router.get('/user/read_later', async (req, res) => {
    const prisma = PrismaClientSingleton.prisma;
    const readLater = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            readLater: {
                include: {
                    article: {
                        include: {
                            topics: true,
                            user: true,
                        },
                    },
                },
            },
        },
    });

    if (!readLater) {
        res.status(404).send({ error: 'No articles found' });
        return;
    }

    res.send(readLater.readLater);
});

/**
 *
 * Like an article
 *
 */
router.put('/user/article/:id/like', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // remove old dislike if there is one
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            likedArticles: {
                deleteMany: {
                    articleId: articleId,
                },
            },
        },
    });

    // like the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            likedArticles: {
                create: {
                    status: 'liked',
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            },
        },
    });

    res.send('Article liked');
});

/**
 *
 * Dislike an article
 *
 */
router.put('/user/article/:id/dislike', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // remove old like if there is one
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            likedArticles: {
                deleteMany: {
                    articleId: articleId,
                },
            },
        },
    });

    // dislike the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            likedArticles: {
                create: {
                    status: 'disliked',
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            },
        },
    });

    res.send('Article disliked');
});
/**
 *
 * Get all the liked/disliked articles by the user with pagination
 *
 */
router.get('/user/liked_articles/:status/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required, status is required

    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!('status' in req.params)) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    if (!req.params.status) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    const size = +req.params.size; // size
    const status = req.params.status as string; // like status
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0; // cursor

    const prisma = PrismaClientSingleton.prisma;

    // get liked/disliked articles
    const likedArticles = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            likedArticles: {
                where: {
                    status: status === 'liked' ? 'liked' : 'disliked',
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    article: {
                        include: {
                            topics: true,
                            user: true,
                        },
                    },
                },
                take: size,
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!likedArticles) {
        res.status(404).send({ error: 'No articles found' });
        return;
    }

    res.send(likedArticles.likedArticles);
});

/**
 *
 * Get all the likes/dislikes of the given article with pagination
 *
 */
router.get('/user/article/:id/likes/:status/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required, status is required, id is required

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!('status' in req.params)) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    if (!req.params.status) {
        res.status(400).send({ error: 'Status is required' });
        return;
    }

    const id = +req.params.id; // article id
    const status = req.params.status as string; // like status
    const size = +req.params.size; // size
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0; // cursor

    const prisma = PrismaClientSingleton.prisma;
    const likes = await prisma.like.findMany({
        where: {
            articleId: id,
            status: status === 'liked' ? 'liked' : 'disliked',
            id: {
                gt: cursor,
            },
        },
        include: {
            user: true,
        },
        take: size,
        orderBy: {
            id: 'asc',
        },
    });

    res.send(likes);
});
/**
 *
 * Follow an user removing old follow if there is, that may be suggested user
 *
 */
router.put('/user/follow/:id', async (req, res) => {
    // ( user 1 ) o------> ( user 2 )
    // user 1 is the follower of user 2
    // user 2 is the following of user 1
    // id  ( user 2 user id )
    // user 1 is always the logged in user who can follow user 2

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const user2Id = +req.params.id; // user 2 id
    const prisma = PrismaClientSingleton.prisma;
    // remove old follow if there is one
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                deleteMany: {
                    followedId: user2Id,
                },
            },
        },
    });

    // follow the user
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                create: {
                    followed: {
                        connect: {
                            id: user2Id,
                        },
                    },
                },
            },
        },
    });

    res.send('User followed');
});
/**
 *
 * Remove from following also suggested
 *
 */
router.delete('/user/follow/:id', async (req, res) => {
    // ( user 1 ) o------> ( user 2 )
    // user 1 is the follower of user 2
    // user 2 is the following of user 1
    // id  ( user 2 user id )
    // user 1 is always the logged in user who can follow user 2

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const user2Id = +req.params.id; // user 2 id
    const prisma = PrismaClientSingleton.prisma;
    // remove old follow if there is one
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                deleteMany: {
                    followedId: user2Id,
                },
            },
        },
    });

    res.send('User removed from following');
});
/**
 *
 * Remove from followers
 *
 */
router.delete('/user/follower/:id', async (req, res) => {
    // ( user 1 ) o------> ( user 2 )
    // user 1 is the follower of user 2
    // user 2 is the following of user 1
    // in this case user 2 is logged in user
    // id  ( user 1 user id )

    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const user1Id = +req.params.id; // user 1 id
    const prisma = PrismaClientSingleton.prisma;
    // remove the follower
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followers: {
                deleteMany: {
                    followerId: user1Id,
                },
            },
        },
    });

    res.send('User removed from followers');
});
/**
 *
 * Get followers with pagination no suggested users
 *
 */
router.get('/user/followers/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }
    }

    const size = +req.params.size; // size
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0; // cursor
    const prisma = PrismaClientSingleton.prisma;
    // Get followers
    const followers = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            followers: {
                where: {
                    isSuggested: false,
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    follower: true,
                },
                take: size,
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!followers) {
        res.status(404).send({ error: 'Followers not found' });
        return;
    }

    res.send(followers.followers);
});
/**
 *
 * Get followings with pagination no suggested users
 *
 */
router.get('/user/followings/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }
    }

    const size = +req.params.size; // size
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0; // cursor
    const prisma = PrismaClientSingleton.prisma;
    // Get followings
    const followings = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            followings: {
                where: {
                    isSuggested: false,
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    followed: true,
                },
                take: size,
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!followings) {
        res.status(404).send({ error: 'Followings not found' });
        return;
    }

    res.send(followings.followings);
});
/**
 *
 * Add suggested user
 *
 */
router.put('/user/follow/suggest/:id', async (req, res) => {
    // id is the user id of suggested user to the logged in user
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const userId = +req.params.id; // user id

    const prisma = PrismaClientSingleton.prisma;
    // remove old suggested user if any
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                deleteMany: {
                    followedId: userId,
                },
            },
        },
    });

    // add new suggested user
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                create: {
                    followed: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            },
        },
    });

    res.send('Suggested user added');
});

/**
 *
 * Get all the suggested users to follow for the logged in user with pagination
 *
 */
router.get('/user/followings/suggest/:size/:cursor', async (req, res) => {
    // size is required, cursor is optional
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }
    }

    const size = +req.params.size; // size
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0; // cursor

    const prisma = PrismaClientSingleton.prisma;
    // Get suggested users
    const suggestedUsers = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            followings: {
                where: {
                    isSuggested: true,
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    followed: true,
                },
                take: size,
                distinct: ['followedId'],
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!suggestedUsers) {
        res.status(404).send({ error: 'Suggested users not found' });
        return;
    }

    res.send(suggestedUsers.followings);
});
/**
 * Get suggested users to follow for the logged in user given the size sorted by suggestion count ( asc )
 *
 */
router.get('/user/followings/suggest/:size', async (req, res) => {
    // size is required
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    const size = +req.params.size; // size
    const prisma = PrismaClientSingleton.prisma;
    // Get suggested users
    const suggestedUsers = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            followings: {
                where: {
                    isSuggested: true,
                },
                include: {
                    followed: true,
                },
                take: size,
                distinct: ['followedId'],
                orderBy: {
                    suggestionCount: 'asc',
                },
            },
        },
    });

    if (!suggestedUsers) {
        res.status(404).send({ error: 'Suggested users not found' });
        return;
    }

    res.send(suggestedUsers.followings);
});
/**
 *
 * Update the suggestion count of the suggested users
 *
 */
router.put('/user/followings/suggest', async (req, res) => {
    // req body should contain ids of the suggested users
    // ids are required
    if (!('ids' in req.body)) {
        res.status(400).send({ error: 'Ids are required' });
        return;
    }

    if (!req.body.ids) {
        res.status(400).send({ error: 'Ids are required' });
        return;
    }

    if (req.body.ids.length === 0) {
        res.status(400).send({ error: 'Ids are required' });
        return;
    }

    const userIds = req.body.ids as number[];
    const isIdsNumbers = userIds.every((id) => {
        return typeof id === 'number';
    });

    if (!isIdsNumbers) {
        res.status(400).send({ error: 'Ids are required' });
        return;
    }

    const prisma = PrismaClientSingleton.prisma;
    // update the suggestion count
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            followings: {
                updateMany: {
                    data: {
                        suggestionCount: {
                            increment: 1,
                        },
                    },
                    where: {
                        followedId: {
                            in: userIds,
                        },
                    },
                },
            },
        },
    });

    res.send('Suggested users updated');
});
/**
 *
 * Add article to clicked articles, if already added then do nothing
 *
 */
router.put('/user/article-reads/:id', async (req, res) => {
    // id is the article id of the article to be added
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // check if the article is already added
    const article = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            articleReads: {
                where: {
                    article: {
                        id: articleId,
                    },
                },
            },
        },
    });

    if (article) {
        res.send('Article already added');
        return;
    }

    // add the article
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleReads: {
                create: {
                    article: {
                        connect: {
                            id: articleId,
                        },
                    },
                },
            },
        },
    });

    res.send('Article added to clicked articles');
});
/**
 *
 * Update the read time and percentage read of the article with the given id
 * If the read time exceeds total reading time of the article then the article will be unaffected
 * Also increase the readCount of the article if under total reading time of the article
 */
router.put('/user/article-reads/:id/time', async (req, res) => {
    // id is the article id of the article to be added
    // id is required
    if (!('id' in req.params)) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    if (!req.params.id) {
        res.status(400).send({ error: 'Id is required' });
        return;
    }

    // req.body contains read time of the article
    if (!('readTimeMinutes' in req.body)) {
        res.status(400).send({ error: 'Read time is required' });
        return;
    }

    if (!req.body.readTimeMinutes) {
        // read time cannot be 0
        res.status(400).send({ error: 'Read time is required' });
        return;
    }

    if (isNaN(+req.body.readTimeMinutes)) {
        res.status(400).send({ error: 'Read time is required' });
        return;
    }

    const readTimeMinutes = +req.body.readTimeMinutes; // read time
    const articleId = +req.params.id; // article id

    const prisma = PrismaClientSingleton.prisma;
    // check if the article is already added
    const article = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            articleReads: {
                where: {
                    article: {
                        id: articleId,
                    },
                },
                include: {
                    article: true,
                },
            },
        },
    });

    if (!article) {
        res.status(400).send({ error: 'Article not found' });
        return;
    }

    // check the article read time
    const articleReadTime = +article.articleReads[0].article.readTimeMinutes;
    const currentReadTime = +readTimeMinutes;
    const totalReadTime = +article.articleReads[0].readTimeInMinutes + currentReadTime;
    let finalReadTime = 0;
    // check if the read time exceeds total reading time of the article
    if (totalReadTime >= articleReadTime) {
        finalReadTime = articleReadTime;
    } else {
        finalReadTime = totalReadTime;
    }

    const percentageRead = Math.round((finalReadTime / articleReadTime) * 100);
    // update the read time
    await prisma.user.update({
        where: {
            email: res.locals.email,
        },
        data: {
            articleReads: {
                updateMany: {
                    data: {
                        readTimeInMinutes: +finalReadTime,
                        readPercentage: +percentageRead,
                    },
                    where: {
                        articleId: articleId,
                    },
                },
            },
        },
    });

    res.send('Article read time updated');
});
/**
 * Get the read later articles of the logged in user with pagination that are not read
 *
 */
router.get('/user/read-later/unread/:size/:cursor', async (req, res) => {
    // size is required, cursor is optional
    if (!('size' in req.params)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (!req.params.size) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if (isNaN(+req.params.size)) {
        res.status(400).send({ error: 'Size is required' });
        return;
    }

    if ('cursor' in req.params) {
        if (!req.params.cursor) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }

        if (isNaN(+req.params.cursor)) {
            res.status(400).send({ error: 'Cursor is required' });
            return;
        }
    }

    const size = +req.params.size;
    const cursor = 'cursor' in req.params ? +req.params.cursor : 0;
    const prisma = PrismaClientSingleton.prisma;

    const isArticleRead = async (articleId: number) => {
        const article = await prisma.user.findUnique({
            where: {
                email: res.locals.email,
            },
            select: {
                articleReads: {
                    where: {
                        readPercentage: {
                            gte: 10, // if the read percentage is less than 10 then the article is not read
                        },
                        article: {
                            id: articleId,
                        },
                    },
                },
            },
        });

        if (!article) {
            return false;
        }

        if (article.articleReads.length === 0) {
            return false;
        }

        return true;
    };

    // fetch all the saved articles
    const savedArticles = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            readLater: {
                where: {
                    id: {
                        gt: cursor,
                    },
                },
                include: {
                    article: true,
                },
                take: size,
                orderBy: {
                    id: 'asc',
                },
            },
        },
    });

    if (!savedArticles) {
        res.status(404).send({ error: 'Saved articles not found' });
        return;
    }

    // filter the saved articles that are not read
    const articleWithReadPromises = savedArticles.readLater.map(async (rA) => {
        const article = await isArticleRead(rA.articleId);
        return {
            ...rA,
            isRead: article,
        };
    });

    const articleWithRead = await Promise.all(articleWithReadPromises);

    if (cursor < 0) {
        const onlyUnReadArticles = articleWithRead.filter((a) => {
            return !a.isRead;
        });

        res.send(onlyUnReadArticles);
    } else {
        res.send(articleWithRead);
    }
});

/**
 * Get user activities of the logged in user with pagination ( latest first )
 */
router.get('/user/article-activities/:size/:cursor', async (req, res) => {
    const { size, cursor } = req.params;

    if (+cursor <= 0 || +size <= 1) return res.status(400).json({ error: 'cursor cannot be less than 0 and/or size cannot be less than 1' });

    const prisma = PrismaClientSingleton.prisma;

    try {
        const userActivities = await prisma.userActivity.findMany({
            skip: 1,
            take: +size || 10,
            cursor: {
                id: +cursor,
            },
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
            },
        });

        if (userActivities.length < 1) return res.status(400).json({ error: 'Entity not found' });

        res.json(userActivities);
    } catch (error) {
        res.status(400).json({ error });
    }

    // size is required, cursor is required
    // both size and cursor is integer
    // size >= 1 and cursor >= 0
    // fetch article activities from the database sorted by the id ( desc ) and take ( size ) elements at a time
    // this way we can fetch the latest activities from the database
    // map the final result to include the activity's message that convey the activity in human readable form. i.e "Prasenjeet Kumar like an article 'Introduction to Docker'".
    // result should not contain full article just the minimal information needed to convey the activity in human readable form and to generate the link on the frontend to nav to full article page.
});

/**
 * Get all active article stories of the logged in user to see
 */
router.get('/user/article-stories', async (req, res) => {
    // fetch all active article stories from the database for the logged in user
    // fetched stories should not contain full article
    // fetched stories should not be expired
    // sort the stories by the createdAt ( desc ) to get the latest stories first
    // stories should contain author minimal information like name, email, profile picture etc
});
/**
 * Mark the story as seen by the logged in user given the story distribution id
 */
router.put('/user/article-story/:id', async (req, res) => {
    // id is required
    // id is the id of the story distribution
    // only the isSeen property can be updated for the article distribution
    // update the isSeen property to true ( even if already updated )
    // return the meaning full message to the user
});

export default router;
