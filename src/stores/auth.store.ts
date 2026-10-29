import { create } from 'zustand';

import type { RegisterFormData } from '@/components/RegisterForm/registerSchema';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { mergeGuestCart } from '@/lib/cart/mergeGuestCart';
import { useCartStore } from '@/stores/cart.store';
import { useFavoritesStore } from '@/stores/favorites.store';

type RegisterResult = {
	success: boolean;
};

type UserState = {
	id: string;
	name: string;
	surname: string;
	email: string;
	phone: string;
	city?: string;
	street?: string;
	wholesale: boolean;
	locale: string;
};

type UpdateUserInfo = {
	name?: string;
	surname?: string;
	phone?: string;
	city?: string;
	street?: string;
};

interface AuthState {
	loading: boolean;
	authChecked: boolean;
	error: string | null;
	forgotPasswordEmailSent: boolean;
	passwordHasReset: boolean;
	pendingName: string | null;
	pendingEmail: string | null;
	user: UserState | null;

	register: (data: RegisterFormData) => Promise<RegisterResult>;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
	forgotPassword: (email: string) => Promise<void>;
	resetPassword: (token: string, email: string) => Promise<void>;
	updateUserInfo: (data: UpdateUserInfo) => Promise<void>;
	clearError: () => void;
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

			set({
				pendingEmail: res.doc.email,
				pendingName: res.doc.name,
			});

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
			const { data } = await apiClient.post<{
				user: UserState;
			}>('users/login', { email, password });

			set({ user: data.user, authChecked: true });
			const mergedCart = await mergeGuestCart();
			useCartStore.getState().setCart(mergedCart?.cart);
			useCartStore.setState({ promoCode: '' });

			return true;
		} catch (error) {
			set({ error: getErrorMessage(error) });
			return false;
		} finally {
			set({ loading: false, authChecked: true });
		}
	},

	checkAuth: async () => {
		try {
			const { data } = await apiClient.get<{
				user: UserState;
			}>('users/me');
			set({ user: data.user });
			const fav = await apiClient.get('users/favorites/my');
			useFavoritesStore.getState().setFavorites(fav.data);
		} catch (error) {
			set({ error: getErrorMessage(error) });
		} finally {
			set({ authChecked: true });
		}
	},

	logout: async () => {
		try {
			await apiClient.post('users/logout');
			useCartStore.getState().init(guestCartAdapter(), 'ru');
			useCartStore.getState().adapter?.load('ru');
			useCartStore.setState({ promoCode: '' });
			set({ user: null, authChecked: false });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		}
	},

	forgotPassword: async (email: string) => {
		try {
			set({ loading: true, error: null });
			await apiClient.post('users/forgot-password', { email });
			set({ forgotPasswordEmailSent: true, loading: false });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		}
	},

	resetPassword: async (token: string, password: string) => {
		try {
			set({ loading: true });
			await apiClient.post('users/reset-password', { token, password });
			set({ loading: false, passwordHasReset: true });
		} catch (error) {
			set({ error: getErrorMessage(error), loading: false });
		}
	},

	updateUserInfo: async (userInfo) => {
		try {
			set({ loading: true });
			await apiClient.patch('users/update', userInfo);
			const { data } = await apiClient.get<{
				user: UserState;
			}>('users/me');
			set({ user: data.user });
			set({ loading: false });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		}
	},

	clearError: () => set({ error: null }),
}));
