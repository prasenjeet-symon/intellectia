import { Router } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { PrismaClientSingleton } from '../utils';
import { articleSeriesValidator, articlesObjectValidator, emailObjectValidator, idObjectValidator, idValidatorUnit, topicsObjectValidator } from '../validators';
import { ApiResponse, IHelloWorldResponse, IGetTopics, IGetUserTopics, IGetTopicById, IGetAllArticleSeries, IGetSingleArticleSeries} from '@intellectia/types';

const router: Router = Router();

router.get('/', (_req, res) => {
    const response: ApiResponse<IHelloWorldResponse> = {
        success: true,
        status: 200 /* Done */,
        message: 'Hello World',
    };
    res.status(200).send(response);
    return;
});

/**
 * Fetch all the topics of intellectia
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.get('/topics', async (_req, res) => {
    const prisma = PrismaClientSingleton.prisma;
    const topics: IGetTopics[] = await prisma.topic.findMany();
    const response: ApiResponse<IGetTopics[]> = {
        success: true,
        status: 200 /* Done */,
        data: topics,
    };
    res.status(200).send(response);
    return;
});

/**
 * Fetch all the assigned topics of the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.get('/user/topics', async (_req, res) => {
    const prisma = PrismaClientSingleton.prisma;
    // get all the topics of user
    const topics = await prisma.user.findUnique({
        where: {
            email: res.locals.email,
        },
        select: {
            topics: true,
        },
    });

    if (!topics) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: 'No such User',
        };
        res.status(404).send(response); /* Done */
        return;
    }

    const response: ApiResponse<IGetUserTopics[]> = {
        success: true,
        status: 200,
        data: topics.topics,
    };
    res.status(200).send(response);
    return;
});
/**
 * Get the single topic by id
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.get('/topic/:id', async (req, res) => {
    try {
        const parsedParam = await idObjectValidator.parseAsync(req.params);
        const id = +parsedParam.id;

        const prisma = PrismaClientSingleton.prisma;
        const topic = await prisma.topic.findUnique({
            where: {
                id: id,
            } /* Done */,
        });
        const response: ApiResponse<IGetTopicById | null> = {
            success: true,
            status: 200,
            data: topic,
        };
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }
        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: 'Internal server error',
        };

        res.status(500).send(response);
        return;
    }
});
/**
 *
 * Assign multiple topics to the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.put('/user/topics', async (req, res) => {
    try {
        // topics is the array of numbers
        const parsedBody = await topicsObjectValidator.parseAsync(req.body);
        const parsedLocals = await emailObjectValidator.parseAsync(res.locals);

        const topics = parsedBody.topics.map((topicId) => +topicId);

        const prisma = PrismaClientSingleton.prisma;

        await prisma.user.update({
            where: {
                /* Done */ email: parsedLocals.email,
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
                email: parsedLocals.email,
            },
            data: {
                topics: {
                    connect: topics.map((topicId) => ({
                        id: topicId,
                    })),
                },
            },
        });
        const response: ApiResponse<null> = {
            success: true,
            status: 201,
            message: 'Topic added',
        };

        res.status(201).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }
        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: 'Internal server error',
        };
        res.status(500).send(response);
        return;
    }
});

