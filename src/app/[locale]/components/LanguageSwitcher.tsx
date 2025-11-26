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

    const handleSwitch = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;

        const newPath = segments.join('/') || '/';
        startTransition(() => {
            router.replace(newPath);
        });
    };

    return (
        <div className={'flex space-x-2'}>
            {locales.map(({ code, label }) => (
                <button
                    key={code}
                    onClick={() => handleSwitch(code)}
                    className={`px-1 py-1 text-md text-black cursor-pointer transition-colors 
                    duration-300 hover:text-[var(--main)] ${
                        currentLocale === code
                            ? 'border-b border-black'
                            : ''
                    }`}
                    disabled={isPending}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}