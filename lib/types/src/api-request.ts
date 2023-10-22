/**
 *
 * Request for - /server/auth/login
 *
 */
export interface IRequestAuthLogin {
  body: {
    email: string;
    password: string;
  };
  param: {};
  query: {};
}
/**
 *
 * Request for - /server/auth/signup
 *
 */
export interface IRequestAuthSignup extends IRequestAuthLogin {}

/**
 * Request for - /server/auth/magic
 */
export interface IRequestAuthMagic {
  body: {
    email: string;
  };
  param: {};
  query: {};
}
/**
 * Request for - /server/auth/magic_login
 */
export interface IRequestAuthMagicLogin {
  body: {
    token: string;
    email: string;
  };
  param: {};
  query: {};
}

/**
 * Request for - /server/auth/google
 */
export interface IRequestAuthGoogle {
  body: {
    token: string;
  };
  param: {};
  query: {};
}

/**
 * Request validation for - /server/auth/google_login
 */
export interface IRequestAuthGoogleLogin extends IRequestAuthGoogle {}

/**
 * Request validation for - /server/auth/logout
 */
export interface IRequestAuthLogout {}
/**
 * Request validation for - /server/auth/logout_all
 */
export interface IRequestAuthLogoutAll {}
/**
 * Request validation for - /server/api/topics
 */
export interface IRequestApiTopics {
  body: {};
  param: {};
  query: {};
}

/**
 * Request validation for - /server/api/user/topics
 */
export interface IRequestUserTopics {
  body: {};
  param: {};
  query: {};
}

/**
 * Request validation for - /server/api/topic/:id
 */
