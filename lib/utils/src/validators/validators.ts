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
