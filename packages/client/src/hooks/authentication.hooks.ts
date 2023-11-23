/**
 * These file holds all the hooks related to the application authentication
 * Note the file naming convention is different from the other hooks
 * file name should be like -> **.hooks.ts ( if file holds more than one hook )
 * file name should be like -> **.hook.ts ( if file holds one hook )
 */

import { logoutUser, loginWithEmailPassword, signupWithEmailPassword, loginWithGoogle ,signupWithGoogle} from "@/api/api";
import AxiosClient from "@/api/apiClient";
import { dispatchAPIError, dispatchAPIViewError, dispatchAPIViewSuccess } from "@/lib/appUtils";
import { queryClient } from "@/react-query";
import { APIHookType, IAuthenticationResult, IAxiosError, IHookContext, IHookLoginWithEmailAndPassword, IHookLoginWithGoogle, IHookLogout, IHookSignUpWithEmailAndPassword, IHookSignupWithGoogle, ReactQueryKey } from "@/types/types";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";

/**
 * Hook - Authentication
 * Is the user logged in?
 */
export function useIsLoggedIn(ctx?: IHookContext) {
  const fetchQuery = useQuery<unknown, AxiosError<IAxiosError>, boolean, string[]>([ReactQueryKey.IsUserLoggedIn()], () => AxiosClient.getInstance().isUserLoggedIn(), {
    onError: (err) => {
      dispatchAPIError({
        hookCtx: APIHookType.IsUserLoggedIn,
        message: err,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.IsUserLoggedIn,
          message: err.response?.data.error,
        });
      }
    },
    onSuccess: (data) => {
      console.log(data, "AUTH");
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.IsUserLoggedIn,
          message: "User is authenticated.",
        });
      }
    },
  });

  const refetch = async () => {
    try {
      await fetchQuery.refetch();
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.IsUserLoggedIn,
        message: error,
      });
    }
  };

  return { refetch, isAuthenticated: !!fetchQuery.data, isLoading: fetchQuery.isLoading, isError: fetchQuery.isError };
}

/**
 * Hook - Authentication
 * Signup user with email and password
 */
export function useSignUpWithEmailAndPassword(navigate: NavigateFunction, ctx?: IHookContext): IHookSignUpWithEmailAndPassword {
  const signupMutation = useMutation<AxiosResponse<IAuthenticationResult>, AxiosError<IAxiosError>, { email: string; password: string }, unknown>((inputData) => signupWithEmailPassword(inputData.email, inputData.password), {
    onError: (error) => {
      dispatchAPIError({
        hookCtx: APIHookType.EmailPasswordLogin,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.EmailPasswordLogin,
          message: error.response?.data.error,
        });
      }
    },
    onSuccess: (data) => {
      // set the local storage
      AxiosClient.getInstance().addToken(data.data.token);

      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.EmailPasswordLogin,
          message: "Your account crated successfully.",
        });
      }

      navigate("/dashboard/choose-topics");
    },
  });

  const signup = async (email: string, password: string) => {
    try {
      await signupMutation.mutateAsync({ email, password });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.EmailPasswordSignup,
        message: error,
      });
    }
  };

  return { signup, isLoading: signupMutation.isLoading };
}
/**
 * Hook - Authentication
 * Login user with email and password
 */
export function useLoginWithEmailAndPassword(navigate: NavigateFunction, ctx?: IHookContext): IHookLoginWithEmailAndPassword {
  const loginMutation = useMutation<AxiosResponse<IAuthenticationResult>, AxiosError<IAxiosError>, { email: string; password: string }, unknown>((inputData) => loginWithEmailPassword(inputData.email, inputData.password), {
    onError: (error) => {
      dispatchAPIError({
        hookCtx: APIHookType.EmailPasswordLogin,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.EmailPasswordLogin,
          message: error.response?.data.error,
        });
      }
    },
    onSuccess: (data) => {
      // set the local storage
      AxiosClient.getInstance().addToken(data.data.token);

      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.EmailPasswordLogin,
          message: "You have successfully logged in.",
        });
      }

      navigate("/dashboard");
    },
  });

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.EmailPasswordLogin,
        message: error,
      });
    }
  };

  return { login, isLoading: loginMutation.isLoading };
}
/**
 * Hook - Authentication
 * Signup user with Google token
 */
export function useSignupWithGoogle(navigate: NavigateFunction, ctx?: IHookContext): IHookSignupWithGoogle {
  const signupWithGoogleMutation = useMutation<AxiosResponse<IAuthenticationResult>, AxiosError<IAxiosError>, {token:string}, unknown>((inputData) => signupWithGoogle(inputData.token), {
    onError: (error) => {
      dispatchAPIError({
        hookCtx: APIHookType.GoogleSignup,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.GoogleSignup,
          message: error.response?.data.error,
        });
      }
    },
    onSuccess: (data) => {
      // set the local storage
      AxiosClient.getInstance().addToken(data.data.token);

      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.GoogleSignup,
          message: "Your account crated successfully.",
        });
      }

      navigate("/dashboard/choose-topics");
    },
  });

  const signup = async (token:string) => {
    try {
      await signupWithGoogleMutation.mutateAsync({ token });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.GoogleSignup,
        message: error,
      });
    }
  };
  return {signup, isLoading: signupWithGoogleMutation.isLoading} ;
}
/**
 * Hook - Authentication
 * Login user with Google token
 */
export function useLoginWithGoogle(navigate: NavigateFunction, ctx?: IHookContext): IHookLoginWithGoogle {
  const loginWithGoogleMutation = useMutation<AxiosResponse<IAuthenticationResult>, AxiosError<IAxiosError>,{token:string},unknown>((inputData)=>loginWithGoogle(inputData.token),{
    onError: (error) => {
      dispatchAPIError({
        hookCtx: APIHookType.GoogleLogin,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.GoogleLogin,
          message: error.response?.data.error,
        });
      }
    },onSuccess: (data) => {
      // set the local storage
      AxiosClient.getInstance().addToken(data.data.token);

      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.GoogleLogin,
          message: "You have successfully logged in.",
        });
      }

      navigate("/dashboard");
    }
  });

  const login = async (token:string) => {
    try {
      await loginWithGoogleMutation.mutateAsync({ token });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.GoogleLogin,
        message: error,
      });
    }
  };
  return { login, isLoading: loginWithGoogleMutation.isLoading};
}

/**
 * Hook - Authentication
 * Logout user
 */
export function useLogout(navigate: NavigateFunction, ctx?: IHookContext): IHookLogout {
  const logoutMutation = useMutation<unknown, AxiosError<IAxiosError>>(logoutUser, {
    onSuccess: async () => {
      // set the local storage
      AxiosClient.getInstance().removeToken();
      await queryClient.invalidateQueries({queryKey: [ReactQueryKey.IsUserLoggedIn()]})
      navigate('/auth/sign-in')
    }
  });

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    }
    catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.Logout,
        message: error,
      });
    }
  }
  
  return { logout, isLoading: logoutMutation.isLoading };
}
