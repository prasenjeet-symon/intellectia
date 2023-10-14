import { validatorPassword } from 'src/regex';
import { z } from 'zod';

export const idValidator = z.object({
    id: z
        .number({
            required_error: 'id is required',
            invalid_type_error: 'id must be a number',
        })
        .refine((value) => value !== 0, {
            message: 'id must not be equal to 0',
        }),
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

export const tokenEmailValidator = emailValidator.merge(tokenValidator);

export const userTopicsValidator = z.object({
    topics: z.array(z.number()),
});
