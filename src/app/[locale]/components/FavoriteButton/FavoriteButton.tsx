'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

import { useFavoritesStore } from '@/app/[locale]/stores/favorites.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';

export default function FavoriteButton({ productId }: { productId: string }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { favorites, removeFavorite, addFavorite } = useFavoritesStore();
    const { user } = useAuthStore();

    useEffect(() => {
        setMounted(true);
        setIsFavorite(favorites.includes(productId));
    }, [favorites, productId]);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorite) {
            removeFavorite(productId, user?.id).then();
        } else {
            addFavorite(productId, user?.id).then();
        }
    };

    if (!mounted || !user) return null;

    return (
        <button
            type={'button'}
            onClick={handleClick}
            className={'cursor-pointer text-[var(--main)] transition-colors duration-300 text-[1.8em] z-10'}
        >
            {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
        </button>
    );
}