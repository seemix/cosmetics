import { create } from 'zustand';
import { axiosService } from '@/app/[locale]/services/axios.service';
import type { IProduct } from '@/app/[locale]/types/product';

interface IFavoritesStore {
    favorites: string[];
    favoriteProducts: IProduct[];

    getMyFavorites: (userId?: string) => Promise<void>;
    getFavouriteProducts: () => void;
    addFavorite: (productId: string, userId?: string) => Promise<void>;
    removeFavorite: (productId: string, userId?: string) => Promise<void>;
    setFavorites: (favorites: string[]) => void;
    setFavoriteProducts: (products: IProduct[]) => void;
}

export const useFavoritesStore = create<IFavoritesStore>((set) => ({
    favorites: [],
    favoriteProducts: [],

    async getMyFavorites(userId?: string) {
        if (!userId) {
            return;
        } else {
            const { data } = await axiosService.get('users/favorites/my');
            set({ favorites: data });
        }
    },

    async getFavouriteProducts() {
        const { data } = await axiosService.get('users/favorites');
        set({ favoriteProducts: data.docs });
    },

    async addFavorite(productId: string, userId?: string) {
        if (!userId) return;
        await axiosService.post('users/favorites', { id: productId });
        set(state => ({ favorites: [...state.favorites, productId] }));
    },

    async removeFavorite(productId: string, userId?: string) {
        if (!userId) return;
        await axiosService.delete(`users/favorites/${productId}`);

        set(state => ({
            favorites: state.favorites.filter(f => f !== productId),
            favoriteProducts: state.favoriteProducts.filter(p => p.id !== productId)
        }));
    },

    setFavoriteProducts(products: IProduct[]) {
        set({ favoriteProducts: products });
    },

    setFavorites(favorites: string[]) {
        set({ favorites });
    }
}));