/**
 *
 * Assign single topic to the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.put('/user/topic', async (req, res) => {
    try {
        const parsedBody = await idObjectValidator.parseAsync(req.body);
        const parsedLocals = await emailObjectValidator.parseAsync(res.locals);
        const topicId = +parsedBody.id;

        const prisma = PrismaClientSingleton.prisma;
        // disconnect the topic from the user
        await prisma.user.update({
            where: {
                email: parsedLocals.email,
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
                email: parsedLocals.email,
            },
            data: {
                topics: {
                    connect: {
                        id: topicId,
                    },
                },
            },
        });

        const response: ApiResponse<null> = {
            success: true,
            status: 201,
            message: 'Topic added',
        };

        res.status(201).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }
        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: { error: 'Internal server error' },
        };
        res.status(500).send(response);
        return;
    }
});

/**
 *
 * Delete single topic from the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.delete('/user/topic/:id', async (req, res) => {
    try {
        const parsedParams = await idObjectValidator.parseAsync(req.params);
        const parsedLocals = await emailObjectValidator.parseAsync(res.locals);

        const topicId = +parsedParams.id;
        const prisma = PrismaClientSingleton.prisma;
        // disconnect the topic from the user
        await prisma.user.update({
            where: {
                email: parsedLocals.email,
            },
            data: {
                topics: {
                    disconnect: {
                        id: topicId,
                    },
                },
            },
        });
        const response: ApiResponse<null> = {
            success: true,
            status: 200,
            message: 'Topic deleted',
        };
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }

        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: { error: 'Internal server error' },
        };
        res.status(500).send(response);
        return;
    }
});
/**
 *
 * Delete multiple topics from the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.delete('/user/topics', async (req, res) => {
    try {
        const parsedBody = await topicsObjectValidator.parseAsync(req.body);
        const parsedLocals = await emailObjectValidator.parseAsync(res.locals);

        const topics = parsedBody.topics.map((topicId) => +topicId);

        const prisma = PrismaClientSingleton.prisma;
        // disconnect all the topics
        await prisma.user.update({
            where: {
                email: parsedLocals.email,
            },
            data: {
                topics: {
                    disconnect: topics.map((topicId) => ({
                        id: topicId,
                    })),
                },
            },
        });
        const response: ApiResponse<null> = {
            success: true,
            status: 200,
            message: 'Topics deleted',
        };
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }

        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: { error: 'Internal server error' },
        };
        res.status(500).send(response);
        return;
    }
});
/**
 * Add an article to the article series
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.put('/user/article_series/:id/article', async (req, res) => {
    try {
        const parsedBody = await idObjectValidator.parseAsync(req.body);
        const parsedParams = await idObjectValidator.parseAsync(req.params);
        const parsedLocals = await emailObjectValidator.parseAsync(res.locals);

        const id = +parsedParams.id; // article series id
        const articleId = +parsedBody.id; // article id

        const prisma = PrismaClientSingleton.prisma;
        // remove old article from the article series
        await prisma.user.update({
            where: {
                email: parsedLocals.email,
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
                email: parsedLocals.email,
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

        const response: ApiResponse<null> = {
            success: true,
            status: 201,
            message: 'Article added to series',
        };

        res.status(201).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }

        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: { error: 'Internal server error' },
        };
        res.status(500).send(response);
        return;
    }
});
/**
 * Delete an article from the article series
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.delete('/user/article_series/:id/article', async (req, res) => {
    try {
        const parsedBody = await idObjectValidator.parseAsync(req.body);
        const parsedParam = await idObjectValidator.parseAsync(req.params);

        const id = +parsedParam.id; // article series id
        const articleId = +parsedBody.id; // article id

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
        const response: ApiResponse<null> = {
            success: true,
            status: 200,
            message: 'Article deleted from series',
        };
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const issue = error.issues[0] as ZodIssue;
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: issue.message },
            };
            res.status(400).send(response);
            return;
        }

        const response: ApiResponse<null> = {
            success: false,
            status: 500,
            error: { error: 'Internal server error' },
        };
        res.status(500).send(response);
        return;
    }
});
/**
 * Add multiple articles to the article series
 */
router.put('/user/article_series/:id/articles', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('articles' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Articles is required' },
        };
        res.status(400).send(response);
        return;
    }

    // articles is array of article ids that is numbers
    if (!Array.isArray(req.body.articles)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Articles is required' },
        };
        res.status(400).send(response);
        return;
    }

    const articleIds = req.body.articles as number[];
    // check if all the articles are valid
    const isArticleIdsValid = articleIds.every((articleId) => {
        return typeof articleId === 'number';
    });

    if (!isArticleIdsValid) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Articles is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Articles added to series',
    };
    res.status(201).send(response);
});
/**
 * Delete multiple articles from the article series
 */
router.delete('/user/article_series/:id/articles', async (req, res) => {
    try {
        const parsedParam = await idObjectValidator.parseAsync(req.params);
        const parsedBody = await articlesObjectValidator.parseAsync(req.body);
        const articleIds = parsedBody.articles.map((articleId) => +articleId);
        const id = +parsedParam.id; // article series id

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
        const response: ApiResponse<null> = {
            success: true,
            status: 200,
            message: 'Articles deleted to series',
        };
        res.status(200).send(response);

        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: error.issues[0]?.message },
            };
            return res.status(400).send(response);
        }
        return res.status(400).json({ error });
    }
});
/**
 * Add article series
 */
router.post('/user/article_series', async (req, res) => {
    // title is required

    const response = articleSeriesValidator.safeParse(req.body);

    if (!response.success) {
        const responseBody: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: response.error.errors[0]?.message },
        };
        res.status(400).send(responseBody);
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
    const responseBody: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Article series created',
    };
    res.send(responseBody);
});

/**
 * Update article series
 */
