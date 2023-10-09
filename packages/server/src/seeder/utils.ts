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
export async function markdownToHTML() {
    // Markdown file is located in the assets folder
    // markdown file is a article about the cat journey to the moon.
    // read the markdown and convert it to HTML
    // return the actual HTML string as { HTML: string }
    // comment the library used for this purpose in the related issue on GitHub
    // if you can write the pure TypeScript function for this purpose then awesome . :) You are really awesome !
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
