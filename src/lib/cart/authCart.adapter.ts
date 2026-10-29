import { apiClient } from '@/lib/api/client';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { Cart } from '@/lib/cart/cart.types';

export const authCartAdapter = (): CartAdapter => ({
	async load(locale) {
		const { data } = await apiClient.get<Cart>('carts/me', {
			params: { locale },
		});
		return data;
	},

	async addItem(item, { locale, promoCode }) {
		const { data } = await apiClient.post<{ cart: Cart }>(
			'carts/add-item',
			{ item, promoCode },
			{ params: { locale } },
		);
		return data.cart;
	},

	async updateQty(item, { locale, promoCode }) {
		const { data } = await apiClient.patch<{ cart: Cart }>(
			'carts/update-item',
			{ item, promoCode },
			{ params: { locale } },
		);
		return data.cart;
	},

	async removeItem(cartId, productId, { locale, promoCode }) {
		const { data } = await apiClient.post<{ cart: Cart }>(
			'carts/remove-item',
			{ cartId, productId, promoCode },
			{ params: { locale } },
		);
		return data.cart;
	},

	async clear() {
		await apiClient.post('carts/clear');
	},
});
