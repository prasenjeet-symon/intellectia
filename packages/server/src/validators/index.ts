import { z } from 'zod';
import { validatorPassword } from '../utils';

export const idValidator = z.object({
    id: z.number(),
});

export const emailValidator = z.object({
    email: z.string().email(),
});

export const passwordValidator = z.object({
    password: z.string().refine(validatorPassword, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&) and be at least 8 characters long.',
    }),
});

export const tokenValidator = z.object({
    token: z.string().min(1),
});

export const emailPasswordValidator = emailValidator.merge(passwordValidator);

export const tokenEmailValidator = emailValidator.merge(tokenValidator)
