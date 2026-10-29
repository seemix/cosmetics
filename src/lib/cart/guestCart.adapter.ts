import { apiClient } from '@/lib/api/client';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { CartItemId } from '@/lib/cart/cart.types';
import { localStorageService } from '@/lib/cart/localStorage.service';

export const guestCartAdapter = (): CartAdapter => ({
	async load(locale: string, promoCode?: string) {
		const items = localStorageService.get();
		if (!items.length) return null;
		return await apiClient
			.post(`carts/guest?locale=${locale}`, { items, promoCode })
			.then((value) => value.data.cart);
	},

	async addItem(itemToAdd: CartItemId, promoCode?: string) {
		const items = localStorageService.get();
		const existingItem = items?.find(
			(item) => item.productId === itemToAdd.productId,
		);
		if (existingItem) {
			existingItem.quantity += itemToAdd.quantity;
		} else {
			items.push(itemToAdd);
		}
		localStorageService.save(items);
		return await apiClient
			.post('carts/guest', { items, promoCode })
			.then((value) => value.data.cart);
	},

	async updateQty(itemToUpdate: CartItemId, promoCode?: string) {
		const items = localStorageService.get();
		const index = items.findIndex(
			(item) => item.productId === itemToUpdate.productId,
		);
		items[index].quantity = itemToUpdate.quantity;
		localStorageService.save(items);
		return await apiClient
			.post('carts/guest', { items, promoCode })
			.then((value) => value.data.cart);
	},

	async removeItem(_, productId: string, promoCode?: string) {
		const items = localStorageService.get();
		const filteredItems = items.filter((item) => item.productId !== productId);
		localStorageService.save(filteredItems);
		if (!filteredItems.length) return null;
		return await apiClient
			.post('carts/guest', { items: filteredItems, promoCode })
			.then((value) => value.data.cart);
	},

	async clear() {
		return localStorageService.clear();
	},
});
