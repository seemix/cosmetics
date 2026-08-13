'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations, useLocale } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';

import { promoSchema, type PromoFormData } from './promoSchema';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { FormInput, Loader } from '@/app/[locale]/components';

export default function PromoCodeForm() {
    const t = useTranslations('PromoCodeForm');
    const schema = promoSchema(t);
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });
    const { applyPromoCode, promoLoading, promoCode, cart, promoError } = useCartStore();
    const locale = useLocale();

    // Локальний стан для контролю відображення помилки
    const [showError, setShowError] = useState(false);

    // Таймер на 2 секунди при появі promoError
    useEffect(() => {
        if (promoError) {
            setShowError(true);

            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [promoError]);

    const onSubmit = (data: PromoFormData) => {
        applyPromoCode(data.promoCode, locale).then();
    };

    if (!cart || !cart?.items?.length) return null;

    const isVisible = !promoCode;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.form
                    key={'promo-form'}
                    initial={{ opacity: 1, height: 'auto' }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        scale: 0.7,
                        transition: { opacity: { duration: 0.2 }, height: { duration: 0.3, delay: 0.1 } }
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={'mx-auto w-full px-3 flex justify-center overflow-hidden'}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={'w-full max-w-md'}>
                        <div className={'w-full max-w-md flex gap-2 justify-center'}>
                            <FormInput
                                label={t('promoCode')}
                                register={register('promoCode')}
                                id={'promoCode'}
                                error={errors.promoCode}
                            />

                            <button
                                type={'submit'}
                                disabled={promoLoading}
                                className={`border border-gray-800 w-[50%] md:w-[40%] px-4 py-1 cursor-pointer h-9 mt-[20px]
                                        hover:text-[var(--main)] transition-colors duration-300 hover:border-[var(--main)]`}
                            >
                                {promoLoading ? <Loader/> : t('apply')}
                            </button>
                        </div>

                        {/* Анімований блок помилки */}
                        <div className={'h-5 overflow-hidden'}>
                            <AnimatePresence>
                                {showError && promoError && (
                                    <motion.p
                                        key="promo-error"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className={'text-sm text-red-500 text-center'}
                                    >
                                        {t('promoError')}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}