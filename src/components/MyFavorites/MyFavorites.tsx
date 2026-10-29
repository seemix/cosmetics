'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import NoContent from '@/components/NoContent/NoContent';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import { useFavoritesStore } from '@/stores/favorites.store';

export default function MyFavorites() {
	const { favoriteProducts, getFavouriteProducts } = useFavoritesStore(
		useShallow((s) => ({
			favoriteProducts: s.favoriteProducts,
			getFavouriteProducts: s.getFavouriteProducts,
		})),
	);
	const locale = useLocale();

	useEffect(() => {
		getFavouriteProducts(locale);
	}, [getFavouriteProducts, locale]);
	if (!favoriteProducts) return null;

	return (
		<div className={'mt-2'}>
			{favoriteProducts.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
					animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<NoContent />
				</motion.div>
			) : (
				<ProductCardsGrid products={favoriteProducts} />
			)}
		</div>
	);
}
