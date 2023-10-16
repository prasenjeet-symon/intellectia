import { z } from "zod";

/**
 * ZOD validator for the id ( number )
 */
export const idValidator = z
  .number()
  .positive({ message: "Id must be greater than 0" })
  .int({ message: "Id must be an integer" });
