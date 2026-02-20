'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { useFavoritesStore } from '@/app/[locale]/stores/favorites.store';
import { NoContent, ProductCardsGrid } from '@/app/[locale]/components';

export default function MyFavorites() {
    const { favoriteProducts, getFavouriteProducts } = useFavoritesStore();

    useEffect(() => {
        getFavouriteProducts();
    }, [getFavouriteProducts]);
    if (!favoriteProducts) return null;

    return (
        <div className={'mt-2'}>
            {favoriteProducts.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: .8, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .3 }}>
                    <NoContent/>
                </motion.div>
            ) : (
                <ProductCardsGrid products={favoriteProducts}/>
            )}
        </div>
    );
}