router.put('/user/article_series/:id', async (req, res) => {
    const idResponse = idValidatorUnit.safeParse({ id: req.params.id });

    if (!idResponse.success) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: idResponse.error.errors[0]?.message },
        };
        res.status(400).send(response);
        return;
    }

    const bodyResponse = articleSeriesValidator.safeParse(req.body);

    if (!bodyResponse.success) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: bodyResponse.error.errors[0]?.message },
        };
        res.status(400).send(response);
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
    const response = {
        success: true,
        status: 201,
        message: 'Article series updated',
    };
    res.status(201).send(response);
});

/**
 * Delete article series
 */
router.delete('/user/article_series/:id', async (req, res) => {
    try {
        const parsedParam = await idObjectValidator.parseAsync(req.params);
        const id = +parsedParam.id; // article series id

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
        const response: ApiResponse<null> = {
            success: true,
            status: 201,
            message: 'Article series deleted',
        };
        res.status(201).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: error.issues[0]?.message },
            };
            return res.status(400).send(response);
        }

        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error },
        };
        return res.status(400).send(response);
    }
});

/**
 * Get all the article series
 */

router.get('/user/article_series', async (_req, res) => {
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
        const response: ApiResponse<null> = {
            success: true,
            status: 404,
            error: { error: 'Article series not found' },
        };
        res.status(404).send(response);
        return;
    }

    // only return article series
    const response: ApiResponse<IGetAllArticleSeries[]> = {
        success: true,
        status: 200,
        data: articleSeries.articleSeries,
    };
    res.status(200).send(response);
});
/**
 * Get single article series
 */
router.get('/user/article_series/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Article series not found' },
        };
        res.status(404).send(response);

        return;
    }

    // only return article series
    const response: ApiResponse<IGetSingleArticleSeries[]> = {
        success: true,
        status: 200,
        data: articleSeries.articleSeries,
    };
    res.status(200).send(response);
});
/**
 * Get all the articles of given article series
 */
router.get('/user/article_series/:id/articles', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Article series not found' },
        };
        res.status(404).send(response);

        return;
    }

    if (articles.articleSeries.length === 0) {
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Article series not found' },
        };
        res.status(404).send(response);
        return;
    }

    // only return articles
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: articles.articleSeries[0]?.articles,
    };
    console.log(typeof articles )
    res.status(200).send(response);
});
/**
 * Add article
 */
router.post('/user/article', async (req, res) => {
    // title is required , subtitle is required, htmlContent is required, markdownContent is required
    if (!('title' in req.body) || !('subtitle' in req.body) || !('htmlContent' in req.body) || !('markdownContent' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Title, subtitle, htmlContent and markdownContent are required' },
        };
        res.status(400).send(response);
        return;
    }

    // title is string, subtitle is string, htmlContent is string, markdownContent is string
    if (!req.body.title || !req.body.subtitle || !req.body.htmlContent || !req.body.markdownContent) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Title, subtitle, htmlContent and markdownContent are required' },
        };
        res.status(400).send(response);
        return;
    }

    if (typeof req.body.title !== 'string' || typeof req.body.subtitle !== 'string' || typeof req.body.htmlContent !== 'string' || typeof req.body.markdownContent !== 'string') {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Title, subtitle, htmlContent and markdownContent are required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Article added',
    };
    res.status(201).send(response);
});
/**
 * Publish article
 */
router.put('/user/article/:id/publish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    // topic ids is required, articleSeriesId is required
    if (!('topics' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Topic ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    const articleId = +req.params.id; // article id
    const topicIds = req.body.topics as number[];
    const articleSeriesId = 'articleSeriesId' in req.body ? req.body.articleSeriesId : 0;

    // check if all the topics are valid
    const isTopicIdsValid = topicIds.every((topicId) => {
        return typeof topicId === 'number';
    });

    if (!isTopicIdsValid) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Topic ids are required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Article published',
    };
    res.status(201).send(response);
});
/**
 * Update article
 */
router.put('/user/article/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    // title is required, subtitle is required, htmlContent is required, markdownContent is required
    if (!('title' in req.body) || !('subtitle' in req.body) || !('htmlContent' in req.body) || !('markdownContent' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Title, subtitle, htmlContent and markdownContent are required' },
        };
        res.status(400).send(response);
        return;
    }

    // title is string, subtitle is string, htmlContent is string, markdownContent is string
    if (!req.body.title || !req.body.subtitle || !req.body.htmlContent || !req.body.markdownContent) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Title, subtitle, htmlContent and markdownContent are required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Article updated',
    };
    res.status(201).send(response);
});
/**
 * Unpublish article
 */
router.put('/user/article/:id/unpublish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article unpublished',
    };
    res.status(200).send(response);
});
/**
 * Republish article
 */
router.put('/user/article/:id/republish', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article republished',
    };
    res.status(200).send(response);
});
/**
 * Get all the articles of user
 */
