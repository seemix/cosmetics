'use client';

import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import NoContent from '@/components/NoContent/NoContent';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import { useAuthStore } from '@/stores/auth.store';
import { useFavoritesStore } from '@/stores/favorites.store';

export default function MyFavorites() {
	const { favoriteProducts, getFavouriteProducts } = useFavoritesStore(
		useShallow((s) => ({
			favoriteProducts: s.favoriteProducts,
			getFavouriteProducts: s.getFavouriteProducts,
		})),
	);
	const authChecked = useAuthStore((s) => s.authChecked);
	const userId = useAuthStore((s) => s.user?.id);
	const locale = useLocale();
	// Which request the shown list belongs to; avoids flashing "empty" while loading.
	const requestKey = `${userId ?? 'guest'}:${locale}`;
	const [loadedKey, setLoadedKey] = useState<string | null>(null);

	// Waits for the session check: it decides whether the list comes from the
	// account or from localStorage, and fills the guest's ids.
	useEffect(() => {
		if (!authChecked) return;
		let cancelled = false;
		getFavouriteProducts(locale, userId).then(() => {
			if (!cancelled) setLoadedKey(requestKey);
		});
		return () => {
			cancelled = true;
		};
	}, [authChecked, getFavouriteProducts, locale, userId, requestKey]);

	if (loadedKey !== requestKey) return null;

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
