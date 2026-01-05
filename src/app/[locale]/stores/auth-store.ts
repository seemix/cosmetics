import { create } from 'zustand'
import type { RegisterFormData } from '@/app/[locale]/components/RegisterForm/registerSchema';
import { assets } from '@/app/[locale]/assets/assets';

interface AuthState {
    loading: boolean
    error: string | null
    register: (data: RegisterFormData) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,

    register: async (data) => {
        try {
            set({ loading: true, error: null })

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
                    }),
                }
            )

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error?.message || 'Помилка реєстрації')
            }
        } catch (err) {
            set({ error: (err as Error).message })
        } finally {
            set({ loading: false })
        }
    },
}))
