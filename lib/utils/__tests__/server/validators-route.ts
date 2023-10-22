import {
  apiRequestAuthGoogleLoginValidator,
  apiRequestAuthGoogleValidator,
  apiRequestAuthLoginValidator,
  apiRequestAuthLogoutAllValidator,
  apiRequestAuthLogoutValidator,
  apiRequestAuthMagicLoginValidator,
  apiRequestAuthMagicValidator,
  apiRequestAuthSignupValidator,
  apiRequestDELETEUserArticleSeriesArticleValidator,
  apiRequestDELETEUserArticleSeriesArticlesValidator,
  apiRequestDELETEUserArticleSeriesIdValidator,
  apiRequestDELETEUserCommentIdValidator,
  apiRequestDELETEUserFollowIdValidator,
  apiRequestDELETEUserFollowerIdValidator,
  apiRequestDELETEUserReadLaterIdValidator,
  apiRequestDELETEUserTopicValidator,
  apiRequestDELETEUserTopicsValidator,
  apiRequestGETUserArticleActivitiesValidator,
  apiRequestGETUserArticleIdCommentsSizeCursorValidator,
  apiRequestGETUserArticleLikesValidator,
  apiRequestGETUserArticleSeriesIdArticlesValidator,
  apiRequestGETUserArticleSeriesIdValidator,
  apiRequestGETUserArticleSeriesValidator,
  apiRequestGETUserArticlesStatusSizeCursorValidator,
  apiRequestGETUserArticlesStatusValidator,
  apiRequestGETUserCommentIdRepliesSizeCursorValidator,
  apiRequestGETUserFollowersValidator,
  apiRequestGETUserFollowingsSuggestSizeValidator,
  apiRequestGETUserFollowingsSuggestValidator,
  apiRequestGETUserFollowingsValidator,
  apiRequestGETUserLikedArticlesValidator,
  apiRequestGETUserReadLaterUnreadValidator,
  apiRequestGETUserReadLaterValidator,
  apiRequestPOSTUserArticleIdCommentValidator,
  apiRequestPOSTUserArticleSeriesValidator,
  apiRequestPOSTUserArticleValidator,
  apiRequestPOSTUserReadLaterValidator,
  apiRequestPUTUserArticleIdDislikeValidator,
  apiRequestPUTUserArticleIdLikeValidator,
  apiRequestPUTUserArticleIdPublishValidator,
  apiRequestPUTUserArticleIdRepublishValidator,
  apiRequestPUTUserArticleIdUnpublishValidator,
  apiRequestPUTUserArticleIdValidator,
  apiRequestPUTUserArticleReadsIdTimeValidator,
  apiRequestPUTUserArticleReadsIdValidator,
  apiRequestPUTUserArticleSeriesArticleValidator,
  apiRequestPUTUserArticleSeriesArticlesValidator,
  apiRequestPUTUserArticleSeriesValidator,
  apiRequestPUTUserCommentIdValidator,
  apiRequestPUTUserFollowIdValidator,
  apiRequestPUTUserFollowSuggestIdValidator,
  apiRequestPUTUserFollowingsSuggestValidator,
  apiRequestPUTUserTopicValidator,
  apiRequestPUTUserTopicsValidator,
  apiRequestTopicValidator,
  apiRequestTopicsValidator,
  apiRequestUserTopicsValidator,
} from "@intellectia/utils/validators/api-request";
import { Router } from "express";

const router: Router = Router();

/**
 * For - apiRequestAuthLoginValidator
 */
