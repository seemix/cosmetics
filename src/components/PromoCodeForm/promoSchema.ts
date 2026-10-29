import { z } from 'zod';

type Translator = (key: string) => string

export const promoSchema = (t: Translator) =>
    z.object({
        promoCode: z.string().min(4, t('fieldRequired')),
    });

export type PromoFormData = z.infer<ReturnType<typeof promoSchema>>