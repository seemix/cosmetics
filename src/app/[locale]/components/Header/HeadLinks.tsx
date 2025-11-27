'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { headMenuData } from '@/app/[locale]/components/Header/headMenuData';

export default function HeadLinks() {
    const t = useTranslations('StaticPages');
    return (
        <div className={'flex gap-10 pt-1 justify-end text-md text-dark font-(family-name:--font-roboto)'}>
            <nav>
                <ul className={'flex gap-4'}>
                    {
                        headMenuData.map((item) =>
                            <Link href={item.link} key={item.name}
                                  className={'text-sm transition-colors duration-300 hover:text-[var(--main)] tracking-normal'}>
                                {t(`${item.name}`)}
                            </Link>)
                    }
                </ul>
            </nav>
        </div>
    );
}