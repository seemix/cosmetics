'use client';

import { LoginForm } from '@/app/[locale]/components';
import { CiLogin } from 'react-icons/ci';
import { useTranslations } from 'next-intl';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function LoginLinkButton() {
    const t = useTranslations('Header');
    const { showModal } = useModal();

    return (
        <button
            type={'button'}
            onClick={() => showModal(<LoginForm/>, 'zoom')}
            className={`cursor-pointer transition-colors duration-300 border-1 border-black
                text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)]
                hover:text-[var(--main)] flex gap-2 justify-center mx-auto`}>
            <CiLogin size={20}/>
            {t('login')}
        </button>
    );
}