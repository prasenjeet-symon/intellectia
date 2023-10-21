import { z } from 'zod';
import { validatorPassword } from '../utils';
// ID unit validator
export const idValidatorUnit = z.string().refine((val) => !isNaN(+val), {message: 'id must be a number'}).or(z.number().int().positive({
    message: 'id must be higher than 0',
}));

export const articleSeriesValidator = z.object({
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

// Email unit validator
export const emailValidatorUnit = z.string().email({
    message: 'email must be a valid email',
});

// Password validator
export const passwordValidatorUnit = z.string().refine(validatorPassword, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&) and be at least 8 characters long.',
});

// Token validator unit ( JWT )
export const tokenValidatorUnit = z.string();

/**
 *
 *
 *
 */
export const idObjectValidator = z.object({
    id: idValidatorUnit,
});

export const emailObjectValidator = z.object({
    email: emailValidatorUnit,
});

export const passwordObjectValidator = z.object({
    password: passwordValidatorUnit,
});

export const tokenObjectValidator = z.object({
    token: tokenValidatorUnit,
});

export const emailPasswordObjectValidator = emailObjectValidator.merge(passwordObjectValidator);

export const tokenEmailObjectValidator = emailObjectValidator.merge(tokenObjectValidator);

export const idArrayValidator = z.array(idValidatorUnit);

export const topicsObjectValidator = z.object({
    topics: idArrayValidator,
});

export const articlesObjectValidator = z.object({
    articles: idArrayValidator,
});
