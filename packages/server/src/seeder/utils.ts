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

    /* extracting HTML content using specified function markdownToHTML */
    let htmlContent = await markdownToHTML('../assets/catOnTheMoon.md')

    /* try block for reading and extracting metadata from markdown file */
    try{
        /* read selected file syncronously */
        const data = readFileFs.readFileSync('../assets/catOnTheMoon.md', 'utf8')

        //grab yaml metadata at start of page
        //split metdata at '\r\n' to get strings containing title, subtitle etc.
        const metadata = data.split('---')[1].split('\r\n')
            
        /* metadata is now an array consisting of strings containing yaml front matter */
        /* Title, subtitle and coverImage can be extracted from metadata array by calling their respective indexes in metadata array and splitting corresponding strings at ':' */
        /* trimStart() to removed whitespaces at start of strings */
        let title = metadata[1].split(':')[1].trimStart()
        let subTitle = metadata[2].split(':')[1].trimStart()
        let image = metadata[3].split(':')[1].trimStart()
        let markdownContent = data.split('---')[2]

        //return data in JSON format
        return {
            title,
            subTitle,
            'coverImage': `/server/media/${image}`,
            markdownContent,
            "htmlContent": htmlContent.HTML
        }
    } catch(error: any) {
        /* catch any errors that might occur */
        console.log(error.message)
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
