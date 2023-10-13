/**
 * Note that error response structure is  : { error: string }
 */

import { Router } from 'express';
import { v4 } from 'uuid';
import { ZodError } from 'zod';
import { authenticateUser, Constants, generateToken, isMagicTokenValid, jwtExpireDate, PrismaClientSingleton, verifyGoogleAuthToken } from '../utils';
import { emailPasswordValidator, emailValidator, tokenEmailValidator, tokenValidator } from '../validators';
import rateLimit from 'express-rate-limit';

const router = Router();

router.get('/', (req, res) => {
    res.send({ message: 'Hello from Authentication' });
});

/**
 * Authenticate user with email and password
 */
router.post('/login', async (req, res) => {
    try {
        const parsedBody = await emailPasswordValidator.parseAsync(req.body);
        const email = parsedBody.email;
        const password = parsedBody.password;

        // check if the user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            // no such user exit
            // status code 404 means that the resource was not found ( no user exist with this email id )
            res.status(404).send({ error: 'User not found. Please signup' });
            return;
        }

        // check if the password is correct
        if (oldUser.password !== password) {
            // status code 401 means that the user is unauthorized
            // wrong password
            res.status(401).send({ error: 'Wrong password. Please try again with correct password.' });
            return;
        }

        // check for number of sessions
        if (oldUser.numberOfSessions === oldUser.sessions.length) {
            // status code 429 means that the user is rate limited
            // too many sessions
            res.status(429).send({ error: 'Too many sessions. Please try again later.' });
            return;
        }

        // generate the JWT token
        const token = generateToken(email, oldUser.userId, false);

        // update the number of sessions
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                sessions: {
                    createMany: {
                        data: [
                            {
                                expiresAt: jwtExpireDate(),
                                ipAddress: req.ip,
                                token: token,
                                userAgent: req.headers['user-agent'] || '',
                            },
                        ],
                    },
                },
                numberOfSessions: {
                    increment: 1,
                },
            },
        });

        res.send({ token, isAdmin: false, userId: oldUser.userId, email: oldUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            return res.status(400).send({ error: error.issues[0].message });
        }

        return res.status(400).json({ error });
    }
    // run the validators
});

/**
 * Signup user with email and password
 */
router.post('/signup', async (req, res) => {
    try {
        const parsedBody = await emailPasswordValidator.parseAsync(req.body);
        const email = parsedBody.email;
        const password = parsedBody.password;
        // check if the user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (oldUser) {
            res.status(409).send({ error: 'A account already exists with this email.' });
            return;
        }

        // create the new user
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: password,
                userId: v4(),
            },
            select: {
                userId: true,
                email: true,
            },
        });

        // generate the JWT token
        const token = generateToken(email, newUser.userId, false);
        res.send({ token, isAdmin: false, userId: newUser.userId, email: newUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            return res.status(400).send({ error: error.issues[0].message });
        }

        return res.status(400).json({ error });
    }
});

/**
 * Magic URL creation
 */
router.post('/magic', async (req, res) => {
    try {
        const parsedBody = await emailValidator.parseAsync(req.body);
        const email = parsedBody.email;

        const magicLinkToken = v4();
        const magicLink = `${Constants.CLIENT_HOST}/server/auth/magic_login?token=${magicLinkToken}&email=${email}`;

        // check if the user is already associated with the email
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!oldUser) {
            // we need to create a new user
            await prisma.user.create({
                data: {
                    email: email,
                    userId: v4(),
                    password: v4(),
                    magicLink: {
                        create: {
                            linkToken: magicLinkToken,
                        },
                    },
                },
                select: {
                    userId: true,
                    email: true,
                },
            });
        } else {
            // user already exists
            // create the new magic link
            await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    magicLink: {
                        create: {
                            linkToken: magicLinkToken,
                        },
                    },
                },
            });
        }

        // TODO : In production mode, send the magic link to the user via email and don't return anything
        res.send({ magicLink });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            return res.status(400).send({ error: error.issues[0].message });
        }

        return res.status(400).json({ error });
    }
});

/**
 * Magic URL login
 */
router.post(
    '/magic_login',
    rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 10,
        message: 'Too many requests',
    }),
    async (req, res) => {
        try {
            // Validate res.locals using the Zod schema
            const parsedLocals = await tokenEmailValidator.parseAsync(res.locals);
            const email = parsedLocals.email;
            const token = parsedLocals.token;

            // check if the user is already associated with the email
            const prisma = PrismaClientSingleton.prisma;
            const oldUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    magicLink: true,
                    sessions: true,
                },
            });

            if (!oldUser) {
                res.status(401).send({ error: 'Invalid token or email' });
                return;
            }

            const tokenFound = oldUser.magicLink.find((link) => link.linkToken === token);
            if (!tokenFound) {
                res.status(401).send({ error: 'Invalid token or email' });
                return;
            }

            const tokenExpirationTimeInMinutes = +(Constants.MAGIC_LINK_TOKEN_EXPIRATION_TIME || 15); // Set your desired expiration time in minutes
            const tokenCreationTime = tokenFound.createdAt; // Assuming `createdAt` is the token creation time in your model
            const isTokenValid = isMagicTokenValid(tokenCreationTime, tokenExpirationTimeInMinutes);

            if (!isTokenValid) {
                res.status(401).send({ error: 'Invalid token or email' });
                return;
            }

            // check for the number of active sessions
            if (oldUser.numberOfSessions === oldUser.sessions.length) {
                res.status(401).send({ error: 'Too many sessions' });
                return;
            }

            // generate the JWT token
            const tokenJWT = generateToken(email, oldUser.userId, true);
            const expirationTime = jwtExpireDate();
            // update the user sessions
            await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    sessions: {
                        createMany: {
                            data: [
                                {
                                    token: tokenJWT,
                                    expiresAt: expirationTime,
                                    ipAddress: req.ip,
                                    userAgent: req.headers['user-agent'] || '',
                                },
                            ],
                        },
                    },
                    numberOfSessions: {
                        increment: 1,
                    },
                },
            });

            res.send({ token: tokenJWT, isAdmin: false, userId: oldUser.userId, email: oldUser.email });
        } catch (error) {
            if (error instanceof ZodError && !error.isEmpty) {
                res.status(400).send({ error: 'Token and email are required and must be non-empty' });
                return;
            }

            return res.status(400).json({ error });
        }
    },
);

