import type { Cart, CartItemId } from '@/app/[locale]/services/cart/cart.types';

export interface CartAdapter {

    load(locale: string): Promise<Cart>;

    addItem(item: CartItemId): Promise<Cart>;

    updateQty(item: CartItemId): Promise<Cart>;

    removeItem(cartId: string, productId: string): Promise<Cart>;

    clear(): Promise<void>;
}
