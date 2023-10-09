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
    // generate the fake article
    // generate title using faker library
    // generate subtitle using the faker library
    // generate htmlContent using markdownToJSON function
    // generate markdownContent using markdownToJSON function
    // generate coverImage using the faker library
    // generate readTimeMinutes using the faker library ( decimal number )
    // return your response accordingly
}

/**
 * Generate the fake user for the seeding
 */
export async function generateFakeUser() {
    // generate the fake user
    // generate email using faker library
    // generate password using faker library
    // generate username using faker library
    // generate userId using ( UUID ) using the faker library
    // generate fullName using faker library
    // return your response accordingly
}
