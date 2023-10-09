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

/**
 * Password validator
 */
export function validatePassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

/**
 * Name validator
 */
export function validateName(name: string) {
  return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
}
