import { z } from 'zod';
import { validatorPassword } from '../utils';

export const emailPasswordValidator = z.object({
    email: z.string().email(),
    password: z.string().refine(validatorPassword, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&) and be at least 8 characters long.',
    }),
});
