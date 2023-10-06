import { PrismaClientSingleton } from "../utils";

/**
 * Task ( Runs after the article is published successfully ).
 * Create the article story
 */
export async function CreateArticleStory(email: string, articleId: number) {}
/**
 * Task ( Runs after the article's story is created successfully ).
 * Distribute the article story among the followers of the article's author
 */
export async function DistributeArticleStory(email: string, articleId: number) {}
/**
 * Task ( Runs after the article's positive actions are created - comments, likes and save ).
 * Add author to suggested user to follow for the logged in user
 */
export async function AddSuggestedUserToFollow(email: string, articleId: number) {
    // email is the email id of logged in user
}
/**
 * Task ( Runs after the article like is created successfully ).
 * Add like activity to the logged in user
 */
export async function AddLikeActivity(email: string, articleId: number) {}
/**
 * Task ( Runs after the article dislike is created successfully ).
 * Add dislike activity to the logged in user
 */
export async function AddDislikeActivity(email: string, articleId: number) {}
/**
 * Task ( Runs after the article save is created successfully ).
 * Add save activity to the logged in user
 */
export async function AddSaveActivity(email: string, articleId: number) {
    
}
/**
 * Task ( Runs after the article comment is created successfully ).
 * Add comment activity to the logged in user
 */
export async function AddCommentActivity(email: string, articleId: number) {}
/**
 * Task ( Runs after the article is created successfully ).
 * Add article created activity to the logged in user
 */
export async function AddArticleCreatedActivity(email: string, articleId: number) {}
