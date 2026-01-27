import { z } from 'zod';

type Translator = (key: string) => string

export const createNewPasswordSchema = (t: Translator) =>
    z
        .object({
            password: z.string().min(8, t('incorrectFormat')),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t('passwordsDontMatch'),
            path: ['confirmPassword'],
        });

// export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>
