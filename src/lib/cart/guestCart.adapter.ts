import { apiClient } from '@/lib/api/client';
import type { CartAdapter, CartRequest } from '@/lib/cart/cart.adapter';
import type { Cart, CartItemId } from '@/lib/cart/cart.types';
import { localStorageService } from '@/lib/cart/localStorage.service';

/** Prices the locally stored items on the backend; nothing is persisted there. */
async function priceItems(
	items: CartItemId[],
	{ locale, promoCode }: CartRequest,
): Promise<Cart | null> {
	if (!items.length) return null;
	const { data } = await apiClient.post<{ cart: Cart }>(
		'carts/guest',
		{ items, promoCode },
		{ params: { locale } },
	);
	return data.cart;
}

export const guestCartAdapter = (): CartAdapter => ({
	async load(locale) {
		return priceItems(localStorageService.get(), { locale });
	},

	async addItem(itemToAdd, request) {
		const items = localStorageService.get();
		const existingItem = items.find(
			(item) => item.productId === itemToAdd.productId,
		);
		if (existingItem) {
			existingItem.quantity += itemToAdd.quantity;
		} else {
			items.push(itemToAdd);
		}
		localStorageService.save(items);
		return priceItems(items, request);
	},

	async updateQty(itemToUpdate, request) {
		const items = localStorageService.get();
		const existingItem = items.find(
			(item) => item.productId === itemToUpdate.productId,
		);
		if (existingItem) {
			existingItem.quantity = itemToUpdate.quantity;
		} else {
			items.push(itemToUpdate);
		}
		localStorageService.save(items);
		return priceItems(items, request);
	},

	async removeItem(_cartId, productId, request) {
		const items = localStorageService
			.get()
			.filter((item) => item.productId !== productId);
		localStorageService.save(items);
		return priceItems(items, request);
	},

	async clear() {
		localStorageService.clear();
	},
});
