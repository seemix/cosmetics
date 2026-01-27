'use client';

import { useTranslations } from 'next-intl';
import { FcOk } from 'react-icons/fc';

import { LoginForm } from '@/app/[locale]/components';
import { useModal } from '@/app/[locale]/hooks/useModal';


export default function PasswordResetSuccess() {

    const { showModal } = useModal();
    const t = useTranslations('RegisterForm');

    return (
        <div className={'mx-auto my-4 w-full h-70 max-w-md border border-gray-300 bg-white p-6 flex flex-col gap-4'}>
            <FcOk size={40} className={'mx-auto my-5'}/>
            <h2 className={'text-center text-2xl'}>{t('passwordHasChanged')}</h2>
            <button
                className={`cursor-pointer transition-colors duration-300 border-1 border-black  
				             text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)] 
				             hover:text-[var(--main)] flex gap-2 justify-center w-full mx-auto mt-5`}
                type={'button'} onClick={() => showModal(<LoginForm/>, 'zoom')}>
                {t('loginIntoAccount')}
            </button>
        </div>
    );
}