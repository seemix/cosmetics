'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { headMenuData } from './headMenuData';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function HeadMenu() {

    const t = useTranslations('StaticPages');
    const { hideModal } = useModal();

    return (
        <nav className={`flex gap-10 w-full max-w-130 pt-1 justify-end text-md text-dark 
		                font-(family-name:--font-roboto)`}>
            <ul className={'flex flex-wrap w-full justify-evenly gap-x-1 gap-y-4'}>
                {headMenuData.map((item) => (
                    <li key={item.name}>
                        <Link
                            onClick={hideModal}
                            data-bubble={'true'}
                            href={`${item.link}`}
                            className={`whitespace-nowrap text-md sm:text-sm text-dark transition-colors py-3 sm:py-1
            							duration-300 tracking-normal hover:text-[var(--main)] inline-block`}
                        >
                            {t(item.name)}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
