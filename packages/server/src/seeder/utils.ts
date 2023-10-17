import { faker } from '@faker-js/faker';
import { Article, User } from '@prisma/client';
import { UniqueEnforcer } from 'enforce-unique';
import * as fs from 'fs';
import path from 'path';
import showdown from 'showdown';
import { PrismaClientSingleton } from '../utils';
/**
 * Create new user given email and password
 */
export async function createUserWithEmailPassword(email: string, password: string): Promise<void> {
    // add new user to database
    // use the email and password
    // if the user already exit then just return silently
    // use prisma client directly ( no api call )
}

/**
 * Parse the Markdown file to JSON
 */
export async function markdownToJSON(): Promise<{
    title: string;
    subTitle: string;
    coverImage: string;
    markdownContent: string;
    htmlContent: string;
}> {
    try {
        /* extracting HTML content using specified function markdownToHTML */
        const catFile = path.join(__dirname, '..', '/assets/catOnTheMoon.md');
        let htmlContent = await markdownToHTML(catFile);
        if (!htmlContent) {
            throw new Error('Markdown to HTML conversion failed');
        }

        /* read selected file synchronously */
        const data = fs.readFileSync(catFile, 'utf8');

        // Regex that to get YAML data from markdown
        const charsBetweenHyphens = /^---([\s\S]*?)---/;

        // If file has metadata it will be extracted
        const metadataMatched = data.match(charsBetweenHyphens);

        // Extracted metadata
        const metadata = metadataMatched![1];

        if (!metadata) {
            throw new Error('No metadata found');
        }

        // split metadata into lines by '\n' getting strings containing the metadata
        const metadataLines = metadata.split('\n');

        /* metadata is now an array consisting of strings containing yaml front matter */
        /* Title, subtitle and coverImage can be extracted from metadata array by calling their respective indexes in metadata array and splitting corresponding strings at ':' */
        /* trim() to removed whitespace at start and end of strings */
        let title = metadataLines[1]!.split(':')[1]!.trim();
        let subTitle = metadataLines[2]!.split(':')[1]!.trim();
        let image = metadataLines[3]!.split(':')[1]!.trim();
        let markdownContent = data.split('---')[2]!;

        //return data in JSON format
        return {
            title,
            subTitle,
            coverImage: `/server/media/${image}`,
            markdownContent,
            htmlContent: htmlContent.HTML,
        };
    } catch (error: any) {
        /* catch any errors that might occur */
       console.error(error);
       throw error;
    }
}

/**
 * Parse the Markdown to HTML
 */
// used showdown (https://www.npmjs.com/package/showdown)
export async function markdownToHTML(inputPath: string): Promise<{ HTML: string } | undefined> {
    try {
        const data: string = fs.readFileSync(inputPath, 'utf8');
        const converter = new showdown.Converter();
        const result = converter.makeHtml(data);
        return { HTML: result };
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

/**
 * Generate the fake article for the seeding
 */
export async function generateFakeArticle(): Promise<
    | {
          title: string;
          subtitle: string;
          htmlContent: string;
          markdownContent: string;
          coverImage: string;
          readTimeMinutes: number;
      }
    | undefined
> {
    const JSONData = await markdownToJSON();
    if (!JSONData) {
        return;
    }

    // Generate fake data using faker library
    const title = faker.lorem.sentence();
    const subtitle = faker.lorem.sentence();
    const htmlContent = JSONData.htmlContent;
    const markdownContent = JSONData.markdownContent;
    const coverImage = faker.image.imageUrl();
    const readTimeMinutes = faker.datatype.number({ min: 1, max: 10, precision: 1 });

    // Construct the article object to return
    const article = {
        title: title,
        subtitle: subtitle,
        htmlContent: htmlContent,
        markdownContent: markdownContent,
        coverImage: coverImage,
        readTimeMinutes: readTimeMinutes,
    };

    console.log('IN ARTICLE');

    console.log(article.title);

    return article;
}

/**
 * Generate the fake user for the seeding
 */
export async function generateFakeUser(): Promise<{
    email: string;
    password: string;
    username: string;
    userId: string;
    fullName: string;
}> {
    const uniqueEnforcer = new UniqueEnforcer();
    return {
        email: uniqueEnforcer.enforce(() =>
            faker.internet.email({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
            }),
        ),
        password: faker.internet.password(),
        username: uniqueEnforcer.enforce(() => faker.internet.userName()),
        userId: faker.string.uuid(),
        fullName: `${faker.person.firstName()} ${faker.person.lastName()} `,
    };
}
/**
 * Create articles to the database
 */
export async function createArticlesPerUser(email: string, numberOfArticles: number): Promise<void> {
    // email : email id of the target user ( main user in focus )
    // Create articles to the database
    // use the function generateFakeArticle to generate fake article
    // initially article should be created in draft form ( isPublished status set to false )

    const prisma = PrismaClientSingleton.prisma;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return;
    }

    for (let i = 0; i < numberOfArticles; i++) {
        const fakeArticle = await generateFakeArticle();

        Promise.resolve(fakeArticle).then((article) => {
            console.log('TITTLE');
            console.log(article!.title);
        });

        const title = fakeArticle!.title;
        const subTitle = fakeArticle!.subtitle;
        const htmlContent = fakeArticle!.htmlContent;
        const markdownContent = fakeArticle!.markdownContent;

        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                articles: {
                    create: {
                        title: title,
                        subtitle: subTitle,
                        htmlContent: htmlContent,
                        markdownContent: markdownContent,
                        readTimeMinutes: 0,
                    },
                },
            },
        });
    }
}
/**
 * Create multiple articles to the database for every user
 *
 */
