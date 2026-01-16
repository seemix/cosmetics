import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { localStorageService } from '@/app/[locale]/services/cart/localStorage.service';
import { axiosService } from '@/app/[locale]/services/cart/axios.service';
import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

export const guestCartAdapter = (): CartAdapter => ({
    async load() {
        const items = localStorageService.get();
        if (items?.length) return { subtotal: 0, items: [] };
      //  return axiosService.post('guest', items);
    },

    async addItem(itemToAdd: CartItemId) {
        const items = localStorageService.get();
        const existingItem = items.find(item => item.productId === itemToAdd.productId);
        if (existingItem) {
            existingItem.quantity += itemToAdd.quantity;
        } else {
            items.push(itemToAdd);
        }
        //resolve backend and set state
        localStorageService.save(items);
       // const subtotal = items.reduce((acc, p) => acc + p.quantity, 0);
        return axiosService.post('guest', items);

    },

    async updateQty(itemToUpdate: CartItemId) {
        const items = localStorageService.get();
        const index = items.findIndex(item => item.productId === itemToUpdate.productId);
        items[index].quantity = itemToUpdate.quantity;
        //resolve backend
        localStorageService.save(items);
       // const subtotal = items.reduce((acc, p) => acc + p.quantity, 0);
      //  return { items, subtotal };
        return axiosService.post('guest', items);

    },

    async removeItem(productId,_) {
        const items = localStorageService.get();
        const filteredItems = items.filter(item => item.productId !== productId);
        //resolve backend
        localStorageService.save(items);
     //   const subtotal = items.reduce((acc, p) => acc + p.quantity, 0);
      //  return { items: filteredItems, subtotal };
        return axiosService.post('guest', filteredItems);

    },

    async clear() {
        return localStorageService.clear();
    },
});