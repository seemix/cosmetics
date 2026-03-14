'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useFavoritesStore } from '@/app/[locale]/stores/favorites.store';
import { NoContent, ProductCardsGrid } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useLogoutRefresh } from '@/app/[locale]/hooks/useLogoutRefresh';

export default function MyFavorites() {
    const { favoriteProducts, getFavouriteProducts } = useFavoritesStore();
    const { user } = useAuthStore();
    const locale = useLocale();

    useLogoutRefresh(user);

    useEffect(() => {
        getFavouriteProducts(locale);
    }, [getFavouriteProducts, locale]);
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