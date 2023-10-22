import { z } from "zod";
import { validatorPassword } from "../utils";

/**
 * ZOD validator for the id ( number )
 * ID is int , positive and greater than 0
 */
export const idValidatorUnit = z
  .number()
  .positive({ message: "Id must be greater than 0" })
  .int({ message: "Id must be an integer" });

/**
 * ZOD validator for the id (number or string that can be parsed into a number)
 * ID is int, positive, and greater than 0
 */
export const idStringValidatorUnit = z
  .string()
  .refine(
    (value) => {
      const parsedValue = Number(value);
      return (
        !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue > 0
      );
    },
    {
      message:
        "Id must be an integer or a string that can be parsed into a positive integer",
    }
  )
  .transform((value) => Number(value));
/**
 * ZOD validator for the email
 * Email is string, email
 */
export const emailValidatorUnit = z
  .string()
  .email({ message: "Invalid email format" });
/**
 * ZOD validator for the password
 * Password is string, min length 8 , max length 20, uppercase, lowercase, number, symbol ( !@#$%^&*() )
 */

/**
 * ZOD validator for the password
 * Password is string, min length 8 , max length 20, uppercase, lowercase, number, symbol ( !@#$%^&*() )
 */
export const passwordValidatorUnit = z.string().refine(validatorPassword, {
  message:
    "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
});

/**
 * ZOD validator for the token
 * Token cannot be empty and must be string
 */
export const tokenValidatorUnit = z
  .string()
  .nonempty({ message: "Token cannot be empty" });

/**
 * ZOD cursor validator
 * Cursor is number , integer and greater than or equal to 0
 */
export const cursorStringValidatorUnit = z
  .string()
  .refine(
    (value) => {
      const parsedValue = Number(value);
      return (
        !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue >= 0
      );
    },
    {
      message:
        "Id must be a number or a string that can be parsed into a non-negative integer",
    }
  )
  .transform((value) => Number(value));

/**
 * ZOD page size validator
 * Page size is number , integer and greater than 0
 */
export const pageSizeStringValidatorUnit = z
  .string()
  .refine((value) => {
    const parsedValue = Number(value);
    return (
      !isNaN(parsedValue) && Number.isInteger(parsedValue) && parsedValue > 0
    );
  })
  .transform((value) => Number(value));
