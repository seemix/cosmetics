'use client';

import { AnimatePresence, motion } from 'framer-motion';

import type { IProduct } from '@/app/[locale]/types/product';
import { ProductCard } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useAuthPrices } from '@/app/[locale]/hooks/useAuthPrices';

export default function ProductCardsGrid({ products }: { products: IProduct[] }) {

    const { user } = useAuthStore();
    useAuthPrices(user);

    return (
        <div className={`grid w-full max-w-[1100px] grid-cols-[repeat(auto-fll,minmax(220px,1fr))] justify-items-start 
                         gap-4 sm:grid-cols-[repeat(auto-fit,250px)] sm:justify-items-center`}>
            <AnimatePresence initial={false} mode={'popLayout'}>
                {products.map((product, i) =>
                    <motion.div key={product.id}
                                layout
                                exit={{ opacity: 0, height: 0, scale: .5, y: 10 }}
                                className={'overflow-hidden w-full'}>
                        <ProductCard product={product} index={i}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}