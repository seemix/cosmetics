'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';

import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function PromoBage() {
    const { promoCode, deletePromoCode } = useCartStore();
    const locale = useLocale();

    return (
        <AnimatePresence>
            {promoCode && (
                <motion.div
                    key={'promo-badge'} // Обов'язково для AnimatePresence
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 0.6,
                        transition: { duration: 0.4, ease: 'easeOut' }
                    }}
                    className={`inline-flex items-center gap-2 border border-gray-800 px-3 py-1 bg-gray-100
                               text-sm transition-colors duration-300 hover:border-[var(--main)] 
                               hover:text-[var(--main)]`}
                >
                    <span>
                        <pre className={'font-mono m-0'}>{promoCode}</pre>
                    </span>
                    <button
                        type={'button'}
                        onClick={() => deletePromoCode(locale)}
                        aria-label={'delete promo'}
                        className={`inline-flex items-center justify-center hover:text-red-500 transition-colors 
                                    cursor-pointer`}
                    >
                        &#10005;
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}