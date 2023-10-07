import { Response, Request, NextFunction } from 'express';
import { PrismaClientSingleton } from '../utils';

export const getPaginatedUserActivities = async (req: Request, res: Response, next: NextFunction) => {
    const { size, cursor } = req.query;
    const { userId } = req.params;

    if (!cursor) return res.status(400).json({ error: 'Cursor not found in the query parameter' });

    const parsedSize = parseInt(size as string);
    const parsedCursor = parseInt(cursor as string);

    if (parsedCursor <= 0 || parsedSize <= 1) return res.status(400).json({ error: 'cursor cannot be less than 0 and/or size cannot be less than 1' });

    const prisma = PrismaClientSingleton.prisma;

    try {
        const userActivities = await prisma.userActivity.findMany({
            where: {
                userId: parseInt(userId),
            },
            skip: 1,
            take: parsedSize || 10,
            cursor: {
                id: parsedCursor,
            },
            orderBy: {
                id: 'desc',
            },
            select: {
                id: true,
            },
        });

        if (!userActivities) return res.status(400).json({ error: 'Entity not found' });

        res.json(userActivities);
    } catch (error) {
        res.status(400).json({ error });
    }
};