router.get('/user/articles/:status', async (req, res) => {
    // status is required
    if (!('status' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Status is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.status) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Status is required' },
        };
        res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Articles not found' },
        };
        res.status(404).send(response);

        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: articles.articles,
    };
    res.status(200).send(response);
});
/**
 * Get all the articles of user with pagination
 */
router.get('/user/articles/:status/:size/:cursor', async (req, res) => {
    // cursor is optional but it number , size is required and number , status is required and string
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('status' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Status is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.status) {
        // status is enum of published or unpublished
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Status is required' },
        };
        res.status(400).send(response);
        return;
    }

    // check for types
    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'No articles found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: articles.articles,
    };
    res.status(200).send(response);
});
/**
 * Create a comment
 */
router.post('/user/article/:id/comment', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    // comment is required
    if (!('comment' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Comment is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.body.comment) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Comment is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Comment added',
    };
    res.status(201).send(response);
});
/**
 * Update single comment
 */
router.put('/user/comment/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    // comment is required
    if (!('comment' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Comment is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.body.comment) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Comment is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Comment updated',
    };
    res.status(201).send(response);
});
/**
 * Delete single comment
 */
router.delete('/user/comment/:id', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 201,
        message: 'Comment deleted',
    };
    res.status(201).send(response);
});
/**
 * Get all the parent comments of given article
 */
router.get('/user/article/:id/comments/:size/:cursor', async (req, res) => {
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: comments,
    };
    res.status(200).send(response);
});
/**
 * Get all the replies of given comment
 */
router.get('/user/comment/:id/replies/:size/:cursor', async (req, res) => {
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    // size should be number or convertible to number
    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: replies,
    };
    res.status(200).send(response);
});
/**
 *
 * Add article to read later
 *
 */
router.post('/user/read_later', async (req, res) => {
    // id ( article id ) is required
    if (!('id' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.body.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article added to read later',
    };
    res.status(200).send(response);
});

/**
 *
 * Remove article from read later
 *
 */
router.delete('/user/read_later/:id', async (req, res) => {
    // read later id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article removed from read later',
    };
    res.status(200).send(response);
});

/**
 *
 * Get all the read later articles
 *
 */
router.get('/user/read_later', async (_req, res) => {
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'No articles found' },
        };
        res.status(404).send(response);

        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: readLater.readLater,
    };
    res.status(200).send(response);
    res.send();
});

/**
 *
 * Like an article
 *
 */
router.put('/user/article/:id/like', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Id is required' },
        };
        res.status(404).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Id is required' },
        };
        res.status(404).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article liked',
    };
    res.status(200).send(response);
});

/**
 *
 * Dislike an article
 *
 */
router.put('/user/article/:id/dislike', async (req, res) => {
    // id is required
    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);

        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Article disliked',
    };
    res.status(200).send(response);
});
/**
 *
 * Get all the liked/disliked articles by the user with pagination
 *
 */
router.get('/user/liked_articles/:status/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required, status is required

    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('status' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.status) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'No articles found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: likedArticles.likedArticles,
    };
    res.status(200).send(response);
});

/**
 *
 * Get all the likes/dislikes of the given article with pagination
 *
 */
router.get('/user/article/:id/likes/:status/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required, status is required, id is required

    if (!('id' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!('status' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.status) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Status is required' },
        };
        res.status(400).send(response);
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

    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: likes,
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'User followed',
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'User removed from following',
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        // id cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'User removed from followers',
    };
    res.status(200).send(response);
});
/**
 *
 * Get followers with pagination no suggested users
 *
 */
router.get('/user/followers/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);

        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Followers not found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: followers.followers,
    };
    res.send(response);
});
/**
 *
 * Get followings with pagination no suggested users
 *
 */
router.get('/user/followings/:size/:cursor', async (req, res) => {
    // only cursor is optional , size is required
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Followings not found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: false,
        status: 200,
        data: followings.followings,
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Id is required' },
        };
        res.status(400).send(response);
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
    const response: ApiResponse<null> = {
        success: true,
        status: 200,
        message: 'Suggested user added',
    };
    res.status(200).send(response);
});

/**
 *
 * Get all the suggested users to follow for the logged in user with pagination
 *
 */
router.get('/user/followings/suggest/:size/:cursor', async (req, res) => {
    // size is required, cursor is optional
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if ('cursor' in req.params) {
        if (isNaN(+req.params.cursor)) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Suggested users not found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: suggestedUsers.followings,
    };
    res.status(200).send(response);
});
/**
 * Get suggested users to follow for the logged in user given the size sorted by suggestion count ( asc )
 *
 */
