'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from '@/app/[locale]/hooks/useClickOutside';

type SortOption = {
    label: string
    value: 'default' | 'price-asc' | 'price-desc'
}


export default function SortSelect() {
    const [open, setOpen] = useState(false);
    const t = useTranslations('Catalog');
    const options: SortOption[] = [
        { label: t('default'), value: 'default' },
        { label: t('priceASC'), value: 'price-asc' },
        { label: t('priceDESC'), value: 'price-desc' },
    ];
    const [current, setCurrent] = useState<SortOption>(options[0]);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setOpen(false), open);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        setCurrent(searchParams.get('sort') === 'default' ? options[0] :
            options.find(o => o.value === searchParams.get('sort')) ?? options[0]);
    }, [searchParams.get('sort')]);

    const handleUpdateQuery = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'default') {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
        setCurrent(options.find(o => o.value === value) ?? options[0]);
    };

    return (
        <div className={'relative flex gap-2 text-sm self-center md:self-auto mb-4 sm:mb-2'} ref={ref}>
            <span>{t('sort')}:</span>
            <motion.button
                type={'button'}
                onClick={() => setOpen(v => !v)}
                className={`flex items-center gap-1 cursor-pointer`}
                animate={{ color: open ? 'var(--main)' : 'black' }}
                whileHover={{ color: 'var(--main)' }}
                transition={{ duration: 0.25 }}
            >
                <span className={'text-sm'}>{current.label}</span>
                <motion.svg
                    aria-hidden={'true'}
                    focusable={'false'}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: .25 }}
                    className={'w-4 h-4'}
                    fill={'currentColor'}
                    viewBox={'0 0 20 20'}
                >
                    <path
                        d={'M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z'}/>
                </motion.svg>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className={'absolute right-0 top-full bg-white shadow py-2 z-[20] w-40'}
                    >
                        {options.map(opt => (
                            <button
                                type={'button'}
                                key={opt.value}
                                onClick={() => {
                                    handleUpdateQuery('sort', opt.value);
                                    setOpen(false);
                                }}
                                className={`px-4 py-2 cursor-pointer text-sm tracking-normal normal-case font-normal
                                            text-black hover:text-[var(--main)] hover:bg-gray-100 transition-colors
                                             duration-300 w-full`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
