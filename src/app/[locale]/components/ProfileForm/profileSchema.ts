import { z } from 'zod';

type Translator = (key: string) => string;

export const profileSchema = (t: Translator) =>
    z.object({
            name: z.string()
                .min(1, t('fieldRequired'))
                .min(2, t('fieldTooShort')),
            surname: z.string()
                .min(1, t('fieldRequired'))
                .min(2, t('fieldTooShort')),
            phone: z.string()
                .min(1, t('fieldRequired'))
                .regex(/^\d{8}$/, t('phoneMustBe8Digits')),
            city: z.string()
                .min(1, t('fieldRequired'))
                .min(3, t('fieldTooShort')),
            street: z.string()
                .min(1, t('fieldRequired'))
                .min(3, t('fieldTooShort')),
    });

export type ProfileFormData = z.infer<ReturnType<typeof profileSchema>>
