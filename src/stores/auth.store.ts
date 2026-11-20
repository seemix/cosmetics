import { create } from 'zustand';

import type { RegisterFormData } from '@/components/RegisterForm/registerSchema';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import { mergeGuestCart } from '@/lib/cart/mergeGuestCart';
import { mergeGuestFavorites } from '@/lib/favorites/guestFavorites.api';
import { guestFavoritesStorage } from '@/lib/favorites/guestFavorites.storage';
import { useCartStore } from '@/stores/cart.store';
import { useFavoritesStore } from '@/stores/favorites.store';
import type { UserResponse } from '@/types/api';
import type { UserState } from '@/types/user-state';

type UpdateUserInfo = {
	name?: string;
	surname?: string;
	phone?: string;
	city?: string;
	street?: string;
};

interface AuthState {
	loading: boolean;
	/** True once the initial session check has finished. */
	authChecked: boolean;
	error: string | null;
	forgotPasswordEmailSent: boolean;
	passwordHasReset: boolean;
	pendingName: string | null;
	pendingEmail: string | null;
	user: UserState | null;

	register: (data: RegisterFormData) => Promise<{ success: boolean }>;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (token: string, password: string) => Promise<void>;
	updateUserInfo: (data: UpdateUserInfo) => Promise<void>;
	clearError: () => void;
}

/** Loads the account's favourites, first moving in any the user saved as a guest. */
async function loadFavorites() {
	try {
		useFavoritesStore.getState().setFavorites(await mergeGuestFavorites());
	} catch (error) {
		console.error(error);
	}
}

export const useAuthStore = create<AuthState>((set) => ({
	loading: false,
	authChecked: false,
	forgotPasswordEmailSent: false,
	passwordHasReset: false,
	error: null,
	pendingEmail: null,
	pendingName: null,
	user: null,

	register: async (data) => {
		set({ loading: true, error: null });
		try {
			const { data: res } = await apiClient.post<{
				doc: { email: string; name: string };
			}>('users', data);
			set({ pendingEmail: res.doc.email, pendingName: res.doc.name });
			return { success: true };
		} catch (error) {
			set({ error: getErrorMessage(error) });
			return { success: false };
		} finally {
			set({ loading: false });
		}
	},

	login: async (email, password) => {
		set({ loading: true, error: null });
		try {
			const { data } = await apiClient.post<{ user: UserState }>(
				'users/login',
				{ email, password },
			);
			// Guest favourites are merged before `user` is set: whatever reacts to the
			// login (e.g. the favourites page) then already reads the merged list.
			await loadFavorites();
			set({ user: data.user });
			useCartStore.setState({ promoCode: '' });
			useCartStore.getState().setCart(await mergeGuestCart());
			return true;
		} catch (error) {
			set({ error: getErrorMessage(error) });
			return false;
		} finally {
			set({ loading: false, authChecked: true });
		}
	},

	// A guest is a normal outcome here, so nothing is written to `error`
	// (it would otherwise show up in the login form before the first attempt).
	checkAuth: async () => {
		try {
			const { data } = await apiClient.get<UserResponse>('users/me');
			set({ user: data.user ?? null });
			if (data.user) await loadFavorites();
			else
				useFavoritesStore.getState().setFavorites(guestFavoritesStorage.get());
		} catch (error) {
			console.error(error);
		} finally {
			set({ authChecked: true });
		}
	},

	// The guest cart is loaded by <CheckAuth>, which reacts to `user` becoming null.
	logout: async () => {
		try {
			await apiClient.post('users/logout');
			useCartStore.setState({ promoCode: '' });
			// The guest list was merged into the account on login, so this is usually empty.
			useFavoritesStore.setState({
				favorites: guestFavoritesStorage.get(),
				favoriteProducts: [],
			});
			set({ user: null });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		}
	},

	forgotPassword: async (email) => {
		set({ loading: true, error: null });
		try {
			await apiClient.post('users/forgot-password', { email });
			set({ forgotPasswordEmailSent: true });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		} finally {
			set({ loading: false });
		}
	},

	resetPassword: async (token, password) => {
		set({ loading: true });
		try {
			await apiClient.post('users/reset-password', { token, password });
			set({ passwordHasReset: true });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		} finally {
			set({ loading: false });
		}
	},

	updateUserInfo: async (userInfo) => {
		set({ loading: true });
		try {
			await apiClient.patch('users/update', userInfo);
			const { data } = await apiClient.get<UserResponse>('users/me');
			set({ user: data.user });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		} finally {
			set({ loading: false });
		}
	},

	clearError: () => set({ error: null }),
}));
