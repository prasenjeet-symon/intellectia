import { APIEventData, API_ERROR, API_ERROR_VIEW, API_SUCCESS_VIEW } from "../types/types";

export function dispatchAPIError(event: APIEventData) {
  document.dispatchEvent(new CustomEvent(API_ERROR, { detail: event }));
}

export function dispatchAPIViewError(event: APIEventData) {
  document.dispatchEvent(new CustomEvent(API_ERROR_VIEW, { detail: event }));
}

export function dispatchAPIViewSuccess(event: APIEventData) {
  document.dispatchEvent(new CustomEvent(API_SUCCESS_VIEW, { detail: event }));
}
