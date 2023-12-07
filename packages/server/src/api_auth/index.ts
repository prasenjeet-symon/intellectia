/**
 * Note that error response structure is  : { error: string }
 */

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { v4 } from 'uuid';
import { ZodError } from 'zod';
import { Constants, generateToken, isMagicTokenValid, jwtExpireDate, PrismaClientSingleton, verifyGoogleAuthToken } from '../utils';
import { emailPasswordObjectValidator, tokenEmailObjectValidator, tokenObjectValidator } from '../validators';
import {
    apiRequestAuthGoogleLoginValidator,
    apiRequestAuthGoogleValidator,
    apiRequestAuthLoginValidator,
    apiRequestAuthLogoutAllValidator,
    apiRequestAuthLogoutValidator,
    apiRequestAuthMagicLoginValidator,
    apiRequestAuthMagicValidator,
    apiRequestAuthSignupValidator
} from '@intellectia/utils/validators';

import { ApiResponse, IRequestAuthLogin, IRequestAuthMagicLogin,  IRequestAuthMagic, ICommon, IMagic, IRequestAuthSignup} from '@intellectia/types';

const router: Router = Router();

router.get('/', (_req, res) => {
    const response:ApiResponse<null> =  {
       success: true,
       status:200,
       message:'Hello from Authentication'
    }
    res.status(200).send(response);
    return;
});

/**
 * Authenticate user with email and password
 * POSTMAN_DONE : This route is successfully added to postman and documented    
 */
