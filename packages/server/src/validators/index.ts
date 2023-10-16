import { z } from 'zod';
import { validatorPassword } from '../utils';

export const idValidator = z.object({
    id: z
        .coerce
        .number({
            required_error: 'id is required',
            invalid_type_error: 'id must be a number',
        })
        .positive({
            message: 'id must be higher than 0',
        }),
});

export const titleValidator = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string"
        })
        .min(1)
});

export const updateArticleSeriesValidator = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string"
        })
        .min(1),
    description: z
        .string({
            invalid_type_error: "Description must be a string"
        })
        .min(10, {
            message: "Description must contain at least 10 letters"
        })
        .optional(),
    logo: z
        .string({
            invalid_type_error: "Logo must be a string"
        })
        .min(1, {
            message: "Logo must contain at least 1 letter"
        })
        .optional(),
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

export const idArrayValidator = z.array(
    z
        .number({
            required_error: 'ids are required',
            invalid_type_error: 'ids must be number',
        })
        .refine((value) => value !== 0, {
            message: 'ids must not be equal to 0',
        }),
);

