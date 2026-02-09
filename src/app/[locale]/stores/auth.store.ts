import { create } from 'zustand';

import type { RegisterFormData } from '@/app/[locale]/components/RegisterForm/registerSchema';
import { axiosService } from '@/app/[locale]/services/axios.service';
import { getErrorMessage } from '@/app/[locale]/services/getErrorMessage';
import { mergeGuestCart } from '@/app/[locale]/services/cart/mergeGuestCart';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { guestCartAdapter } from '@/app/[locale]/services/cart/guestCart.adapter';

type RegisterResult = {
    success: boolean;
};

type UserState = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    city?: string;
    street?: string;
    wholesale: boolean;
    locale: string;
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
            const { data: res } = await axiosService.post<{
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
            const { data } = await axiosService.post<{
                user: UserState;
            }>('users/login', { email, password });

            set({ user: data.user, authChecked: true });
            const mergedCart = await mergeGuestCart();
            useCartStore.getState().setCart(mergedCart?.cart);

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
            const { data } = await axiosService.get<{
                user: UserState;
            }>('users/me');

            set({ user: data.user });
        } catch (error) {
            set({ error: getErrorMessage(error) });
        } finally {
            set({ authChecked: true });
        }
    },

    logout: async () => {
        try {
            await axiosService.post('users/logout');
            useCartStore.getState().init(guestCartAdapter());
            useCartStore.getState().adapter?.load();
            set({ user: null, authChecked: false });
        } catch (error) {
            set({ error: getErrorMessage(error) });
        }
    },

    forgotPassword: async (email: string) => {
        try {
            set({ loading: true, error: null });
            await axiosService.post('users/forgot-password', { email });
            set({ forgotPasswordEmailSent: true, loading: false });
        } catch (error) {
            set({ error: getErrorMessage(error) });
        }
    },

    resetPassword: async (token: string, password: string) => {
        try {
            set({ loading: true });
            await axiosService.post('users/reset-password', { token, password });
            set({ loading: false, passwordHasReset: true });
        } catch (error) {
            set({ error: getErrorMessage(error), loading: false });
        }
    },

    clearError: () => set({ error: null })
}));
