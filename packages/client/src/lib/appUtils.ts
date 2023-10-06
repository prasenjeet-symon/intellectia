import { APIErrorEventData, API_ERROR } from "../types/types";

export function dispatchAPIError(event: APIErrorEventData) {
  document.dispatchEvent(new CustomEvent(API_ERROR, { detail: event }));
}
