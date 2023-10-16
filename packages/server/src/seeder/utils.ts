import { faker } from '@faker-js/faker';
import { UniqueEnforcer } from 'enforce-unique';
import * as fs from 'fs';
import showdown from 'showdown';
import { PrismaClientSingleton } from '../utils';
import  {load} from 'js-yaml';
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
      // Extracting HTML content using the markdownToHTML function
      let htmlContent = await markdownToHTML('../assets/catOnTheMoon.md');
      if (!htmlContent) {
        // If markdownToHTML returns undefined, handle the error or return an appropriate value.
        throw new Error("Failed to generate HTML content.");
      }
  
      // Read the markdown file synchronously using 'fs' module
      const data = fs.readFileSync('../assets/catOnTheMoon.md', 'utf8');
  
      // Parse YAML front matter from the markdown file
      const frontMatter = data.match(/---(.*?)---/s);
      if (!frontMatter) {
        throw new Error("YAML front matter not found in the markdown file.");
      }
  
      const yamlData = frontMatter[1]?.trim();
  
      // Parse YAML data into an object
      const yamlObject: any = load(yamlData ? yamlData : '{}');
  
      // Extract data from the YAML object
      let title = yamlObject.title || "";
      let subTitle = yamlObject.subTitle || "";
      let image = yamlObject.coverImage || "";
      let markdownContent = data.replace(frontMatter[0], ''); // Remove YAML front matter
  
      // Return data in JSON format
      return {
        title,
        subTitle,
        coverImage: `/server/media/${image}`,
        markdownContent,
        htmlContent: htmlContent.HTML,
      };
    } catch (error:any) {
      // Catch any errors that might occur and log them
      console.error(error.message);
      throw error; // Rethrow the error for proper error handling at a higher level.
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
export async function createArticlesPerUser(_email: string, _numberOfArticles: number): Promise<void> {
    // email : email id of the target user ( main user in focus )
    // Create articles to the database
    // use the function generateFakeArticle to generate fake article
    // initially article should be created in draft form ( isPublished status set to false )
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
 * Add likes/dislikes to the articles by users
 */
export async function addLikesToArticles(_min: number, _max: number): Promise<void> {
    // How to add likes and dislike to the article: See below
    // 1. fetch all the articles from the database
    // 2. fetch all the users from the database
    // 3. choose 60% of the articles from articles list randomly
    // 4. from that chosen 60% split the articles list into half
    // 5. first half of articles will be like by a user
    // 6. remaining half of articles will be dislike by a user
    // Perform the above task in parallel ( Promise.all() ) for each and every user
}
