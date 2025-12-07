'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const locales = [
    { code: 'ru', label: 'RU' },
    { code: 'ro', label: 'RO' },
];

export default function LanguageSwitcher() {
    const currentLocale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    // click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const changeLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;

        startTransition(() => {
            router.replace(segments.join('/'));
        });

        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            {/* BUTTON */}
            <button
                type={'button'}
                onClick={() => setOpen(!open)}
                className="px-2 py-1 bg-transparent text-black cursor-pointer"
            >
                {currentLocale.toUpperCase()}
            </button>

            {/* DROPDOWN */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="dropdown"
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: .96 }}
                        transition={{ duration: .2 }}
                        className="absolute right-0 mt-2 bg-white shadow-md z-12"
                    >
                        {locales.map(({ code, label }) => (
                            <button
                                type={'button'}
                                key={code}
                                onClick={() => changeLocale(code)}
                                className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                            >
                                {label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
