'use client';

import type React from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useAuthStore } from '@/stores/auth.store';
import { useFavoritesStore } from '@/stores/favorites.store';

export default function FavoriteButton({ productId }: { productId: string }) {
	const isFavorite = useFavoritesStore((s) => s.favorites.includes(productId));
	const addFavorite = useFavoritesStore((s) => s.addFavorite);
	const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
	const userId = useAuthStore((s) => s.user?.id);
	const authChecked = useAuthStore((s) => s.authChecked);

	// Until the session check ends it is unknown where favourites live (and the
	// list isn't loaded yet), so the button appears only after it, on the client.
	if (!authChecked) return null;

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (isFavorite) {
			removeFavorite(productId, userId);
		} else {
			addFavorite(productId, userId);
		}
	};

	return (
		<button
			type={'button'}
			onClick={handleClick}
			aria-label={'favorite'}
			aria-pressed={isFavorite}
			className={
				'cursor-pointer text-[var(--main)] transition-colors duration-300 text-[1.8em] z-10'
			}
		>
			{isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
		</button>
	);
}
