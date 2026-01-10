import { z } from 'zod';

type Translator = (key: string) => string

export const createLoginSchema = (t: Translator) =>
    z.object({
            email: z.string().email(t('incorrectEmail')),
            password: z.string().min(8, t('incorrectFormat')),
        });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>
>