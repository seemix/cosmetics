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
    authChecked: boolean;
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
    authChecked: false,
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

        try {
            const res = await fetch(`${assets.backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Використовуємо повідомлення від сервера, якщо воно є
                set({ error: data.message || 'Невірний логін або пароль', authChecked: true });
                return false;
            }

            set({ user: data.user, authChecked: true });
            return true;

        } catch (err) {
            set({ error: 'Помилка з’єднання з сервером' });
            console.error('Login error:', err);
            return false;
        } finally {
            // Виконується в будь-якому випадку: і при успіху, і при помилці
            //  set({ loading: false, authChecked: true });
        }

    },

    checkAuth: async () => {
        try {
            const res = await fetch(`${assets.backendUrl}/api/users/me`, {
                credentials: 'include',
            });
            const { user } = await res.json();
            set({ user });
        } catch (e) {
            set({error: e as string})
        } finally {
            set({ authChecked: true });
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
