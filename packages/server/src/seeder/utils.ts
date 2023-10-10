import { faker } from '@faker-js/faker';
import * as readFileFs from 'fs';
const showdown  = require('showdown')

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
    } catch(error: any) {
        console.error(error.message);
        process.exit(-1);
    }
}

/**
 * Generate the fake article for the seeding
 */
export async function generateFakeArticle() {
    
    // Generate fake data using faker library
    const title = faker.lorem.sentence();
    const subtitle = faker.lorem.sentence();
    const htmlContent = markdownToJSON(faker.lorem.paragraphs());
    const markdownContent = markdownToJSON(faker.lorem.paragraphs());
    const coverImage = faker.image.imageUrl();
    const readTimeMinutes = faker.random.number({ min: 1, max: 30, precision: 0.1 });

    // Construct the article object to return 
    const article = {
        title: title,
        subtitle: subtitle,
        htmlContent: htmlContent,
        markdownContent: markdownContent,
        coverImage: coverImage,
        readTimeMinutes: readTimeMinutes.toFixed(1) // Fixing the decimal precision to one
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
            lastName: faker.person.lastName()
        }),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        userId: faker.string.uuid(),
        fullname: `${faker.person.firstName()} ${faker.person.lastName()} `
    }
}
