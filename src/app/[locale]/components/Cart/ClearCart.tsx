'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function ClearCart() {
    const t = useTranslations('Cart');
    const [showConfirm, setShowConfirm] = useState(false);
    const { clear } = useCartStore();

    return (
        <div className={'ml-0 lg:ml-2 relative'}>
            <AnimatePresence mode={'wait'}>
                {!showConfirm && (
                    <button
                        onClick={() => setShowConfirm(true)}
                        type={'button'}
                        className={'text-sm hover:underline cursor-pointer'}
                    >
                        {t('emptyCart')}
                    </button>
                )}

                {showConfirm && (
                    <motion.div
                        key={'confirm'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: .6 }}
                        transition={{ duration: .3, delay: .1 }}
                    >
                        <p className={'text-sm'}>{t('emptyCart')}?</p>

                        <div className={'flex justify-between mt-4'}>
                            <button
                                onClick={() => clear()}
                                type={'button'}
                                className={'text-sm hover:underline cursor-pointer'}
                            >
                                {t('ok')}
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                type="button"
                                className="text-sm hover:underline cursor-pointer"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
