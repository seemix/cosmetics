import { create } from 'zustand';

import type { RegisterFormData } from '@/components/RegisterForm/registerSchema';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import { mergeGuestCart } from '@/lib/cart/mergeGuestCart';
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

async function loadFavorites() {
	try {
		const { data } = await apiClient.get<string[]>('users/favorites/my');
		useFavoritesStore.getState().setFavorites(data);
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
			set({ user: data.user });
			useCartStore.setState({ promoCode: '' });
			useCartStore.getState().setCart(await mergeGuestCart());
			loadFavorites();
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
			useFavoritesStore.getState().setFavorites([]);
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
