'use client';

import Link from 'next/link';

import { headMenuData } from '@/app/[locale]/components/Header/headMenuData';
import { useTranslations } from 'next-intl';

export default function HeadLinks() {
    const t = useTranslations('StaticPages');
    return (
        <nav
            className={
                'flex gap-10 pt-1 justify-end text-md text-dark font-(family-name:--font-roboto)'
            }
        >
            <ul className={'flex flex-wrap gap-x-3 gap-y-6'}>
                {headMenuData.map((item) => (
                    <li key={item.name}>
                        <Link
                            data-bubble={'true'}
                            href={item.link}
                            className={`whitespace-nowrap text-sm p-2 border border-[var(--dark)] rounded-sm 
                                            bg-[var(--dark)]/10 text-dark transition-colors duration-300 
                                            tracking-normal hover:bg-[var(--main)]/20 sm:px-0 sm:py-0 sm:border-none 
                                            sm:rounded-none sm:bg-transparent                                         
                                            sm:hover:bg-transparent sm:hover:text-[var(--main)]`}
                        >
                            {t(item.name)}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
