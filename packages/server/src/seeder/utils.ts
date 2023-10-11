import { faker } from '@faker-js/faker';
import * as readFileFs from 'fs';
const showdown = require('showdown');

/**
 * Parse the Markdown file to JSON
 */
export async function markdownToJSON() {
    // Markdown file is located in the assets folder
    // markdown file is a article about the cat journey to the moon.
    // read that markdown and generate the JSON
    // JSON :  { title: string; subTitle: string; coverImage: string; markdownContent: string, htmlContent: string }
    // cover image should be asset file location ( relative url ) , please check the server.ts file for the media path

    // use the function markdownToHTML to get the HTML

    /* extracting HTML content using specified function markdownToHTML */
    let htmlContent = await markdownToHTML('../assets/catOnTheMoon.md');

    /* try block for reading and extracting metadata from markdown file */
    try {
        /* read selected file synchronously */
        const data = readFileFs.readFileSync('../assets/catOnTheMoon.md', 'utf8');

        //grab yaml metadata at start of page
        //split metadata at '\r\n' to get strings containing title, subtitle etc.
        const metadata = data.split('---')[1].split('\r\n');

        /* metadata is now an array consisting of strings containing yaml front matter */
        /* Title, subtitle and coverImage can be extracted from metadata array by calling their respective indexes in metadata array and splitting corresponding strings at ':' */
        /* trimStart() to removed whitespace at start of strings */
        let title = metadata[1].split(':')[1].trimStart();
        let subTitle = metadata[2].split(':')[1].trimStart();
        let image = metadata[3].split(':')[1].trimStart();
        let markdownContent = data.split('---')[2];

        //return data in JSON format
        return {
            title,
            subTitle,
            coverImage: `/server/media/${image}`,
            markdownContent,
            htmlContent: htmlContent ? htmlContent.HTML : '',
        };
    } catch (error: any) {
        /* catch any errors that might occur */
        console.log(error.message);
    }
}

/**
 * Parse the Markdown to HTML
 */
// used showdown (https://www.npmjs.com/package/showdown)
export async function markdownToHTML(inputPath: string) {
    try {
        const data: string = readFileFs.readFileSync(inputPath, 'utf8');
        const converter = new showdown.Converter();
        const result = converter.makeHtml(data);
        return { HTML: result };
    } catch (error: any) {
        console.error(error);
    }
}

/**
 * Generate the fake article for the seeding
 */
export async function generateFakeArticle() {
    const JSONData = await markdownToJSON();
    // Generate fake data using faker library
    const title = faker.lorem.sentence();
    const subtitle = faker.lorem.sentence();
    const htmlContent = JSONData?.htmlContent;
    const markdownContent = JSONData?.markdownContent;
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

    return article;
}

/**
 * Generate the fake user for the seeding
 */
export async function generateFakeUser() {
    return {
        email: faker.internet.email({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        }),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        userId: faker.string.uuid(),
        fullName: `${faker.person.firstName()} ${faker.person.lastName()} `,
    };
}
/**
 * Create articles to the database
 */
export async function createArticlesPerUser(email: string, numberOfArticles: number) {
    // email : email id of the target user ( main user in focus )
    // Create articles to the database
    // use the function generateFakeArticle to generate fake article
    // initially article should be created in draft form ( isPublished status set to false )
}
/**
 * Create multiple articles to the database for every user
 *
 */
export async function createMultipleArticles(min: number, max: number) {
    // Fetch all the created users from the database
    // created n number of article per user using createArticlesPerUser function
    // choose n randomly where n = [min, max] // both min and max are integer
    // choose your n per user ( it will be random n per creation )
}
/**
 * Assign topics to the articles
 */
export async function assignTopicsToArticles(email: string) {
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
    // Create multiple user to the database
    // use the function generateFakeUser to generate fake user
    // run your task in parallel also print the status to the console clearly
    // like : Created user :: [user email ]
}