export interface IRequestApiTopic {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/topics
 */
export interface IRequestUserTopicsUpdate {
  body: {
    topics: number[];
  };
  param: {};
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/topic
 */
export interface IRequestUserTopicUpdate {
  body: {
    id: number;
  };
  param: {};
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/topic/:id
 */
export interface IRequestDeleteUserTopic {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/topics
 */

export interface IRequestUserTopicsDelete {
  body: {
    topics: number[];
  };
  param: {};
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article_series/:id/article
 */
export interface IRequestUserArticleSeriesIDArticleUpdate {
  body: {
    id: number;
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/article_series/:id/article
 */
export interface IRequestDeleteUserArticleSeriesArticle {
  body: {
    id: number;
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article_series/:id/articles
 */
export interface IRequestUserArticleSeriesArticlesUpdate {
  body: {
    articles: number[];
  };
  param: {
    id: number;
  };
  query: {};
}
/**
 * Request validation for - DELETE /server/api/user/article_series/:id/articles
 */

export interface IRequestUserArticleSeriesArticlesDelete {
  body: {
    articles: number[];
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - POST /server/api/user/article_series
 */
export interface IRequestUserArticleSeries {
  body: {
    title: string;
  };
  param: {};
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article_series/:id
 */
export interface IRequestUserArticleSeriesIdUpdate {
  body: {
    title: string;
    description?: string;
    logo?: string;
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/article_series/:id
 */
export interface IRequestDeleteUserArticleSeriesId {
  param: {
    id: number;
  };
  body: {};
  query: {};
}

/**
 * Request validation for - GET /server/api/user/article_series
 */
export interface IRequestGetUserArticleSeries {
  body: {};
  param: {};
  query: {};
}

/**
 * Request validation for - GET /server/api/user/article_series/:id
 */
export interface IRequestGetUserArticleSeriesId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/article_series/:id/articles
 */
export interface IRequestGetUserArticleSeriesIdArticles {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - POST /server/api/user/article
 */
export interface IRequestPostUserArticle {
  body: {
    title: string;
    subtitle: string;
    htmlContent: string;
    markdownContent: string;
  };
  param: {};
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article/:id/publish
 */
export interface IRequestPutUserArticleIdPublish {
  body: {
    topics: number[];
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article/:id
 */
export interface IRequestPutUserArticleId {
  body: {
    title: string;
    subtitle: string;
    htmlContent: string;
    markdownContent: string;
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article/:id/unpublish
 */
export interface IRequestPutUserArticleIdUnpublish {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article/:id/republish
 */
export interface IRequestPutUserArticleIdRepublish {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/articles/:status
 */
export interface IRequestGetUserArticlesStatus {
  body: {};
  param: { status: string };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/articles/:status/:size/:cursor
 */
export interface IRequestGetUserArticlesStatusSizeCursor {
  body: {};
  param: {
    status: string;
    size: number;
    cursor: number;
  };
  query: {};
}

/**
 * Request validation for - POST /server/api/user/article/:id/comment
 */
export interface IRequestPostUserArticleIdComment {
  body: {
    comment: string;
    parentCommentId?: number;
  };
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/comment/:id
 */
export interface IRequestPutUserCommentId {
  body: {
    comment: string;
  };
  param: {
    id: number;
  };
  query: {};
}
/**
 * Request validation for - DELETE /server/api/user/comment/:id
 */
export interface IRequestDeleteUserCommentId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/article/:id/comments/:size/:cursor
 */
export interface IRequestGetUserArticleIdCommentsSizeCursor {
  param: {
    id: number;
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}
/**
 * Request validation for - GET /server/api/user/comment/:id/replies/:size/:cursor
 */
export interface IRequestGetUserCommentIdRepliesSizeCursor {
  param: {
    id: number;
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - POST /server/api/user/read_later
 */
export interface IRequestPostUserReadLater {
  body: {
    id: number;
  };
  param: {};
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/read_later/:id
 */
export interface IRequestDeleteUserReadLater {
  param: {
    id: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - GET /server/api/user/read_later
 */
export interface IRequestGetUserReadLater {
  body: {};
  param: {};
  query: {};
}
/**
 * Request validation for - PUT /server/api/user/article/:id/like
 */
export interface IRequestPutUserArticleIdLike {
  body: {};
  param: {
    id: number;
  };
  query: {};
}
/**
 * Request validation for - PUT /server/api/user/article/:id/dislike
 */
export interface IRequestPutUserArticleIdDislike {
  body: {};
  param: {
    id: number;
  };
  query: {};
}
/**
 * Request validation for - GET /server/api/user/liked_articles/:status/:size/:cursor
 */
export interface IRequestGetUserLikedArticles {
  param: {
    status: string;
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - GET /server/api/user/article/:id/likes/:status/:size/:cursor
 */
export interface IRequestGetUserArticleLikes {
  param: {
    id: number;
    status: string;
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - PUT /server/api/user/follow/:id
 */
export interface IRequestPutUserFollowId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/follow/:id
 */
export interface IRequestDeleteUserFollowId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - DELETE /server/api/user/follower/:id
 */
export interface IRequestDeleteUserFollowerId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/followers/:size/:cursor
 */
export interface IRequestGetUserFollowers {
  param: {
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}
/**
 * Request validation for - GET /server/api/user/followings/:size/:cursor
 */
export interface IRequestGetUserFollowings {
  param: {
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - PUT /server/api/user/follow/suggest/:id
 */
export interface IRequestPutUserFollowSuggestId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - GET /server/api/user/user/followings/suggest/:size/:cursor
 */
export interface IRequestGetUserFollowingsSuggestSizeCursor {
  param: {
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - GET /server/api/user/followings/suggest/:size
 */
export interface IRequestGetUserFollowingsSuggestSize {
  param: {
    size: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - PUT /server/api/user/followings/suggest
 */
export interface IRequestPutUserFollowingsSuggest {
  body: { ids: number[] };
  param: {};
  query: {};
}
/**
 * Request validation for - PUT /server/api/user/article-reads/:id
 */
export interface IRequestPutUserArticleReadsId {
  body: {};
  param: {
    id: number;
  };
  query: {};
}

/**
 * Request validation for - PUT /server/api/user/article-reads/:id/time
 */
export interface IRequestPutUserArticleReadsIdTime {
  body: {
    readTimeMinutes: number;
  };
  param: {
    id: number;
  };
  query: {};
}
/**
 * Request validation for - GET /server/api/user/read-later/unread/:size/:cursor
 */
export interface IRequestGetUserReadLaterUnreadSizeCursor {
  param: {
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}

/**
 * Request validation for - GET /server/api/user/article-activities/:size/:cursor
 */
export interface IRequestGetUserArticleActivitiesSizeCursor {
  param: {
    size: number;
    cursor: number;
  };
  query: {};
  body: {};
}
