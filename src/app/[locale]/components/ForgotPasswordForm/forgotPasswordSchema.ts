import { z } from 'zod';

type Translator = (key: string) => string

export const forgotPasswordSchema = (t: Translator) =>
    z.object({
        email: z.string().email(t('incorrectEmail')),
    });

export type LoginFormData = z.infer<ReturnType<typeof forgotPasswordSchema>
>