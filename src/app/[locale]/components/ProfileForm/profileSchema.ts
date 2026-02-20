import { z } from 'zod';

type Translator = (key: string) => string;

export const profileSchema = (t: Translator) =>
    z.object({
        name: z.string().min(2, t('incorrectFormat')),
        surname: z.string().min(2, t('incorrectFormat')),
        phone: z.string().min(8, t('incorrectFormat')),
        city: z.string().min(3, t('incorrectFormat')),
        street: z.string().min(3, t('incorrectFormat')),
    });

export type ProfileFormData = z.infer<ReturnType<typeof profileSchema>>
