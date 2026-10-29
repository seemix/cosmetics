import { apiClient } from '@/lib/api/client';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { Cart, CartItemId } from '@/lib/cart/cart.types';

export const authCartAdapter = (): CartAdapter => ({
	async load(locale: string): Promise<Cart> {
		const { data } = await apiClient.get<Cart>(`carts/me?locale=${locale}`);
		return data;
	},

	async addItem(item: CartItemId, promoCode?: string): Promise<Cart> {
		const { data } = await apiClient.post<{ cart: Cart }>('carts/add-item', {
			item,
			promoCode,
		});
		return data.cart;
	},

	async updateQty(item: CartItemId, promoCode?: string): Promise<Cart> {
		const { data } = await apiClient.patch<{ cart: Cart }>(
			'carts/update-item',
			{ item, promoCode },
		);
		return data.cart;
	},

	async removeItem(
		cartId: string,
		productId: string,
		promoCode?: string,
	): Promise<Cart> {
		const { data } = await apiClient.post<{ cart: Cart }>('carts/remove-item', {
			cartId,
			productId,
			promoCode,
		});
		return data.cart;
	},

	async clear(): Promise<void> {
		return await apiClient.post('carts/clear');
	},
});
