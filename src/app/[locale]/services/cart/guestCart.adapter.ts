import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { localStorageService } from '@/app/[locale]/services/cart/localStorage.service';
import { axiosService } from '@/app/[locale]/services/axios.service';
import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

export const guestCartAdapter = (): CartAdapter => ({

    async load(locale: string, promoCode?: string) {
        const items = localStorageService.get();
        if (!items.length) return null;
        return await axiosService.post(`carts/guest?locale=${locale}`, { items, promoCode }).then(value => value.data.cart);
    },

    async addItem(itemToAdd: CartItemId, promoCode?: string) {
        const items = localStorageService.get();
        const existingItem = items?.find(item => item.productId === itemToAdd.productId);
        if (existingItem) {
            existingItem.quantity += itemToAdd.quantity;
        } else {
            items.push(itemToAdd);
        }
        localStorageService.save(items);
        return await axiosService.post('carts/guest', { items, promoCode }).then(value => value.data.cart);
    },

    async updateQty(itemToUpdate: CartItemId, promoCode?: string) {
        const items = localStorageService.get();
        const index = items.findIndex(item => item.productId === itemToUpdate.productId);
        items[index].quantity = itemToUpdate.quantity;
        localStorageService.save(items);
        return await axiosService.post('carts/guest', { items, promoCode }).then(value => value.data.cart);

    },

    async removeItem(_, productId: string, promoCode?: string) {
        const items = localStorageService.get();
        const filteredItems = items.filter(item => item.productId !== productId);
        localStorageService.save(filteredItems);
        if (!filteredItems.length) return null;
        return await axiosService.post('carts/guest', { items: filteredItems, promoCode }).then(value => value.data.cart);
    },

    async clear() {
        return localStorageService.clear();
    },
});