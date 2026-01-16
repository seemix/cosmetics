import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

export const localStorageService = {
    get: (): CartItemId[] => {
        return JSON.parse(<string>localStorage.getItem('nextLevelCart'));
    },
    save: (cart: CartItemId[]) => {
        return localStorage.setItem('nextLevelCart', JSON.stringify(cart));
    },
    clear: () => localStorage.removeItem('nextLevelCart')
}