import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { localStorageService } from '@/app/[locale]/services/cart/localStorage.service';
import { axiosService } from '@/app/[locale]/services/axios.service';
import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

export const guestCartAdapter = (): CartAdapter => ({

    async load(locale: string) {
        const items = localStorageService.get();
        if (!items.length) return null;
        return await axiosService.post(`carts/guest?locale=${locale}`, items).then(value => value.data);
    },

    async addItem(itemToAdd: CartItemId) {
        const items = localStorageService.get();
        const existingItem = items?.find(item => item.productId === itemToAdd.productId);
        if (existingItem) {
            existingItem.quantity += itemToAdd.quantity;
        } else {
            items.push(itemToAdd);
        }
        localStorageService.save(items);
        return await axiosService.post('carts/guest', items).then(value => value.data);

    },

    async updateQty(itemToUpdate: CartItemId) {
        const items = localStorageService.get();
        const index = items.findIndex(item => item.productId === itemToUpdate.productId);
        items[index].quantity = itemToUpdate.quantity;
        localStorageService.save(items);
        return await axiosService.post('carts/guest', items).then(value => value.data);

    },

    async removeItem(_, productId: string) {
        const items = localStorageService.get();
        const filteredItems = items.filter(item => item.productId !== productId);
        localStorageService.save(filteredItems);
        if (!filteredItems.length) return null;
        return await axiosService.post('guest', filteredItems).then(value => value.data);

    },

    async clear() {
        return localStorageService.clear();
    },

});