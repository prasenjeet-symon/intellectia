import { z } from "zod";
import { validatorPassword } from "../utils";

/**
 * ZOD validator for the id ( number )
 * ID is int , positive and greater than 0
 */
export const idValidatorUnit = z
  .number().positive().refine((val) => val > 0, {
    message: "ID must be a positive integer",
  })
/**
 * ZOD validator for the id (number or string that can be parsed into a number)
 * ID is int, positive, and greater than 0
 */
export const idStringValidatorUnit = z
  .string()
  .refine((value) => /^(0|[1-9]\d*)$/.test(value), {
    message: "Page size must be a positive integer",
  })
  .transform((value) => Number(value))
  .refine((val) => val > 0, {
    message: "Page size must be a positive integer",
  })
  .transform((val) => val);
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
 * Token cannot be empty and must be a string
 */
export const tokenValidatorUnit = z
  .string()
  .nonempty({ message: "Token cannot be empty" });

/**
 * ZOD cursor validator
 * Cursor is a string that can be parsed into a number, and the number should be an integer greater than or equal to 0
 */
export const cursorStringValidatorUnit = z
  .string()
  .refine((value) => /^(0|[1-9]\d*)$/.test(value), {
    message: "Cursor must be a positive integer",
  })
  .transform((value) => Number(value))
  .refine((val) => val >= 0, {
    message: "Cursor must be a positive integer",
  });
/**
 * ZOD page size validator
 * Page size is a string that can be parsed into a number, and the number should be an integer greater than 0
 */
export const pageSizeStringValidatorUnit = z
  .string()
  .refine((value) => /^(0|[1-9]\d*)$/.test(value), {
    message: "Cursor must be a positive integer",
  })
  .transform((value) => Number(value))
  .refine((val) => val > 0, {
    message: "Cursor must be a positive integer",
  });
/**
 * Pure string validator
 * Not a number as string , only string that starts with a letter
 */
export const pureStringValidatorUnit = z
  .string()
  .refine((value) => /^[a-zA-Z]/.test(value), {
    message: "String must start with a letter",
  });
