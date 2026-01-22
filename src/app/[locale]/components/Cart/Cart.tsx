'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { CartWindow, CloseModalButton, EmptyCart } from '@/app/[locale]/components';

export default function Cart() {
    const { cart } = useCartStore();
    const items = cart?.items;

    return (
        <div className={'text-black max-w-[100%] w-110 flex flex-col h-dvh overflow-x-hidden'}>
            <CloseModalButton/>
            <AnimatePresence mode={'wait'}>
                {items?.length ? (
                    <motion.div
                       className={'h-full'}
                        key={'cart'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .25, delay: .35, ease: 'easeOut' }}
                    >
                        <CartWindow/>
                    </motion.div>
                ) : (
                    <motion.div
                        className={'h-full'}
                        key={'empty'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .25, delay: .1, ease: 'easeOut' }}
                    >
                        <EmptyCart/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}