export async function createMultipleArticles(_min: number, _max: number): Promise<void> {
    // Fetch all the created users from the database
    // created n number of article per user using createArticlesPerUser function
    // choose n randomly where n = [min, max] // both min and max are integer
    // choose your n per user ( it will be random n per creation )
}
/**
 * Assign topics to the articles
 */
export async function assignTopicsToArticles(_email: string): Promise<void> {
    // email : email id of the target user ( main user in focus )
    // fetch user topics from the database
    // fetch all the topics of application from the database
    // fetch all the articles from the database
    // choose 80% of the articles and assign topics to them
    // Here is how you assign the topics to the articles :
    //   1. Create the list of the topics in such a way that the number of topics is no more than 3
    //   2. That created random list of 3 topics should contain at-least 1 topic from the main user topics.
    //   3. List of topics for every article should be random with at least 1 topic from the main user topics
    //   4. Assign the topics to the articles ( 80% articles only chosen randomly )
    // remaining 20% of the articles should be assigned topics which contains no topics from the main user topics
}
/**
 * Create multiple users to the database
 */
export async function createMultipleUsers(numberOfUser: number) {
    const prisma = PrismaClientSingleton.prisma;
    const newFakeUsers = await Promise.all(new Array(numberOfUser).fill(0).map(async () => await generateFakeUser()));
    const newUsers = await prisma.user.createMany({
        data: newFakeUsers,
    });

    return newUsers;
    // Create multiple user to the database
    // use the function generateFakeUser to generate fake user
    // run your task in parallel also print the status to the console clearly
    // like : Created user :: [user email ]
}

/**
 * Assign topics to the users
 */
export async function assignTopicsToUsers(_email: string): Promise<void> {
    // Assign topics to the created user except the main user ( incoming email )
    // fetch all the topics of application from the database
    // choose aftmost 3 topics for the user
    // topics should be randomly chosen from the application topics list
    // use faker random library
    // assign the topics in parallel ( Promise.all() )
}

/**
 * Save articles for the users
 */
export async function saveArticlesForUsers(): Promise<void> {
    // fetch all the articles from the database
    // fetch all the users from the database
    // loop through all the user and select the articles to save for each user randomly ( 20% articles to save only  )
    // save the articles in parallel ( Promise.all() )
}

/**
 * Given the article and user , comment on the article
 */
export async function commentOnArticle(_email: string, _articleId: number, _min: number, _max: number): Promise<void> {
    // email is the commenter's email id
    // comment on article with given article id
    // create n number of fake comments for the article where n belong to [ min , max ] and min, max and n  belong to positive Integer
    // save the comments in parallel ( Promise.all() )
}
/**
 * Add multiple comments to the articles
 */
export async function addMultipleCommentsToArticles(_min: number, _max: number): Promise<void> {
    // add comments to the every article
    // fetch all the articles from the database
    // fetch all the users from the database
    // each user will comments on randomly chosen 40% of the articles
    // use the function commentOnArticle to comment on the article
    // repeat this process for every user fetched from the database and save the result in parallel ( Promise.all() )
    // loop through all the user and perform the above task
}
/**
 * Add replies to the comments
 */
export async function addRepliesToComments(_min: number, _max: number): Promise<void> {
    // add replies to the every comment
    // fetch all the comments from the database
    // fetch all the users from the database
    // each comments will have n number of reply where n belong to the [ min , max ] and min, max and n  belong to positive Integer
    // that n number of reply per comment will belong the random user n that is randomly chosen from the users list
    // loop on the comments and perform the above task and save the result ( reply ) to database in parallel ( Promise.all() )
}

/**
 * Helper function to add likes or dislikes to the article with specific user
 */
async function addLikesOrDislike(user: User, article: Article, isLike: boolean) {
    const prisma = PrismaClientSingleton.prisma;

    const action = isLike ? 'liked' : 'disliked';

    return prisma.like.create({
        data: {
            userId: user.id,
            articleId: article.id,
            status: action,
        },
    });
}

/**
 * Add likes/dislikes to the articles by users
 */
export async function addLikesToArticles(): Promise<void> {
    // How to add likes and dislike to the article: See below
    // 1. fetch all the articles from the database
    // 2. fetch all the users from the database
    // 3. choose 60% of the articles from articles list randomly
    // 4. from that chosen 60% split the articles list into half
    // 5. first half of articles will be like by a user
    // 6. remaining half of articles will be dislike by a user
    // Perform the above task in parallel ( Promise.all() ) for each and every user

    const prisma = PrismaClientSingleton.prisma;

    const [articles, users] = await Promise.all([await prisma.article.findMany(), await prisma.user.findMany()]);

    // calculates the number for 60% of all articles
    const percentage = Math.ceil(articles.length * 0.6);

    // Shuffles and then populates up to the percentage number of articles
    const selectedArticles = articles.sort(() => 0.5 - Math.random()).slice(0, percentage);

    // The middle index value of the selectedArticles
    const midPoint = percentage / 2;

    // Articles to be liked by users
    const likedArticles = selectedArticles.slice(0, midPoint);

    // Articles to be disliked by users
    const dislikeArticles = selectedArticles.slice(midPoint);

    await Promise.all(
        users.map(async (user) => {
            // Like the first half of articles
            await Promise.all(likedArticles.map((article) => addLikesOrDislike(user, article, true)));

            // Dislikes the second half of articles
            await Promise.all(dislikeArticles.map((article) => addLikesOrDislike(user, article, false)));
        }),
    );
}
