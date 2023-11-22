import { addRepliesToComments } from '../src/seeder/utils'; // Adjust the path to your function
import { PrismaClientSingleton } from '../src/utils'; // Adjust the path to your PrismaClientSingleton
import { addLikesToArticles } from '../src/seeder/utils'; // Adjust the path to your function
import { commentOnArticle } from '../src/seeder/utils';
import { generateFakeArticle } from '../src/seeder/utils'; // Importujte svoju funkciu
import { generateFakeUser } from '../src/seeder/utils'; // Importujte vašu funkciu
import { markdownToHTML } from '../src/seeder/utils'; // Prispôsobte cestu k funkcii



jest.mock('../src/utils', () => ({
  
  PrismaClientSingleton: {
    prisma: {
      article: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 1,
            title: 'Article 1',
          },
          {
            id: 2,
            title: 'Article 2',
          },
          {
            id: 3,
            title: 'Article 3',
          },
          {
            id: 4,
            title: 'Article 4',
          },
          {
            id: 5,
            title: 'Article 5',
          },
          {
            id: 6,
            title: 'Article 6',
          },
          {
            id: 7,
            title: 'Article 7',
          },
          {
            id: 8,
            title: 'Article 8',
          },
          {
            id: 9,
            title: 'Article 9',
          },
          {
            id: 10,
            title: 'Article 10',
          },
        ]),},
      comment: {
        findMany: jest.fn().mockResolvedValue([
          {
            content: 'Sample reply content',
            authorId: 1, // ID of a mock user
            articleId: 1, // Example article ID
            parentCommentId: 1, // Example parent comment ID
          },
          {
            content: 'Sample reply content',
            authorId: 1, // ID of a mock user
            articleId: 2, // Example article ID
            parentCommentId: 2, 
          },
          {
            content: 'Sample reply content',
            authorId: 3, // ID of a mock user
            articleId: 3, // Example article ID
            parentCommentId: 2, 
          },
          // Add more mock comments as needed...
        ]), // Mock Prisma findMany method for comments
        create: jest.fn(), 
      },
      user: {
        findMany: jest.fn().mockResolvedValue([
          { id: 1, name: 'Alice', email: 'alice@example.com' },
          { id: 2, name: 'Bob', email: 'bob@example.com' },
          { id: 3, name: 'peter', email: 'peter@example.com' },
          
          
        ]), // Mocked Prisma user.findMany method
        
        findUnique: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' }),

        createMany: jest.fn().mockResolvedValue([
          { id: 1, name: 'Alice', email: 'alice@example.com' },
          { id: 2, name: 'Bob', email: 'bob@example.com' },
          
        ]),
      },
      like: {
        create: jest.fn(), // Mock Prisma like.create method
      },
    },
  },
}));

describe('addRepliesToComments', () => {
  fit('should add replies to comments', async () => {
    const minReplies = 1; // Replace with your desired min reply value
    const maxReplies = 1; // Replace with your desired max reply value

    // Call the function with PrismaClientSingleton.prisma
    await addRepliesToComments(minReplies, maxReplies);

    // Calculate expected call count based on minReplies and maxReplies
    const expectedCallCount =maxReplies*3;

    // Verify that Prisma comment.create was called with the expected call count
    expect(
      PrismaClientSingleton.prisma.comment.create
    ).toHaveBeenCalledTimes(expectedCallCount);
  });
});

jest.clearAllMocks();

describe('addLikesToArticles', () => {
  fit('should add likes and dislikes to articles', async () => {
    // Call the function with PrismaClientSingleton.prisma
    await addLikesToArticles();

    // Calculate the expected call count based on your implementation
    const expectedCallCount = 18;

    // Verify that Prisma like.create was called with the expected call count
    expect(
      PrismaClientSingleton.prisma.like.create
    ).toHaveBeenCalledTimes(expectedCallCount);
  });
});

jest.clearAllMocks();

describe('commentOnArticle', () => {
 
  fit('should add comments to an article', async () => {
    // Define the input parameters 
    const userEmail = 'bob@example.com'; // Replace with a valid email
    const articleId = 1; // Replace with a valid article ID
    const minComments = 6; // Replace with your desired min comment value
    const maxComments = 6; // Replace with your desired max comment value

    // Call the function with the input parameters 
    await commentOnArticle(userEmail, articleId, minComments, maxComments);

    // Calculate the expected call count based on minComments and maxComments
    const expectedCallCount = minComments+3;

    // Verify that Prisma comment.create was called with the expected call count
    expect(
      PrismaClientSingleton.prisma.comment.create
    ).toHaveBeenCalledTimes(expectedCallCount);

    // Verify that Prisma comment.create was called with the correct parameters
    expect(
      PrismaClientSingleton.prisma.comment.create
    ).toHaveBeenCalledWith({
      data: expect.objectContaining({
        content: "commented", 
        authorId: 1, 
        articleId: articleId, 
      }),
    });
  });
});

jest.clearAllMocks();


describe('generateFakeArticle', () => {
  fit('should generate a fake article with expected properties', async () => {
    const article = await generateFakeArticle();

    // Skontrolujte, či článok má všetky očakávané polia
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('subtitle');
    expect(article).toHaveProperty('htmlContent');
    expect(article).toHaveProperty('markdownContent');
    expect(article).toHaveProperty('coverImage'); 
    expect(article).toHaveProperty('readTimeMinutes');
  });
});
jest.clearAllMocks();


describe('generateFakeUser', () => {
  fit('should generate a fake user', async () => {
    const user = await generateFakeUser();
    
    // Otestujte, či generovaný používateľ obsahuje očakávané vlastnosti
    expect(user).toHaveProperty('fullName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('userId');
    expect(user).toHaveProperty('username');
  });
});

jest.clearAllMocks(); 


describe('markdownToHTML', () => {
  fit('should convert Markdown to HTML', async () => {
    const markdownFile = 'assets/catOnTheMoon.md'; // Nahraďte existujúcim markdown súborom
  
    // Zavoláme funkciu markdownToHTML
    const result = await markdownToHTML(markdownFile);
  
    // Očakávame, že výsledok existuje a obsahuje HTML kód
    expect(result).toBeDefined();
    expect(result!.HTML).toContain('<hr />'); // Sem pridajte ďalšie očakávané HTML prvky, ktoré by mali byť výsledkom konverzie
  });

  fit('should handle errors gracefully', async () => {
    const nonExistentFile = 'nonExistentFile.md'; // Nepre existujúci súbor

    // Zavoláme funkciu markdownToHTML s neexistujúcim súborom
    try {
      await markdownToHTML(nonExistentFile);

      // Ak funkcia nespadla, očakávame, že sa sem nedostaneme
      expect(true).toBe(false);
    } catch (error) {
      // Očakávame, že funkcia vráti chybu 
      expect(error).toBeDefined();
    }
  });
});

