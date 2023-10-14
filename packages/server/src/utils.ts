import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import * as topicsJson from './assets/topics.json';

// Interfaces
interface IGoogleAuthTokenResponse {
    userId: string;
    email: string;
    name: string;
    profile: string;
    success: boolean;
}
/**
 * Events constants
 */
export class Events {
    public static ARTICLE_CREATED = 'ARTICLE_CREATED';
    public static ARTICLE_PUBLISHED = 'ARTICLE_PUBLISHED';
    public static ARTICLE_LIKED = 'ARTICLE_LIKED';
    public static ARTICLE_DISLIKED = 'ARTICLE_DISLIKED';
    public static ARTICLE_SAVED = 'ARTICLE_SAVED';
    public static ARTICLE_SHARED = 'ARTICLE_SHARED';
    public static ARTICLE_COMMENTED = 'ARTICLE_COMMENTED';
    public static ARTICLE_STORY_CREATED = 'ARTICLE_STORY_CREATED';
}

/**
 *
 *
 *
 *
 */
// Application constants
export class Constants {
    public static JWT_SECRET = process.env.JWT_SECRET;
    public static PORT = process.env.PORT;
    public static DATABASE_URL = process.env.DATABASE_URL;
    public static TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME; // in hours
    public static CLIENT_HOST = process.env.CLIENT_HOST;
    public static MAGIC_LINK_TOKEN_EXPIRATION_TIME = process.env.MAGIC_LINK_TOKEN_EXPIRATION_TIME; // in minutes
}
/**
 *
 *
 *
 *
 */
/** Verify the JSON WEB TOKEN */
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }

    const jwt = require('jsonwebtoken');
    // Get the authentication token from the request headers, query parameters, or cookies
    // Example: Bearer <token>
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.query.token;

    // Verify and decode the token
    try {
        // Verify the token using your secret key or public key
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Set the userId and email in the request object
        res.locals.userId = decodedToken.userId;
        res.locals.email = decodedToken.email;
        res.locals.isAdmin = decodedToken.isAdmin;
        res.locals.token = token;
        // Move to the next middleware
        next();
    } catch (error) {
        // Token verification failed
        res.status(401).json({ error: 'Invalid token' });
        return;
    }
};

/**
 *
 * Prisma client singleton
 */
export class PrismaClientSingleton {
    static #instance: PrismaClient;

    static get prisma() {
        if (!PrismaClientSingleton.#instance) {
            PrismaClientSingleton.#instance = new PrismaClient({
                log: ['error'],
            });
        }
        return PrismaClientSingleton.#instance;
    }
}

/**
 *
 * Generate the JWT token given the email , userId, isAdmin
 *
 */
export const generateToken = (email: string, userId: string, isAdmin: boolean) => {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET not set');
    }

    return jwt.sign({ userId, email, isAdmin: isAdmin }, JWT_SECRET, { expiresIn: Constants.TOKEN_EXPIRATION_TIME });
};

export function isMagicTokenValid(creationDate: Date, validityMinutes: number): boolean {
    const now = new Date();
    const tokenCreationTime = new Date(creationDate);

    // Calculate the time difference in milliseconds between the current time and token creation time
    const timeDifferenceInMilliseconds = now.getTime() - tokenCreationTime.getTime();

    // Convert the validity period to milliseconds
    const validityMilliseconds = validityMinutes * 60 * 1000;

    // Check if the token is still valid
    return timeDifferenceInMilliseconds <= validityMilliseconds;
}

export function jwtExpireDate() {
    const jwtExpireHours = Constants.TOKEN_EXPIRATION_TIME || '20h'; // Set your desired expiration time in hours
    const hourInteger = parseInt(jwtExpireHours, 10);
    // add this hours to current time to get the expiration time
    const expirationTime = new Date(Date.now() + hourInteger * 60 * 60 * 1000);
    return expirationTime;
}

/** Verify the Google Auth Token */
export async function verifyGoogleAuthToken(token: string): Promise<IGoogleAuthTokenResponse> {
    const response = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
        params: {
            access_token: token,
        },
    });

    const userInfoEndpoint = 'https://www.googleapis.com/oauth2/v1/userinfo';
    const userInfoResponse = await axios.get(userInfoEndpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const userProfile = userInfoResponse.data;

    const payload = response.data;
    const userId = payload.sub;
    const email = payload.email;
    const name = userProfile.name;
    const picture = userProfile.picture;

    return { success: true, userId, email, name, profile: picture };
}
/**
 * Create all the necessary topics to be used in the intellectia app
 */
export async function createIntellectiaTopics() {
    const prisma = PrismaClientSingleton.prisma;
    //find the existing topics present
    const previousTopics = await prisma.topic.findMany({
        select: {
            title: true,
        },
        distinct: ['title'],
    });

    const previousTopicsTitles: Array<string> = previousTopics.map((topic) => topic.title);
    const allTopics: string[] = topicsJson.topics;
    const topicsToBeCreated: string[] = [];

    //find the new topics to be created
    allTopics.forEach((topic: string) => {
        if (!previousTopicsTitles.map((p) => p.toLowerCase()).includes(topic.toLowerCase())) {
            topicsToBeCreated.push(topic);
        }
    });

    for (const topic of topicsToBeCreated) {
        const result = await prisma.topic.create({
            data: {
                title: topic,
            },
            select: {
                title: true,
            },
        });

        console.log(`[INFO] ${result.title} NEW Topic Created`);
    }
}
/**
 * Password validator
 */
export function validatorPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
