import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

const STORAGE_KEY = 'nextLevelCart';

export const localStorageService = {
    get(): CartItemId[] {
        if (typeof window === 'undefined') return [];

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];

            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    },

    save(cart: CartItemId[]): void {
        if (typeof window === 'undefined') return;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    },

    clear(): void {
        if (typeof window === 'undefined') return;

        localStorage.removeItem(STORAGE_KEY);
    },
};