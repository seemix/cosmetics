'use client';

import { motion } from 'framer-motion';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

import { useModal } from '@/app/[locale]/hooks/useModal';
import { useTranslations } from 'next-intl';

export default function ConfirmResetMessage() {
    const { hideModal } = useModal();
    const t = useTranslations('RegisterForm');

    return (
        <motion.div className={'flex items-center justify-center flex-col bg-gray-50 w-100 p-5'}
                    initial={{ opacity: 0, filter: 'blur(5px)', x: -15 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}>
            <MdOutlineMarkEmailRead size={50} className={'text-gray-500 mb-5'}/>
            <p className={'text-md text-center'}>{t('resetEmailIsSent')}.</p>
            <button
                onClick={hideModal}
                type={'button'}
                aria-label={'login-button'}
                className={`cursor-pointer transition-colors duration-300 border-1 border-black p-2 mt-5 w-full
                                    hover:border-[var(--main)] hover:text-[var(--main)] flex gap-2 justify-center`}
            >
                OK
            </button>
        </motion.div>
    );
}