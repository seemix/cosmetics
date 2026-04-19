import { z } from 'zod';

type Translator = (key: string) => string;

export const checkoutSchema = (t: Translator) =>
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
        paymentType: z.enum(['cash', 'transfer'] as const, {
           error: t('fieldRequired'),
        }),
        city: z.string()
            .min(1, t('fieldRequired'))
            .min(3, t('fieldTooShort')),
        street: z.string()
            .min(1, t('fieldRequired'))
            .min(3, t('fieldTooShort')),
        comment: z.string().optional(),
    });

export type CheckoutFormData = z.infer<ReturnType<typeof checkoutSchema>>;