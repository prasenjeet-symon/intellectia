import {
  IRequestApiTopic,
  IRequestApiTopics,
  IRequestAuthGoogle,
  IRequestAuthGoogleLogin,
  IRequestAuthLogin,
  IRequestAuthLogout,
  IRequestAuthLogoutAll,
  IRequestAuthMagic,
  IRequestAuthMagicLogin,
  IRequestAuthSignup,
  IRequestDeleteUserArticleSeriesArticle,
  IRequestDeleteUserArticleSeriesId,
  IRequestDeleteUserCommentId,
  IRequestDeleteUserFollowId,
  IRequestDeleteUserFollowerId,
  IRequestDeleteUserReadLater,
  IRequestDeleteUserTopic,
  IRequestGetUserArticleActivitiesSizeCursor,
  IRequestGetUserArticleIdCommentsSizeCursor,
  IRequestGetUserArticleLikes,
  IRequestGetUserArticleSeries,
  IRequestGetUserArticleSeriesId,
  IRequestGetUserArticleSeriesIdArticles,
  IRequestGetUserArticlesStatus,
  IRequestGetUserArticlesStatusSizeCursor,
  IRequestGetUserCommentIdRepliesSizeCursor,
  IRequestGetUserFollowers,
  IRequestGetUserFollowings,
  IRequestGetUserFollowingsSuggestSize,
  IRequestGetUserFollowingsSuggestSizeCursor,
  IRequestGetUserLikedArticles,
  IRequestGetUserReadLater,
  IRequestGetUserReadLaterUnreadSizeCursor,
  IRequestPostUserArticle,
  IRequestPostUserArticleIdComment,
  IRequestPostUserReadLater,
  IRequestPutUserArticleId,
  IRequestPutUserArticleIdDislike,
  IRequestPutUserArticleIdLike,
  IRequestPutUserArticleIdPublish,
  IRequestPutUserArticleIdRepublish,
  IRequestPutUserArticleIdUnpublish,
  IRequestPutUserArticleReadsId,
  IRequestPutUserArticleReadsIdTime,
  IRequestPutUserCommentId,
  IRequestPutUserFollowId,
  IRequestPutUserFollowSuggestId,
  IRequestPutUserFollowingsSuggest,
  IRequestUserArticleSeries,
  IRequestUserArticleSeriesArticlesDelete,
  IRequestUserArticleSeriesArticlesUpdate,
  IRequestUserArticleSeriesIDArticleUpdate,
  IRequestUserArticleSeriesIdUpdate,
  IRequestUserTopicUpdate,
  IRequestUserTopics,
  IRequestUserTopicsDelete,
  IRequestUserTopicsUpdate,
} from "@intellectia/types";
import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import {
  cursorStringValidatorUnit,
  emailValidatorUnit,
  idStringValidatorUnit,
  idValidatorUnit,
  pageSizeStringValidatorUnit,
  passwordValidatorUnit,
  pureStringValidatorUnit,
  tokenValidatorUnit,
} from "./validators";

/**
 * Request validation for - /server/auth/login
 */
export async function apiRequestAuthLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // validate req.body using the Zod schema
    const validBody = await z
      .object({
        email: emailValidatorUnit,
        password: passwordValidatorUnit,
      })
      .parseAsync(req.body);

    // validate req.query using the Zod schema
    const validQuery = await z.object({}).parseAsync(req.query);

    // validate req.params using the Zod schema
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthLogin = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;

    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/signup
 */
export async function apiRequestAuthSignupValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // implement your ZOD validators here
    // always check for the unit validator and combine that
    // if not found create new unit validator as needed

    const validBody = await z
      .object({
        email: emailValidatorUnit,
        password: passwordValidatorUnit,
      })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthSignup = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - /server/auth/magic
 */
export async function apiRequestAuthMagicValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({ email: emailValidatorUnit })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthMagic = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/magic_login
 */
export async function apiRequestAuthMagicLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({ token: tokenValidatorUnit, email: emailValidatorUnit })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthMagicLogin = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/google
 */
export async function apiRequestAuthGoogleValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({ token: tokenValidatorUnit })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthGoogle = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/google_login
 */
export async function apiRequestAuthGoogleLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({ token: tokenValidatorUnit })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthGoogleLogin = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/logout
 */
export async function apiRequestAuthLogoutValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z.object({}).parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthLogout = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/logout_all
 */
export async function apiRequestAuthLogoutAllValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z.object({}).parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthLogoutAll = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/api/topics
 */
export async function apiRequestTopicsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z.object({}).parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestApiTopics = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/api/user/topics
 */
export async function apiRequestUserTopicsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z.object({}).parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestUserTopics = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/api/topic/:id
 */
export async function apiRequestTopicValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z.object({}).parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const resLocalData: IRequestApiTopic = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for PUT - /server/api/user/topics
 */
export async function apiRequestPUTUserTopicsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        topics: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestUserTopicsUpdate = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for PUT - /server/api/user/topic
 */
export async function apiRequestPUTUserTopicValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        id: idValidatorUnit,
      })
      .parseAsync(req.body);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestUserTopicUpdate = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for DELETE - /server/api/user/topic/:id
 */
export async function apiRequestDELETEUserTopicValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserTopic = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for DELETE - /server/api/user/topics
 */
export async function apiRequestDELETEUserTopicsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        topics: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);

    const validParams = await z.object({}).parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestUserTopicsDelete = {
      query: validQuery,
      body: validBody,
      param: validParams,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for PUT - /server/api/user/article_series/:id/article
 */
export async function apiRequestPUTUserArticleSeriesArticleValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        id: idValidatorUnit,
      })
      .parseAsync(req.body);

    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestUserArticleSeriesIDArticleUpdate = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for DELETE - /server/api/user/article_series/:id/article
 */
export async function apiRequestDELETEUserArticleSeriesArticleValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        id: idValidatorUnit,
      })
      .parseAsync(req.body);

    const resLocalData: IRequestDeleteUserArticleSeriesArticle = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for PUT - /server/api/user/article_series/:id/articles
 */
export async function apiRequestPUTUserArticleSeriesArticlesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        articles: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestUserArticleSeriesArticlesUpdate = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - DELETE /server/api/user/article_series/:id/articles
 */
export async function apiRequestDELETEUserArticleSeriesArticlesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        articles: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestUserArticleSeriesArticlesDelete = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - POST /server/api/user/article_series
 */
export async function apiRequestPOSTUserArticleSeriesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        title: z.string(),
      })
      .parseAsync(req.body);

    const validParams = await z.object({}).parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestUserArticleSeries = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article_series/:id
 */
export async function apiRequestPUTUserArticleSeriesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        title: z.string(),
        description: z.string().optional(),
        logo: z.string().optional(),
      })
      .parseAsync(req.body);

    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestUserArticleSeriesIdUpdate = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - DELETE /server/api/user/article_series/:id
 */
export async function apiRequestDELETEUserArticleSeriesIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserArticleSeriesId = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/article_series
 */
export async function apiRequestGETUserArticleSeriesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleSeries = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/article_series/:id
 */
export async function apiRequestGETUserArticleSeriesIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleSeriesId = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/article_series/:id/articles
 */
export async function apiRequestGETUserArticleSeriesIdArticlesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleSeriesIdArticles = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - POST /server/api/user/article
 */
export async function apiRequestPOSTUserArticleValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        title: z.string(),
        subtitle: z.string(),
        htmlContent: z.string(),
        markdownContent: z.string(),
      })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestPostUserArticle = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id/publish
 */
