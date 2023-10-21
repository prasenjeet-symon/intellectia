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
