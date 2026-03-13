'use client';

import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

import { useFavoritesStore } from '@/app/[locale]/stores/favorites.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';

export default function FavoriteButton({ productId }: { productId: string }) {

    const { favorites, removeFavorite, addFavorite } = useFavoritesStore();
    const { user } = useAuthStore();
    const handleClick = () => {
        if (favorites.includes(productId)) {
            removeFavorite(productId, user?.id).then();
        } else {
            addFavorite(productId, user?.id).then();
        }
    };

    return (
        <>
            {user && <button type={'button'}
                             onClick={handleClick}
                             className={`cursor-pointer text-[var(--main)] 
                            transition-colors duration-300 text-[1.8em] z-10`}>
                {favorites.length > 0 && !favorites.includes(productId) ? <IoMdHeartEmpty/> :
                    <IoMdHeart className={'text-[var(--main)]'}/>}
            </button>}
        </>
    );
}