router.post(
  "/server/auth/login",
  apiRequestAuthLoginValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * For - apiRequestAuthSignupValidator
 */

router.post(
  "/server/auth/signup",
  apiRequestAuthSignupValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * For - apiRequestAuthMagicValidator
 */
router.post(
  "/server/auth/magic",
  apiRequestAuthMagicValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestAuthMagicLoginValidator
 */
router.post(
  "/server/auth/magic_login",
  apiRequestAuthMagicLoginValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestAuthGoogleValidator
 */
router.post(
  "/server/auth/google",
  apiRequestAuthGoogleValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestAuthGoogleLoginValidator
 */
router.post(
  "/server/auth/google_login",
  apiRequestAuthGoogleLoginValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestAuthLogoutValidator
 */
router.post(
  "/server/auth/logout",
  apiRequestAuthLogoutValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestAuthLogoutAllValidator
 */
router.post(
  "/server/auth/logout_all",
  apiRequestAuthLogoutAllValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestTopicsValidator
 */
router.post(
  "/server/api/topics",
  apiRequestTopicsValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestUserTopicsValidator
 */
router.post(
  "/server/api/user/topics",
  apiRequestUserTopicsValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestTopicValidator
 */
router.post(
  "/server/api/topic/:id",
  apiRequestTopicValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserTopicsValidator
 */
router.put(
  "/server/api/user/topics",
  apiRequestPUTUserTopicsValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserTopicValidator
 */
router.put(
  "/server/api/user/topic",
  apiRequestPUTUserTopicValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestDELETEUserTopicValidator
 *
 */
router.delete(
  "/server/api/user/topic/:id",
  apiRequestDELETEUserTopicValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestDELETEUserTopicsValidator
 */
router.delete(
  "/server/api/user/topics",
  apiRequestDELETEUserTopicsValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserArticleSeriesArticleValidator
 */
router.put(
  "/server/api/user/article_series/:id/article",
  apiRequestPUTUserArticleSeriesArticleValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestDELETEUserArticleSeriesArticleValidator
 */
router.delete(
  "/server/api/user/article_series/:id/article",
  apiRequestDELETEUserArticleSeriesArticleValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleSeriesArticlesValidator
 */
router.put(
  "/server/api/user/article_series/:id/articles",
  apiRequestPUTUserArticleSeriesArticlesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestDELETEUserArticleSeriesArticlesValidator
 */
router.delete(
  "/server/api/user/article_series/:id/articles",
  apiRequestDELETEUserArticleSeriesArticlesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPOSTUserArticleSeriesValidator
 */
router.post(
  "/server/api/user/article_series",
  apiRequestPOSTUserArticleSeriesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleSeriesValidator
 */
router.put(
  "/server/api/user/article_series/:id",
  apiRequestPUTUserArticleSeriesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestDELETEUserArticleSeriesIdValidator
 */
router.delete(
  "/server/api/user/article_series/:id",
  apiRequestDELETEUserArticleSeriesIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestGETUserArticleSeriesValidator
 */
router.get(
  "/server/api/user/article_series",
  apiRequestGETUserArticleSeriesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestGETUserArticleSeriesIdValidator
 */
router.get(
  "/server/api/user/article_series/:id",
  apiRequestGETUserArticleSeriesIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticleSeriesIdArticlesValidator
 */
router.get(
  "/server/api/user/article_series/:id/articles",
  apiRequestGETUserArticleSeriesIdArticlesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPOSTUserArticleValidator
 */
router.post(
  "/server/api/user/article",
  apiRequestPOSTUserArticleValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserArticleIdPublishValidator
 */
router.put(
  "/server/api/user/article/:id/publish",
  apiRequestPUTUserArticleIdPublishValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserArticleIdValidator
 */
router.put(
  "/server/api/user/article/:id",
  apiRequestPUTUserArticleIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserArticleIdUnpublishValidator
 */
router.put(
  "/server/api/user/article/:id/unpublish",
  apiRequestPUTUserArticleIdUnpublishValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleIdRepublishValidator
 */
router.put(
  "/server/api/user/article/:id/republish",
  apiRequestPUTUserArticleIdRepublishValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticlesStatusValidator
 */
router.get(
  "/server/api/user/articles/:status",
  apiRequestGETUserArticlesStatusValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticlesStatusSizeCursorValidator
 */
router.get(
  "/server/api/user/articles/:status/:size/:cursor",
  apiRequestGETUserArticlesStatusSizeCursorValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPOSTUserArticleIdCommentValidator
 */
router.post(
  "/server/api/user/article/:id/comment",
  apiRequestPOSTUserArticleIdCommentValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserCommentIdValidator
 */
router.put(
  "/server/api/user/comment/:id",
  apiRequestPUTUserCommentIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestDELETEUserCommentIdValidator
 */
router.delete(
  "/server/api/user/comment/:id",
  apiRequestDELETEUserCommentIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticleIdCommentsSizeCursorValidator
 */
router.get(
  "/server/api/user/article/:id/comments/:size/:cursor",
  apiRequestGETUserArticleIdCommentsSizeCursorValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserCommentIdRepliesSizeCursorValidator
 */
router.get(
  "/server/api/user/comment/:id/replies/:size/:cursor",
  apiRequestGETUserCommentIdRepliesSizeCursorValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPOSTUserReadLaterValidator
 */
router.post(
  "/server/api/user/read_later",
  apiRequestPOSTUserReadLaterValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestDELETEUserReadLaterIdValidator
 */
router.delete(
  "/server/api/user/read_later/:id",
  apiRequestDELETEUserReadLaterIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserReadLaterValidator
 */
router.get(
  "/server/api/user/read_later",
  apiRequestGETUserReadLaterValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleIdLikeValidator
 */
router.put(
  "/server/api/user/article/:id/like",
  apiRequestPUTUserArticleIdLikeValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserArticleIdDislikeValidator
 */
router.put(
  "/server/api/user/article/:id/dislike",
  apiRequestPUTUserArticleIdDislikeValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserLikedArticlesValidator
 */
router.get(
  "/server/api/user/liked_articles/:status/:size/:cursor",
  apiRequestGETUserLikedArticlesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticleLikesValidator
 */
router.get(
  "/server/api/user/article/:id/likes/:status/:size/:cursor",
  apiRequestGETUserArticleLikesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserFollowIdValidator
 */
router.put(
  "/server/api/user/follow/:id",
  apiRequestPUTUserFollowIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestDELETEUserFollowIdValidator
 */
router.delete(
  "/server/api/user/follow/:id",
  apiRequestDELETEUserFollowIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestDELETEUserFollowerIdValidator
 */
router.delete(
  "/server/api/user/follower/:id",
  apiRequestDELETEUserFollowerIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserFollowersValidator
 */
router.get(
  "/server/api/user/followers/:size/:cursor",
  apiRequestGETUserFollowersValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserFollowingsValidator
 */
router.get(
  "/server/api/user/followings/:size/:cursor",
  apiRequestGETUserFollowingsValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserFollowSuggestIdValidator
 */
router.put(
  "/server/api/user/follow/suggest/:id",
  apiRequestPUTUserFollowSuggestIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestGETUserFollowingsSuggestValidator
 */
router.get(
  "/server/api/user/user/followings/suggest/:size/:cursor",
  apiRequestGETUserFollowingsSuggestValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserFollowingsSuggestSizeValidator
 */
router.get(
  "/server/api/user/followings/suggest/:size",
  apiRequestGETUserFollowingsSuggestSizeValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestPUTUserFollowingsSuggestValidator
 */
router.put(
  "/server/api/user/followings/suggest",
  apiRequestPUTUserFollowingsSuggestValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleReadsIdValidator
 */
router.put(
  "/server/api/user/article-reads/:id",
  apiRequestPUTUserArticleReadsIdValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestPUTUserArticleReadsIdTimeValidator
 */
router.put(
  "/server/api/user/article-reads/:id/time",
  apiRequestPUTUserArticleReadsIdTimeValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

/**
 * apiRequestGETUserReadLaterUnreadValidator
 */
router.get(
  "/server/api/user/read-later/unread/:size/:cursor",
  apiRequestGETUserReadLaterUnreadValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);
/**
 * apiRequestGETUserArticleActivitiesValidator
 */
router.get(
  "/server/api/user/article-activities/:size/:cursor",
  apiRequestGETUserArticleActivitiesValidator,
  async (_req, res) => {
    res.status(200).json({
      message: "Valid input",
      reqClientData: res.locals.reqClientData,
    });
  }
);

export default router;
