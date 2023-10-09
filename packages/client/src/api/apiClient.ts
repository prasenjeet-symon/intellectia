import axios, { AxiosInstance } from "axios";
import { ApiErrorManager } from "./apiErrorManager";

export class AxiosClient {
  private static instance: AxiosClient;
  public axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL + "/server",
      timeout: 5000,
    });
  }

  public static getInstance(): AxiosClient {
    if (!AxiosClient.instance) {
      AxiosClient.instance = new AxiosClient();
      AxiosClient.instance.setBearerToken();
      ApiErrorManager.getInstance();
    }

    return AxiosClient.instance;
  }
  /**
   * Sets the bearer token for the axios instance.
   *
   */
  public setBearerToken(): void {
    const token = localStorage.getItem("token");
    if (token) {
      this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common["Authorization"];
    }
  }

  /**
   * Is logged in
   */
  public async isUserLoggedIn() {
    // use axios to check if the user is logged in
    const isAuthenticated = this.axiosInstance.defaults.headers.common["Authorization"];
    return isAuthenticated ? true : false;
  }

  /**
   * Add token to local storage
   */
  public addToken(token: string) {
    localStorage.setItem("token", token);
    this.setBearerToken();
  }

  /**
   * Remove the token
   */
  public removeToken() {
    localStorage.removeItem("token");
    this.setBearerToken();
  }
}

export default AxiosClient;
