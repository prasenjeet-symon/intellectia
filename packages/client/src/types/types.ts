export const API_ERROR = "API_ERROR";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR_VIEW= "API_ERROR_VIEW";
export const API_SUCCESS_VIEW = "API_SUCCESS_VIEW";

export interface IAuthenticationResult {
  token: string; // Assuming 'token' is a string, update the type accordingly
  isAdmin: boolean;
  userId: string; // Assuming 'userId' is a string, update the type accordingly
  email: string; // Assuming 'email' is a string, update the type accordingly
}

export interface IHookSignUpWithEmailAndPassword {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export interface IHookLoginWithEmailAndPassword {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export enum APIErrorType {
  // email and password signup
  EmailPasswordSignup = "EmailPasswordSignup",
  // email and password login
  EmailPasswordLogin = "EmailPasswordLogin",
}

export interface APIErrorEventData {
  errorType: APIErrorType;
  message: any;
}
