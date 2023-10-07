import { AxiosResponse } from "axios";
import AxiosClient from "./apiClient";

/**
 * Registers a new user using email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @return {Promise<AxiosResponse<any, any>>} A promise that resolves to the response from the API.
 */
export async function signupWithEmailPassword(email: string, password: string): Promise<AxiosResponse<any, any>> {
  const apiUrl = `/auth/signup`;

  const axiosClient = await AxiosClient.getInstance().axiosInstance.post(apiUrl, {
    email,
    password,
  });

  return axiosClient;
}

/**
 * Sends a request to the server to log in a user using their email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<AxiosResponse<any, any>>} - A promise that resolves to the Axios response.
 */
export async function loginWithEmailPassword(email: string, password: string): Promise<AxiosResponse<any, any>> {
  const apiUrl = `/auth/login`;
  return;
}