router.post('/login', apiRequestAuthLoginValidator, async (req, res) => {
    try {
        const reqClientData: IRequestAuthLogin = res.locals.reqClientData;
        console.log(reqClientData, 'reqClientData');

        // check if the user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: reqClientData.body.email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            // no such user exit
            // status code 404 means that the resource was not found ( no user exist with this email id )
            const response:ApiResponse<null> = {
                success: false,
                status:404,
                error:'User not found. Please signup'
            }
            res.status(404).send(response);
            return;
        }

        // check if the password is correct
        if (oldUser.password !== reqClientData.body.password) {
            // status code 401 means that the user is unauthorized
            // wrong password
            const response:ApiResponse<null> = {
                success: false,
                status:401,
                error:'Wrong password. Please try again with correct password.'
            }
            res.status(401).send(response);
            
            return;
        }

        // check for number of sessions
        if (oldUser.numberOfSessions === oldUser.sessions.length) {
            // status code 429 means that the user is rate limited
            // too many sessions
            const response:ApiResponse<null> = {
                success: false,
                status:429,
                error:'Too many sessions. Please try again later.'
            }
            res.status(429).send(response);
            return;
        }

        // generate the JWT token
        const token = generateToken(reqClientData.body.email, oldUser.userId, false);

        // update the number of sessions
        await prisma.user.update({
            where: {
                email: reqClientData.body.email,
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

        const response:ApiResponse<ICommon> ={
            success:true,
            status:200,
            data:{ token, isAdmin: false, userId: oldUser.userId, email: oldUser.email }
        }
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> ={
                success : false,
                status:400,
                error:error.issues[0]?.message
            }
            res.status(400).send(response);
            return;
        }
        
        const response:ApiResponse<null> = {
            success : false,
            status: 500,
            error: error
        }
        res.status(500).json(response);
        return;
    }
});

/**
 * Signup user with email and password
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.post('/signup', apiRequestAuthSignupValidator, async (req, res) => {
    try {
        const reqClientData: IRequestAuthSignup = res.locals.reqClientData;

        const email = reqClientData.body.email;
        const password = reqClientData.body.password;
        // check if the user already exit in the database
        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (oldUser) {
            const response:ApiResponse<null> = {
                success : false,
                status: 409,
                error:'A account already exists with this email.'
            }
            res.status(409).json(response);
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

        const response:ApiResponse<ICommon> = {
            success : true,
            status : 200,
            data:{ token, isAdmin: false, userId: newUser.userId, email: newUser.email }
        }
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> ={
                success : false,
                status: 400,
                error: error.issues[0]?.message
            }
            res.status(400).send(response);
            return;
        }

        const response:ApiResponse<null> = {
            success : false,
            status:500,
            error: 'An unexpected error occurred.',
        }
        res.status(500).send(response);
        return;
    
    }
});

/**
 * Magic URL creation
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.post('/magic', apiRequestAuthMagicValidator, async (req, res) => {
    try {
        const reqClientData: IRequestAuthMagic = res.locals.reqClientData;
        const email: string = reqClientData.body.email;
        console.log(req.body.email);

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
        const response : ApiResponse<IMagic> = {
            success : true,
            status : 200,
            data:{ magicLink }
        }
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> ={
                success : false,
                status:400,
                error:error.issues[0]?.message
            }
            return res.status(400).send(response);
        }

        
        const response:ApiResponse<null> = {
            success : false,
            status:400,
            error:error
        }
        return res.status(400).send(response);
    }
});

/**
 * Magic URL login
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.post('/magic_login', apiRequestAuthMagicLoginValidator,
    rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 10,
        message: 'Too many requests',
    }),
    async (req, res) => {
        try {
            // Removed direct access to req.body
            const reqClientData: IRequestAuthMagicLogin = res.locals.reqClientData;
            const { email, token } = reqClientData.body;

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
                const response:ApiResponse<null> = {
                    success : false,
                    status : 401,
                    error:'Invalid token or email'
                }
                res.status(401).send(response);
                return;
            }

            const tokenFound = oldUser.magicLink.find((link) => link.linkToken === token);
            if (!tokenFound) {
                const response:ApiResponse<null> = {
                    success : false,
                    status : 401,
                    error:'Invalid token or email'
                }
                res.status(401).send(response);
                return;
            }

            const tokenExpirationTimeInMinutes = +(Constants.MAGIC_LINK_TOKEN_EXPIRATION_TIME || 15); // Set your desired expiration time in minutes
            const tokenCreationTime = tokenFound.createdAt; // Assuming `createdAt` is the token creation time in your model
            const isTokenValid = isMagicTokenValid(tokenCreationTime, tokenExpirationTimeInMinutes);

            if (!isTokenValid) {
                const response:ApiResponse<null> = {
                    success : false,
                    status : 401,
                    error:'Invalid token or email'
                }
                res.status(401).send(response);
                return;
            }

            // check for the number of active sessions
            if (oldUser.numberOfSessions === oldUser.sessions.length) {
                const response:ApiResponse<null> = {
                    success : false,
                    status : 401,
                    error:'Too many sessions'
                }
                res.status(401).send(response);
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
            const response:ApiResponse<ICommon> = {
                success: true,
                status: 200,
                data: { token: tokenJWT, isAdmin: false, userId: oldUser.userId, email: oldUser.email }
            }
            res.status(200).send(response);
            return;
        } catch (error) {
            // Handle errors and send appropriate response
            if (error instanceof ZodError && !error.isEmpty) {
              const errorResponse: ApiResponse<null> = {
                success: false,
                status: 400,
                error: 'Token and email are required and must be non-empty',
              };
              res.status(400).send(errorResponse);
              return;
            } 

            const genericErrorResponse: ApiResponse<null> = {
                success: false,
                status: 500,
                error: 'An unexpected error occurred.',
            };
            res.status(500).send(genericErrorResponse);
            return;
        }
    },
);

/**
 *
 * Signup with google
 * POSTMAN_TODO : This route is waiting to be added to postman and documented
 */
router.post('/google', apiRequestAuthGoogleValidator, async (req, res) => {
    // token is required
    try {
        // Validate the request body using the Zod schema
        const parsedBody = res.locals.reqClientData;
        const token = parsedBody.token;

        const tokenPayload = await verifyGoogleAuthToken(token);

        if (!tokenPayload.success) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:'Invalid token'
            }
            res.status(401).send(response);
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
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:'User with this email already exists'
            }
            res.status(401).send(response);
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
        const response:ApiResponse<ICommon> = {
            success : true,
            status: 200,
            data:{ token: tokenJWT, isAdmin: false, userId: newUser.userId, email: newUser.email }
        }
        res.status(200).send(response);
        
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 400,
                error: error.issues[0]?.message
            }
            res.status(400).send(response);
            return;
        }
        const response:ApiResponse<null> = {
            success : false ,
            status : 500,
            error:error
        }
        return res.status(500).send(response);
    }
});

