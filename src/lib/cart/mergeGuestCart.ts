import { apiClient } from '@/lib/api/client';
import type { Cart } from '@/lib/cart/cart.types';
import { localStorageService } from '@/lib/cart/localStorage.service';

/** Moves the guest's localStorage items into the user's backend cart after login. */
export async function mergeGuestCart(): Promise<Cart | null> {
	const items = localStorageService.get();
	if (!items.length) return null;

	const { data } = await apiClient.post<{ cart: Cart }>('carts/merge', {
		items: items.map((item) => ({
			product: { id: item.productId },
			quantity: item.quantity,
		})),
	});
	localStorageService.clear();
	return data.cart;
}