router.get('/user/followings/suggest/:size', async (req, res) => {
    // size is required
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        // size cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Suggested users not found' },
        };
        res.status(404).send(response);
        return;
    }
    const response: ApiResponse<unknown> = {
        success: true,
        status: 200,
        data: suggestedUsers.followings,
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);

        return;
    }

    if (!req.body.ids) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    if (req.body.ids.length === 0) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    const userIds = req.body.ids as number[];
    const isIdsNumbers = userIds.every((id) => {
        return typeof id === 'number';
    });

    if (!isIdsNumbers) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
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
    const response = {
        success: true,
        status: 200,
        message: 'Suggested users updated',
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
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
        const response = {
            success: true,
            status: 200,
            message: 'Article already added',
        };
        res.status(200).send(response);

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
    const response = {
        success: true,
        status: 200,
        message: 'Article added to clicked articles',
    };
    res.status(200).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.id) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Ids are required' },
        };
        res.status(400).send(response);
        return;
    }

    // req.body contains read time of the article
    if (!('readTimeMinutes' in req.body)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Read time is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.body.readTimeMinutes) {
        // read time cannot be 0
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Read time is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.body.readTimeMinutes)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Read time is required' },
        };
        res.status(400).send(response);
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

    if (!article || article.articleReads.length === 0) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Article not found' },
        };
        res.status(400).send(response);
        return;
    }

    // check the article read time
    const articleRead = article.articleReads[0]?.article;
    if (!articleRead) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Article not found' },
        };
        res.status(400).send(response);
        return;
    }

    const articleReadTime = +articleRead.readTimeMinutes;
    const currentReadTime = +readTimeMinutes;
    const totalReadTime = +(article.articleReads[0] ? article.articleReads[0] : { readTimeInMinutes: 0 }).readTimeInMinutes + currentReadTime;
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
    const response = {
        success: true,
        status: 200,
        message: 'Article read time updated',
    };
    res.status(200).send(response);
});
/**
 * Get the read later articles of the logged in user with pagination that are not read
 *
 */
router.get('/user/read-later/unread/:size/:cursor', async (req, res) => {
    // size is required, cursor is optional
    if (!('size' in req.params)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (!req.params.size) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if (isNaN(+req.params.size)) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Size is required' },
        };
        res.status(400).send(response);
        return;
    }

    if ('cursor' in req.params) {
        if (!req.params.cursor) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
            return;
        }

        if (isNaN(+req.params.cursor)) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Cursor is required' },
            };
            res.status(400).send(response);
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
        const response: ApiResponse<null> = {
            success: false,
            status: 404,
            error: { error: 'Saved articles not found' },
        };
        res.status(404).send(response);
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
        const response: ApiResponse<unknown> = {
            success: true,
            status: 200,
            data: onlyUnReadArticles,
        };
        res.status(200).send(response);
    } else {
        const response: ApiResponse<unknown> = {
            success: true,
            status: 200,
            data: articleWithRead,
        };
        res.status(200).send(response);
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
        const users = await prisma.user.findMany({
            include: {
                articleActivities: {
                    take: +size || 10,
                    cursor: {
                        id: +cursor,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
            },
        });

        if (users.length < 1) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: { error: 'Entity not found' },
            };
            return res.status(400).send(response);
        }
        const response:ApiResponse<unknown> = {
            success: true,
            status: 200,
            data: users,
        };
        res.status(200).send(response);
        return;
    } catch (error) {
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error },
        };
        return res.status(400).send(response);
    
        return;
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
router.get('/user/article-stories', () => {
    // fetch all active article stories from the database for the logged in user
    // fetched stories should not contain full article
    // fetched stories should not be expired
    // sort the stories by the createdAt ( desc ) to get the latest stories first
    // stories should contain author minimal information like name, email, profile picture etc
    return;
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
    //
    const prisma = PrismaClientSingleton.prisma;
    const { id } = req.params;

    if (!id){
        const response: ApiResponse<null> = {
            success: false,
            status: 400,
            error: { error: 'Story distribution id is missing' },
        };
        return res.status(400).send(response);
     
    } 

    try {
        await prisma.articleStoryDistribution.update({
            where: {
                id: +id,
            },
            data: {
                isSeen: true,
            },
        });
        const response:ApiResponse<null> = {
            success: true,
            status: 200,
            message:'Story distribution status updated successfully',
        };
      
        return res.status(200).send(response);
    } catch (error) {
        const response:ApiResponse<null> = {
            success : false,
            status:400,
            message:'Story distribution status updated failed',
            error: error
        }
        return res.status(400).send(response);
    }
});

export default router;
