import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import type { Paginated } from '@/types/api';
import type { IProduct } from '@/types/product';

interface IFavoritesStore {
	/** Ids of the user's favourite products. */
	favorites: string[];
	favoriteProducts: IProduct[];

	getFavouriteProducts: (locale: string) => Promise<void>;
	addFavorite: (productId: string, userId?: string) => Promise<void>;
	removeFavorite: (productId: string, userId?: string) => Promise<void>;
	setFavorites: (favorites: string[]) => void;
}

export const useFavoritesStore = create<IFavoritesStore>((set) => ({
	favorites: [],
	favoriteProducts: [],

	async getFavouriteProducts(locale) {
		try {
			const { data } = await apiClient.get<Paginated<IProduct>>(
				'users/favorites',
				{ params: { locale } },
			);
			set({ favoriteProducts: data.docs });
		} catch (error) {
			console.error(error);
		}
	},

	async addFavorite(productId, userId) {
		if (!userId) return;
		try {
			await apiClient.post('users/favorites', { id: productId });
			set((state) => ({ favorites: [...state.favorites, productId] }));
		} catch (error) {
			console.error(error);
		}
	},

	async removeFavorite(productId, userId) {
		if (!userId) return;
		try {
			await apiClient.delete(`users/favorites/${productId}`);
			set((state) => ({
				favorites: state.favorites.filter((f) => f !== productId),
				favoriteProducts: state.favoriteProducts.filter(
					(p) => p.id !== productId,
				),
			}));
		} catch (error) {
			console.error(error);
		}
	},

	setFavorites(favorites) {
		set({ favorites });
	},
}));
