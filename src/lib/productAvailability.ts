import type { IProduct } from '@/types/product';

/**
 * A product can be added to the cart unless it is switched off in the admin
 * panel or out of stock on the web warehouse. A missing `inStock` (e.g. a
 * populated related product) counts as in stock; the order endpoint is the
 * final stock check anyway.
 */
export function isPurchasable(
	product: Pick<IProduct, 'unavailable' | 'inStock'>,
): boolean {
	return !product.unavailable && product.inStock !== false;
}
