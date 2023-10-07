/**
 * These file holds all the hooks related to the application authentication
 * Note the file naming convention is different from the other hooks
 * file name should be like -> **.hooks.ts ( if file holds more than one hook )
 * file name should be like -> **.hook.ts ( if file holds one hook )
 */

import { loginWithEmailPassword, signupWithEmailPassword } from "@/api/api";
import { dispatchAPIError } from "@/lib/appUtils";
import { APIErrorType, IHookLoginWithEmailAndPassword, IHookLoginWithGoogle, IHookSignUpWithEmailAndPassword, IHookSignupWithGoogle } from "@/types/types";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";

/**
 * Hook - Authentication
 * Signup user with email and password
 */
export function useSignUpWithEmailAndPassword(navigate: NavigateFunction): IHookSignUpWithEmailAndPassword {
  const signupMutation = useMutation<AxiosResponse<any, any>, AxiosError, { email: string; password: string }, unknown>(
    (inputData) => signupWithEmailPassword(inputData.email, inputData.password),
    {
      onError: (error) => {
        dispatchAPIError({
          errorType: APIErrorType.EmailPasswordSignup,
          message: error,
        });
      },
      onSuccess: (data) => {},
    },
  );

  const signup = async (email: string, password: string) => {
    try {
      await signupMutation.mutateAsync({ email, password });
    } catch (error: any) {
      dispatchAPIError({
        errorType: APIErrorType.EmailPasswordSignup,
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
export function useLoginWithEmailAndPassword(navigate: NavigateFunction): IHookLoginWithEmailAndPassword {
  const loginMutation = useMutation<AxiosResponse<any, any>, AxiosError, { email: string; password: string }, unknown>(
    (inputData) => loginWithEmailPassword(inputData.email, inputData.password),
    {
      onError: (error) => {
        dispatchAPIError({
          errorType: APIErrorType.EmailPasswordLogin,
          message: error,
        });
      },
      onSuccess: (data) => {},
    },
  );

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error: any) {
      dispatchAPIError({
        errorType: APIErrorType.EmailPasswordLogin,
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
export function useSignupWithGoogle(navigate: NavigateFunction): IHookSignupWithGoogle {
  return;
}
/**
 * Hook - Authentication
 * Login user with Google token
 */
export function useLoginWithGoogle(navigate: NavigateFunction): IHookLoginWithGoogle {
  return;
}
