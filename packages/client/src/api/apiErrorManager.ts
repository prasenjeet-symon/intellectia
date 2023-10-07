import { APIErrorEventData, API_ERROR } from "@/types/types";
import { AxiosError } from "axios";

export class ApiErrorManager {
  private static instance: ApiErrorManager;

  private constructor() {
    console.log("ApiErrorManager");
    // listen to the axios error
    document.addEventListener(API_ERROR, (e) => {
      // custom event
      const event = e as CustomEvent<APIErrorEventData>;
      console.log(event);
      //check if the axios error
      if (typeof event.detail.message === "object" && event.detail.message instanceof AxiosError) {
        console.log(event.detail.message, "Axios Error Handle accordingly");
      }
    });
  }

  // get instance
  public static getInstance(): ApiErrorManager {
    if (!ApiErrorManager.instance) {
      ApiErrorManager.instance = new ApiErrorManager();
    }
    return ApiErrorManager.instance;
  }
}
