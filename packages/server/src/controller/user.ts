import { Response, Request, NextFunction } from 'express';
import { PrismaClientSingleton } from '../utils';

export const getPaginatedUserActivities = async (req: Request, res: Response, next: NextFunction) => {
    const { take, skip } = req.query;
    const { userId } = req.params;

    const parsedTake = parseInt(take as string);
    const parsedSkip = parseInt(skip as string);
    const prisma = PrismaClientSingleton.prisma;

    try {
        const userActivities = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
            include: {
                articleActivities: {
                    skip: parsedSkip || 10,
                    take: parsedTake || 10,
                },
            },
        });

        if (!userActivities) return res.status(400).json({error: "Entity not found"})

        res.json(userActivities);
    } catch (error) {
        res.status(400).json({ error });
    }
};
