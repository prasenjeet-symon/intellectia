import { APIErrorEventData, API_ERROR, API_ERROR_VIEW } from "../types/types";

export function dispatchAPIError(event: APIErrorEventData) {
  document.dispatchEvent(new CustomEvent(API_ERROR, { detail: event }));
}

export function dispatchAPIViewError(event: APIErrorEventData) {
  document.dispatchEvent(new CustomEvent(API_ERROR_VIEW, { detail: event }));
}
