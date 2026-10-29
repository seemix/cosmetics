'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useFavoritesStore } from '@/stores/favorites.store';
import NoContent from '@/components/NoContent/NoContent';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import { useAuthStore } from '@/stores/auth.store';
import { useLogoutRefresh } from '@/hooks/useLogoutRefresh';

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