import { create } from 'zustand';
import type { RegisterFormData } from '@/app/[locale]/components/RegisterForm/registerSchema';
import { assets } from '@/app/[locale]/assets/assets';

type RegisterResult = {
    success: boolean;
};

type UserState = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    wholesale: boolean;
    locale: string;
}

interface AuthState {
    loading: boolean;
    error: string | null;
    register: (data: RegisterFormData) => Promise<RegisterResult>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    pendingName: string | null;
    pendingEmail: string | null;
    user: UserState | null;
}

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
    pendingEmail: null,
    pendingName: null,
    user: null,


    register: async (data) => {
        try {
            set({ loading: true, error: null });

            const res = await fetch(
                `${assets.backendUrl}/api/users`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        name: data.name,
                        surname: data.surname,
                        phone: data.phone,
                        locale: data.locale
                    }),
                }
            );
            if (res.ok) {
                const { doc } = await res.json();
                set({ pendingEmail: doc.email, pendingName: doc.name });
            }
            if (!res.ok) {
                const { errors } = await res.json();
                throw new Error(errors[0].data.errors[0].message || 'Registration failed');
            }
            return { success: true };

        } catch (err) {
            set({ error: (err as Error).message });
            return { success: false };
        } finally {
            set({ loading: false });
        }
    },

    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        const res = await fetch(`${assets.backendUrl}/api/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            set({ error: 'Invalid credentials', loading: false });
            return false;
        }

        const data = await res.json();
        set({ user: data.user, loading: false });

        return true;
    },

    checkAuth: async () => {
        const res = await fetch(`${assets.backendUrl}/api/users/me`, {
            credentials: 'include',
        });

        if (res.ok) {
            const { user } = await res.json();
            set({ user });
        }
    },

    logout: async () => {
        await fetch(`${assets.backendUrl}/api/users/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        set({ user: null });
        // userCartStore.getState().crearCart()
    }
}));
