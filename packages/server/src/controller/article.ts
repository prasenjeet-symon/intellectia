import { NextFunction, Request, Response } from "express";
import { PrismaClientSingleton } from "../utils";

export const getArticlesByUserIdAndStatus = async (req: Request, res:Response, next: NextFunction) => {
    const {userId, status} = req.params
    const prisma = PrismaClientSingleton.prisma
    const articles = await prisma.article.findMany({
        where: {
            userId : +userId
        }
    })
}