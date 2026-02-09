import { z } from 'zod';

type Translator = (key: string) => string

export const createRegisterSchema = (t: Translator) =>
    z.object({
        name: z.string().min(2, t('incorrectFormat')),
        surname: z.string().min(2, t('incorrectFormat')),
        email: z.string().email(t('incorrectEmail')),
        phone: z.string().min(8, t('incorrectFormat'))
            .regex(/^\d{8}$/, t('incorrectFormat')),
        password: z.string().min(8, t('incorrectFormat')),
        confirmPassword: z.string(),
        locale: z.string(),
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: t('passwordsDontMatch'),
            path: ['confirmPassword'],
        });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>