import { z } from "zod";
import { validatorPassword } from '../utils';

export const emailValidator = z.object({
  email: z.string().email()
})

export const logoutAllSchema = z.object({
  token: z.string().min(1),
  email: z.string().email()
});

export const emailPasswordValidator = z.object({
    email: z.string().email(),
    password: z.string().refine(validatorPassword, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&) and be at least 8 characters long.',
    }),
});

export const tokenEmailValidator = z.object({
  token: z.string().min(1),
  email: z.string().email()
})
