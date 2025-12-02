'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';

const locales = [
    { code: 'ru', label: 'RU' },
    { code: 'ro', label: 'RO' },
];

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;

        const segments = pathname.split('/');
        segments[1] = newLocale;

        const newPath = segments.join('/') || '/';

        startTransition(() => {
            router.replace(newPath);
        });
    };

    return (
        <select
            value={currentLocale}
            onChange={handleChange}
            disabled={isPending}
            className="
                px-1 py-1

                bg-transparent text-black
                border-b border-gray-400
                focus:outline-none
                focus:border-[var(--main)]
                cursor-pointer
                transition-colors
            "
        >
            {locales.map(({ code, label }) => (
                <option
                    key={code}
                    value={code}
                    className="text-black text-sm sm:md"
                >
                    {label}
                </option>
            ))}
        </select>
    );
}
