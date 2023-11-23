/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAuthenticationResult, ITopicResult } from "@/types/types";
import { AxiosResponse } from "axios";
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
export async function loginWithEmailPassword(email: string, password: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;
  const response = await axios.post<IAuthenticationResult>("/auth/login", {
    email,
    password,
  });

  return response;
}

/**
 * Signs up a user using their Google token.
 *
 * @param {string} token - The Google token for authentication.
 * @return {Promise<AxiosResponse<IAuthenticationResult>>} - A promise that resolves to the authentication result.
 */
export async function signupWithGoogle(token: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;
  const apiUrl = "/auth/google";
  const response = await axios.post<IAuthenticationResult>(apiUrl,{token});
  
  return response;
}

/**
 * Logs in the user with a Google token.
 *
 * @param {string} token - The Google token used for authentication.
 * @return {Promise<AxiosResponse<IAuthenticationResult>>} A Promise that resolves to the authentication result.
 */
export async function loginWithGoogle(token: string): Promise<AxiosResponse<IAuthenticationResult>> {
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;
  const apiUrl = "/auth/google_login";
  const response = await axios.post<IAuthenticationResult>(apiUrl,{token});
  
  return response;
}

/**
 * Logs user out
 */
export async function logoutUser() {
  const apiUrl = '/auth/logout';
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.post<string>(apiUrl);
  return response.data;
}

/**
 * Fetch all the application topics
 */
export async function getTopics(): Promise<ITopicResult[]> {
  const apiUrl = "/api/topics";
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.get<ITopicResult[]>(apiUrl);
  return response.data;
}

/**
 * Fetch all the assigned topics of the user
 */
export async function getAssignedTopics(): Promise<ITopicResult[]> {
  const apiUrl = "/api/user/topics";
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.get<ITopicResult[]>(apiUrl);
  return response.data;
}

/**
 * Assign multiple topics to the user
 */
export async function assignTopics(topicIds: number[]): Promise<string> {
  const apiUrl = "/api/user/topics";
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.put<string>(apiUrl, { topics: topicIds });
  return response.data;
}

/**
 * Assign single topic to the user
 */
export async function assignTopic(topicId: number): Promise<string> {
  const apiUrl = "/api/user/topic";
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.put<string>(apiUrl, { id: topicId });
  return response.data;
}

/**
 * Delete a topic from the user
 */
export async function deleteTopic(topicId: number): Promise<string> {
  const apiUrl = `/api/user/topic/${topicId}`;
  const axiosClient = AxiosClient.getInstance();
  const axios = axiosClient.axiosInstance;

  const response = await axios.delete<string>(apiUrl);
  return response.data;
}
