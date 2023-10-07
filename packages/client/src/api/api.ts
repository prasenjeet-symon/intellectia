import { IAuthenticationResult } from "@/types/types";
import { AxiosError, AxiosResponse } from "axios";
import AxiosClient from "./apiClient";

/**
 * Registers a new user using email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @return {Promise<AxiosResponse<any, any>>} A promise that resolves to the response from the API.
 */

export async function signupWithEmailPassword(email: string, password: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const apiUrl = `/auth/signup`;

  try {
    const axiosClient = await AxiosClient.getInstance().axiosInstance.post(apiUrl, {
      email,
      password,
    });

    return axiosClient;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;

      throw {
        message: response?.data.error,
      };
    }

    throw new Error(error as string);
  }
}

/**
 * Sends a request to the server to log in a user using their email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<AxiosResponse<any, any>>} - A promise that resolves to the Axios response.
 */
export async function loginWithEmailPassword(email: string, password: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;
  try {
    const response = await axios.post<IAuthenticationResult>("/auth/login", {
      email,
      password,
    });

    return response;
  } catch (e) {
    // TODO Need to customise error according to our project requirements
    if (e instanceof AxiosError) {
      const { message } = e;
      throw new Error(message);
    }
    throw new Error();
  }
}


/**
 * Signs up a user using their Google token.
 *
 * @param {string} token - The Google token for authentication.
 * @return {Promise<AxiosResponse<IAuthenticationResult>>} - A promise that resolves to the authentication result.
 */
export async function signupWithGoogle(token: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const apiUrl = "/auth/google";
  return;
}

/**
 * Logs in the user with a Google token.
 *
 * @param {string} token - The Google token used for authentication.
 * @return {Promise<AxiosResponse<IAuthenticationResult>>} A Promise that resolves to the authentication result.
 */
export async function loginWithGoogle(token: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const apiUrl = "/auth/google_login";
  return;
}