/**
 *
 * Signup with google
 *
 */
router.post('/google', async (req, res) => {
    // token is required
    try {
        // Validate the request body using the Zod schema
        const parsedBody = await tokenValidator.parseAsync(req.body);
        const token = parsedBody.token;

        const tokenPayload = await verifyGoogleAuthToken(token);

        if (!tokenPayload.success) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }

        const email = tokenPayload.email;
        // check if user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (oldUser) {
            res.status(409).send({ error: 'User with this email already exists' });
            return;
        }

        // create the new user
        const userId = tokenPayload.userId;
        const password = v4();

        const newUser = await prisma.user.create({
            data: {
                email: email,
                userId: userId,
                password: password,
            },
            select: {
                userId: true,
                email: true,
            },
        });

        // generate the JWT token
        const tokenJWT = generateToken(email, newUser.userId, false);
        res.send({ token: tokenJWT, isAdmin: false, userId: newUser.userId, email: newUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            res.status(400).send({ error: 'Token is required and must be non-empty' });
            return;
        }

        return res.status(400).json({ error });
    }
});

/**
 * Sign-in with google
 *
 */
router.post('/google_login', async (req, res) => {
    // token is required
    try {
        // Validate the request body using the Zod schema
        const parsedBody = await tokenValidator.parseAsync(req.body);
        const token = parsedBody.token;
        const tokenPayload = await verifyGoogleAuthToken(token);

        if (!tokenPayload.success) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }

        const email = tokenPayload.email;

        // check if user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            res.status(401).send({ error: 'Invalid token' });
            return;
        }

        // generate the JWT token
        const tokenJWT = generateToken(email, oldUser.userId, false);

        // check for the number of active sessions
        if (oldUser.numberOfSessions === oldUser.sessions.length) {
            res.status(401).send({ error: 'Too many sessions' });
            return;
        }

        // update the user sessions
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                sessions: {
                    createMany: {
                        data: [
                            {
                                token: tokenJWT,
                                expiresAt: jwtExpireDate(),
                                ipAddress: req.ip,
                                userAgent: req.headers['user-agent'] || '',
                            },
                        ],
                    },
                },
                numberOfSessions: {
                    increment: 1,
                },
            },
        });

        res.send({ token: tokenJWT, isAdmin: false, userId: oldUser.userId, email: oldUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            res.status(400).send({ error: 'Token is required and must be non-empty' });
            return;
        }

        return res.status(400).json({ error });
    }
});

/**
 * Logout the user
 */
router.post('/logout', authenticateUser, async (req, res) => {
    try {
        // Validate res.locals using the Zod schema
        const parsedLocals = await tokenEmailValidator.parseAsync(res.locals);
        const email = parsedLocals.email;
        const token = parsedLocals.token;

        // check if the user is already associated with the email
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            res.status(401).send({ error: 'Invalid token or email' });
            return;
        }

        const isSessionExists = oldUser.sessions.find((session) => session.token === token);
        if (!isSessionExists) {
            res.status(401).send({ error: 'Invalid token or email' });
            return;
        }

        // delete the session
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                sessions: {
                    delete: {
                        token: token,
                    },
                },
            },
        });

        res.send({ token: token, isAdmin: false, userId: oldUser.userId, email: oldUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            res.status(400).send({ error: 'Token and email are required and must be non-empty' });
            return;
        }

        return res.status(400).json({ error });
    }
});

/**
 *
 * Logout all the sessions
 *
 */
router.post('/logout_all', authenticateUser, async (req, res) => {
    try {
        // Validate res.locals using the Zod schema
        const parsedLocals = await tokenEmailValidator.parseAsync(res.locals);
        const email = parsedLocals.email;
        const token = parsedLocals.token;

        // check if the user is already associated with the email
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            res.status(401).send({ error: 'Invalid token or email' });
            return;
        }

        // delete the session
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                sessions: {
                    deleteMany: {},
                },
            },
        });

        res.send({ token: token, isAdmin: false, userId: oldUser.userId, email: oldUser.email });
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            res.status(400).send({ error: 'Token and email are required and must be non-empty' });
            return;
        }

        return res.status(400).json({ error });
    }
});

export default router;
