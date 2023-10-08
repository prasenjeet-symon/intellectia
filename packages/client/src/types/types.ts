export const API_ERROR = "API_ERROR";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR_VIEW = "API_ERROR_VIEW";
export const API_SUCCESS_VIEW = "API_SUCCESS_VIEW";

export interface IAxiosError {
   error: string;
}

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
// useSignupWithGoogle
export interface IHookSignupWithGoogle {
  signup: (token: string) => Promise<void>;
  isLoading: boolean;
}

// IHookLoginWithGoogle
export interface IHookLoginWithGoogle {
  login: (token: string) => Promise<void>;
  isLoading: boolean;
}

export enum APIHookType {
  // email and password signup
  EmailPasswordSignup = "EmailPasswordSignup",
  // email and password login
  EmailPasswordLogin = "EmailPasswordLogin",
}

export interface APIEventData {
  hookCtx: APIHookType;
  message: any;
}

export interface IHookContext {
  showErrors: boolean;
  showSuccess: boolean;
  [key: string]: any;
}
