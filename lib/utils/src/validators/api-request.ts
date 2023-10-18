import { IRequestAuthLogin } from "@intellectia/types";
import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { emailValidatorUnit, passwordValidatorUnit } from "./validators";
/**
 * Request validation for - /server/auth/login
 */
export async function apiRequestAuthLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // validate req.body using the Zod schema
    const validBody = await z
      .object({
        email: emailValidatorUnit,
        password: passwordValidatorUnit,
      })
      .parseAsync(req.body);

    // validate req.query using the Zod schema
    const validQuery = await z.object({}).parseAsync(req.query);

    // validate req.params using the Zod schema
    const validParams = await z.object({}).parseAsync(req.params);

    const resLocalData: IRequestAuthLogin = {
      body: validBody,
      param: validParams,
      query: validQuery,
    };

    // set res.locals ( reqClientData )
    res.locals.reqClientData = resLocalData;

    next();
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}

/**
 * Request validation for - /server/auth/signup
 */
export async function apiRequestAuthSignupValidator(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // implement your ZOD validators here
    // always check for the unit validator and combine that
    // if not found create new unit validator as needed
  } catch (error) {
    if (error instanceof ZodError && !error.isEmpty) {
      res.status(400).send({ error: error.issues[0]?.message });
      next(error);
    }

    next(error);
  }
}
