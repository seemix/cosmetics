import { create } from 'zustand';
import type { RegisterFormData } from '@/app/[locale]/components/RegisterForm/registerSchema';
import { assets } from '@/app/[locale]/assets/assets';

type RegisterResult = {
    success: boolean;
};

interface AuthState {
    loading: boolean;
    error: string | null;
    register: (data: RegisterFormData) => Promise<RegisterResult>;
    pendingName: string | null;
    pendingEmail: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
    pendingEmail: null,
    pendingName: null,

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
                const {errors} = await res.json();
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
}));
