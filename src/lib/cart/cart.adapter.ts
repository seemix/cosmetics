import type { Cart, CartItemId } from '@/lib/cart/cart.types';

/** Options every cart request carries: titles come back in `locale`, prices honour `promoCode`. */
export type CartRequest = { locale: string; promoCode?: string };

/**
 * Storage strategy of the cart: guests keep items in localStorage and let the backend
 * price them, authenticated users work with the cart stored on the backend.
 * `null` means "no cart" (a guest with no items).
 */
export interface CartAdapter {
	load(locale: string): Promise<Cart | null>;

	addItem(item: CartItemId, request: CartRequest): Promise<Cart | null>;

	updateQty(item: CartItemId, request: CartRequest): Promise<Cart | null>;

	removeItem(
		cartId: string | undefined,
		productId: string,
		request: CartRequest,
	): Promise<Cart | null>;

	clear(): Promise<void>;
}
