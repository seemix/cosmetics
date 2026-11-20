import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { fetchProductsByIds } from '@/lib/favorites/guestFavorites.api';
import { guestFavoritesStorage } from '@/lib/favorites/guestFavorites.storage';
import type { Paginated } from '@/types/api';
import type { IProduct } from '@/types/product';

/**
 * Users keep favourites on the backend, guests in localStorage. Every action
 * takes the current user id (`undefined` for a guest) to pick the storage;
 * the auth store imports this one, so it can't be read from here.
 */
interface IFavoritesStore {
	/** Ids of the favourite products. */
	favorites: string[];
	favoriteProducts: IProduct[];

	getFavouriteProducts: (locale: string, userId?: string) => Promise<void>;
	addFavorite: (productId: string, userId?: string) => Promise<void>;
	removeFavorite: (productId: string, userId?: string) => Promise<void>;
	setFavorites: (favorites: string[]) => void;
}

export const useFavoritesStore = create<IFavoritesStore>((set, get) => ({
	favorites: [],
	favoriteProducts: [],

	async getFavouriteProducts(locale, userId) {
		try {
			if (!userId) {
				set({
					favoriteProducts: await fetchProductsByIds(get().favorites, locale),
				});
				return;
			}
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
		if (get().favorites.includes(productId)) return;
		try {
			if (userId) {
				await apiClient.post('users/favorites', { id: productId });
			} else {
				guestFavoritesStorage.save([...get().favorites, productId]);
			}
			set((state) => ({ favorites: [...state.favorites, productId] }));
		} catch (error) {
			console.error(error);
		}
	},

	async removeFavorite(productId, userId) {
		try {
			if (userId) {
				await apiClient.delete(`users/favorites/${productId}`);
			} else {
				guestFavoritesStorage.save(
					get().favorites.filter((f) => f !== productId),
				);
			}
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
