export type RES = "RES";

/* General response interface  */
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  error?: string | { error: string | undefined | unknown } | unknown;
  data?: T;
}

/* interfaces for payloads */

/* Response for - / */
export interface IHelloWorldResponse {
  message: string;
}
export interface IHelloAutheticationResponse {
  message: string;
}

/* Response for - /topics */

export interface IGetTopics {
  id: number;
  title: string;
  description: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

/* Response for - /user/topics */
export interface IGetUserTopics {
  id: number;
  title: string;
  description: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

/* Response for - /topic/:id */
export interface IGetTopicById {
  id: number;
  title: string;
  description: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

/* Response for - /login , /signup, '/magic_login'  */
export interface ICommon {
  token: string;
  isAdmin: boolean;
  userId: string;
  email: string;
}

/* Response for - /magic */
export interface IMagic {
  magicLink: string;
}

/*Response for - /user/article_series */
export interface IGetAllArticleSeries {
  id: number;
  title: string;
  description: string | null;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
/*Response for - /user/article_series/:id */
export interface IGetSingleArticleSeries {
  id: number;
  title: string;
  description: string | null;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
