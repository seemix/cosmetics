import type { Cart, CartItemId } from '@/lib/cart/cart.types';

export interface CartAdapter {

    load(locale: string): Promise<Cart>;

    addItem(item: CartItemId, promoCode?: string): Promise<Cart>;

    updateQty(item: CartItemId, promoCode?: string): Promise<Cart>;

    removeItem(cartId: string, productId: string, promoCode?: string): Promise<Cart>;

    clear(): Promise<void>;
}