/**
 * Sign-in with google
 * POSTMAN_TODO : This route is waiting to be added to postman and documented
 *
 */
router.post('/google_login', apiRequestAuthGoogleLoginValidator, async (req, res) => {
    // token is required
    try {
        // Validate the request body using the Zod schema
        const parsedBody = res.locals.reqClientData;
        const token = parsedBody.token;
        const tokenPayload = await verifyGoogleAuthToken(token);

        if (!tokenPayload.success) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:'Invalid token'
            }
            res.status(401).send(response);
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
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:'Invalid token'
            }
            res.status(401).send(response);
            return;
        }

        // generate the JWT token
        const tokenJWT = generateToken(email, oldUser.userId, false);

        // check for the number of active sessions
        if (oldUser.numberOfSessions === oldUser.sessions.length) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:'Too many sessions'
            }
            res.status(401).send(response);
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
        const response:ApiResponse<ICommon> = {
            success : true,
            status: 200,
            data:{ token: tokenJWT, isAdmin: false, userId: oldUser.userId, email: oldUser.email }
        }
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 400,
                error: error.issues[0]?.message
            }
            res.status(400).send(response);
            return;
        }
        const response:ApiResponse<null> = {
            success : false ,
            status : 500,
            error:error
        }
        return res.status(500).send(response);
       
    }
});

/**
 * Logout the user
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.post('/logout', apiRequestAuthLogoutValidator, async (_req, res) => {
    try {
        const { email, token } = await tokenEmailObjectValidator.parseAsync(res.locals);

        const prisma = PrismaClientSingleton.prisma;
        const oldUser = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                sessions: true,
            },
        });

        if (!oldUser) {
            const response: ApiResponse<null> = {
                success: false,
                status: 401,
                error: 'No such user exit',
            };
            return res.status(401).send(response);
        }

        const isSessionExists = !!oldUser.sessions.find((session) => session.token === token);
        if (!isSessionExists) {
            const response: ApiResponse<null> = {
                success: false,
                status: 401,
                error: 'No such token',
            };
            return res.status(401).send(response);
        }

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                sessions: {
                    delete: {
                        token,
                    },
                },
            },
        });

        const response: ApiResponse<ICommon> = {
            success: true,
            status: 200,
            data: { token, isAdmin: false, userId: oldUser.userId, email: oldUser.email },
        };

        res.status(200).send(response);
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response: ApiResponse<null> = {
                success: false,
                status: 400,
                error: 'Token and email are required and must be non-empty',
            };
            return res.status(400).send(response);
        } else {
            // Log the error for debugging purposes
            console.error('Error in /logout route:', error);
            const response: ApiResponse<null> = {
                success: false,
                status: 500,
                error,
            };
            return res.status(500).send(response);
        }
    }
});


/**
 *
 * Logout all the sessions
 * POSTMAN_DONE : This route is successfully added to postman and documented
 */
router.post('/logout_all', apiRequestAuthLogoutAllValidator, async (_req, res) => {
    try {
        // Validate res.locals using the Zod schema
        const parsedLocals = await tokenEmailObjectValidator.parseAsync(res.locals);
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
            }
        });

        if (!oldUser) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 401,
                error:  'Invalid token or email'
            }
            res.status(401).send(response);
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
        const response:ApiResponse<ICommon> = {
            success : true,
            status: 200,
            data:{ token: token, isAdmin: false, userId: oldUser.userId, email: oldUser.email }
        }
        res.status(200).send(response);
        return;
    } catch (error) {
        if (error instanceof ZodError && !error.isEmpty) {
            const response:ApiResponse<null> = {
                success : false ,
                status : 400,
                error:  'Token and email are required and must be non-empty'
            }
            res.status(400).send(response);
            return;
        }
        const response:ApiResponse<null> = {
            success : false ,
            status : 400,
            error:  error
        }
       return res.status(400).send(response);
       
    }
});

export default router;
