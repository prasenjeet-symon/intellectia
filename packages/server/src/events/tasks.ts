import { PrismaClientSingleton } from '../utils';

/**
 * Task ( Runs after the article is published successfully ).
 * Create the article story
 */
export async function CreateArticleStory(_email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    const article = await prisma.article.findUnique({
        where: {
            id: articleId,
        },
    });

    const newArticleStory = await prisma.articleStory.create({
        data: {
            story: article?.subtitle!,
            articleId,
        },
    });

    return newArticleStory;
}
/**
 * Task ( Runs after the article's story is created successfully ).
 * Distribute the article story among the followers of the article's author
 */
export async function DistributeArticleStory(_email: string, _articleId: number) {}
/**
 * Task ( Runs after the article's positive actions are created - comments, likes and save ).
 * Add author to suggested user to follow for the logged in user
 */
export async function AddSuggestedUserToFollow(email: string, articleId: number) {
    // email is the email id of logged in user
    const prisma = PrismaClientSingleton.prisma;
    const article = await prisma.article.findUnique({
        where: {
            id: articleId,
        },
        include: {
            user: {
                select: {
                    id: true,
                },
            },
        },
    });

    const authorId = article?.user.id!;

    const updatedUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            followings: {
                create: {
                    followed: {
                        connect: {
                            id: authorId,
                        },
                    },
                    isSuggested: true,
                },
            },
        },
    });
    return updatedUser;
}
/**
 * Task ( Runs after the article like is created successfully ).
 * Add like activity to the logged in user
 */
export async function AddLikeActivity(email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            articleActivities: {
                createMany: {
                    data: {
                        articleId: articleId,
                        action: 'like',
                    },
                },
            },
        },
    });
}
/**
 * Task ( Runs after the article dislike is created successfully ).
 * Add dislike activity to the logged in user
 */
export async function AddDislikeActivity(email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    const updatedUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            articleActivities: {
                createMany: {
                    data: {
                        articleId: articleId,
                        action: 'dislike',
                    },
                },
            },
        },
    });

      return updatedUser;;
}
/**
 * Task ( Runs after the article save is created successfully ).
 * Add save activity to the logged in user
 */
export async function AddSaveActivity(email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    const updatedUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            articleActivities: {
                createMany: {
                    data: {
                        articleId: articleId,
                        action: 'save',
                    },
                },
            },
        },
    });

    return updatedUser;
}
/**
 * Task ( Runs after the article comment is created successfully ).
 * Add comment activity to the logged in user
 */
export async function AddCommentActivity(email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    const updatedUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            articleActivities: {
                createMany: {
                    data: {
                        articleId: articleId,
                        action: 'comment',
                    },
                },
            },
        },
    });

    return updatedUser;
}
/**
 * Task ( Runs after the article is created successfully ).
 * Add article created activity to the logged in user
 */
export async function AddArticleCreatedActivity(email: string, articleId: number) {
    const prisma = PrismaClientSingleton.prisma;
    const updatedUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            articleActivities: {
                createMany: {
                    data: {
                        articleId: articleId,
                        action: 'create',
                    },
                },
            },
        },
    });

    return updatedUser;
}
