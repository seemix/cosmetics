import { z } from 'zod';

type Translator = (key: string) => string;

export const checkoutSchema = (t: Translator) =>
    z.object({
        name: z.string().min(2, t('incorrectFormat')),
        surname: z.string().min(2, t('incorrectFormat')),
        email: z.string().email(t('incorrectEmail')),
        phone: z.string().min(8, t('incorrectFormat')),
        city: z.string().min(3, t('incorrectFormat')),
        street: z.string().min(3, t('incorrectFormat')),
        comment: z.string().optional(),
    });

export type CheckoutFormData = z.infer<ReturnType<typeof checkoutSchema>>
