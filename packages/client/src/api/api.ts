import { AxiosResponse } from "axios";
import AxiosClient from "./apiClient";

/**
 * SignUp with email and password
 *
 */
export async function signupWithEmailPassword(email: string, password: string): Promise<AxiosResponse<any, any>> {
  const apiUrl = `/auth/signup`;

  const axiosClient = await AxiosClient.getInstance().axiosInstance.post(apiUrl, {
    email,
    password,
  });

  return axiosClient;
}