export async function apiRequestPUTUserArticleIdPublishValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);

    const validBody = await z
      .object({
        topics: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleIdPublish = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id
 */
export async function apiRequestPUTUserArticleIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        title: z.string(),
        subtitle: z.string(),
        htmlContent: z.string(),
        markdownContent: z.string(),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleId = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id/unpublish
 */
export async function apiRequestPUTUserArticleIdUnpublishValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleIdUnpublish = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id/republish
 */
export async function apiRequestPUTUserArticleIdRepublishValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleIdRepublish = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/articles/:status
 */
export async function apiRequestGETUserArticlesStatusValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ status: pureStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticlesStatus = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/articles/:status/:size/:cursor
 */
export async function apiRequestGETUserArticlesStatusSizeCursorValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        status: pureStringValidatorUnit,
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticlesStatusSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - POST /server/api/user/article/:id/comment
 */
export async function apiRequestPOSTUserArticleIdCommentValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validBody = await z
      .object({
        comment: z.string(),
        parentCommentId: z.number().optional(),
      })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestPostUserArticleIdComment = {
      param: validParams,
      body: validBody,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/comment/:id
 */
export async function apiRequestPUTUserCommentIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validBody = await z
      .object({
        comment: z.string(),
      })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);

    const resLocalData: IRequestPutUserCommentId = {
      param: validParams,
      body: validBody,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - DELETE /server/api/user/comment/:id
 */
export async function apiRequestDELETEUserCommentIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserCommentId = {
      param: validParams,
      body: validBody,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/article/:id/comments/:size/:cursor
 *
 */
export async function apiRequestGETUserArticleIdCommentsSizeCursorValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleIdCommentsSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/comment/:id/replies/:size/:cursor
 */
export async function apiRequestGETUserCommentIdRepliesSizeCursorValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserCommentIdRepliesSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - POST /server/api/user/read_later
 */
export async function apiRequestPOSTUserReadLaterValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validBody = await z
      .object({
        id: idValidatorUnit,
      })
      .parseAsync(req.body);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestPostUserReadLater = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - DELETE /server/api/user/read_later/:id
 */
export async function apiRequestDELETEUserReadLaterIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserReadLater = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/read_later
 */
export async function apiRequestGETUserReadLaterValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validQuery = await z.object({}).parseAsync(req.query);
    const validParams = await z.object({}).parseAsync(req.params);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserReadLater = {
      query: validQuery,
      param: validParams,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id/like
 */
export async function apiRequestPUTUserArticleIdLikeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleIdLike = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article/:id/dislike
 */
export async function apiRequestPUTUserArticleIdDislikeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleIdDislike = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/liked_articles/:status/:size/:cursor
 */
export async function apiRequestGETUserLikedArticlesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        status: z.string(),
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserLikedArticles = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/article/:id/likes/:status/:size/:cursor
 */
export async function apiRequestGETUserArticleLikesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        id: idStringValidatorUnit,
        status: z.string(),
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleLikes = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/follow/:id
 */
export async function apiRequestPUTUserFollowIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserFollowId = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - DELETE /server/api/user/follow/:id
 */
export async function apiRequestDELETEUserFollowIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserFollowId = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - DELETE /server/api/user/follower/:id
 */
export async function apiRequestDELETEUserFollowerIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestDeleteUserFollowerId = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/followers/:size/:cursor
 */
export async function apiRequestGETUserFollowersValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserFollowers = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - GET /server/api/user/followings/:size/:cursor
 */
export async function apiRequestGETUserFollowingsValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserFollowings = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/follow/suggest/:id
 */
export async function apiRequestPUTUserFollowSuggestIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserFollowSuggestId = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/user/followings/suggest/:size/:cursor
 */
export async function apiRequestGETUserFollowingsSuggestValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserFollowingsSuggestSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/followings/suggest/:size
 */
export async function apiRequestGETUserFollowingsSuggestSizeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserFollowingsSuggestSize = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/followings/suggest
 */
export async function apiRequestPUTUserFollowingsSuggestValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z.object({}).parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        ids: z.array(idValidatorUnit),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestPutUserFollowingsSuggest = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - PUT /server/api/user/article-reads/:id
 */
export async function apiRequestPUTUserArticleReadsIdValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);
    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleReadsId = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
/**
 * Request validation for - PUT /server/api/user/article-reads/:id/time
 */
export async function apiRequestPUTUserArticleReadsIdTimeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({ id: idStringValidatorUnit })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z
      .object({
        readTimeMinutes: z.number(),
      })
      .parseAsync(req.body);

    const resLocalData: IRequestPutUserArticleReadsIdTime = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - GET /server/api/user/read-later/unread/:size/:cursor
 */
export async function apiRequestGETUserReadLaterUnreadValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserReadLaterUnreadSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for  - GET /server/api/user/article-activities/:size/:cursor
 */
export async function apiRequestGETUserArticleActivitiesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validParams = await z
      .object({
        size: pageSizeStringValidatorUnit,
        cursor: cursorStringValidatorUnit,
      })
      .parseAsync(req.params);

    const validQuery = await z.object({}).parseAsync(req.query);
    const validBody = await z.object({}).parseAsync(req.body);

    const resLocalData: IRequestGetUserArticleActivitiesSizeCursor = {
      param: validParams,
      query: validQuery,
      body: validBody,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;
    next();
  } catch (error) {
    console.log(error, "ERROR");
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
