'use client';

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
    const { applyPromoCode, promoLoading, promoCode, cart } = useCartStore();
    const locale = useLocale();

    const onSubmit = (data: PromoFormData) => {
        applyPromoCode(data.promoCode, locale).then();
    };

    if (!cart || !cart?.items?.length) return null;

    // Умова зникання: якщо є промокод або promoSuccess === true
    const isVisible = !promoCode

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
                        transition: { opacity: { duration: 0.2 }, height: { duration: 0.3, delay: .1 } }
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={'mt-1 mx-auto w-full px-3 flex justify-center overflow-hidden'}
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                </motion.form>
            )}
        </AnimatePresence>
    );
}