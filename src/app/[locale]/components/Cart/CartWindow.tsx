import { useTranslations } from 'next-intl';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { assets } from '@/app/[locale]/assets/assets';
import { CartItem, ClearCart } from '@/app/[locale]/components';
import { AnimatePresence, motion } from 'framer-motion';

export default function CartWindow() {

    const { cart } = useCartStore();
    const t = useTranslations('Cart');

    return (
        <div className={'grid grid-rows-[auto_1fr_auto] h-full'}>
            <div className={'bg-white w-full'}>
                <h2 className={'text-2xl -mt-5 py-2 mx-2 text-center font-medium'}>
                    Корзина
                </h2>
            </div>

            {/* SCROLL AREA */}
            <div className={'overflow-hidden w-full'}>
                <div className={'h-full border-t border-b border-gray-300 overflow-y-auto'}>
                    <AnimatePresence initial={false}>
                        {cart?.items.map(product => (
                            <motion.div
                                className={'overflow-x-hidden'}
                                key={product.id}
                                layout
                                exit={{ opacity: 0, height: 0, scale: .5, y: 10 }}
                                transition={{ duration: .25, delay: .15, ease: 'easeOut' }}
                            >
                                <CartItem product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className={'flex flex-col gap-2 items-center bg-white'}>
                <div className={'flex justify-between w-full items-start border-b border-gray-300 p-4'}>
                    <ClearCart/>
                    <div>
                        <p>{t('itemsInCart')}:
                            <span className={'text-green-500 font-bold'}> {cart?.items.length}</span>
                        </p>
                        <p>{t('subtotal')}
                            : <span className={'text-green-500 font-bold'}> {cart?.subtotal} {assets.currency}</span>
                        </p>
                    </div>
                </div>
                <button
                    type={'button'}
                    className={`w-[85%] mx-auto border border-black p-2 transition-colors hover:border-[var(--main)] 
                                hover:text-[var(--main)] cursor-pointer mt-4 mb-3`}
                >
                    {t('checkout')}
                </button>
            </div>
        </div>
    );
}
