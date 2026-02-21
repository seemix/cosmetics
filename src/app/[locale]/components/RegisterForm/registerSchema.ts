import { z } from 'zod';

type Translator = (key: string) => string

export const createRegisterSchema = (t: Translator) =>
    z.object({
            name: z.string()
                .min(1, t('fieldRequired'))
                .min(2, t('fieldTooShort')),
            surname: z.string()
                .min(1, t('fieldRequired'))
                .min(2, t('fieldTooShort')),
            email: z.string()
                .min(1, t('fieldRequired'))
                .email(t('incorrectEmail')),
            phone: z.string()
                .min(1, t('fieldRequired'))
                .regex(/^\d{8}$/, t('phoneMustBe8Digits')),
            password: z.string()
                .min(1, t('fieldRequired'))
                .min(6, t('passwordTooShort')),
               // .regex(/[A-Z]/, t('passwordNeedsUppercase'))
               // .regex(/[0-9]/, t('passwordNeedsNumber')),
            confirmPassword: z.string()
                .min(1, t('fieldRequired')),
            locale: z.string(),
    })
        .refine((data) => data.password === data.confirmPassword, {
                message: t('passwordsDontMatch'),
                path: ['confirmPassword'],
        });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>