import type { Cart, CartItem } from '@/app/[locale]/services/cart/cart.types';

export interface CartAdapter {
    load(): Promise<Cart>
    addItem(item: CartItem): Promise<Cart>
    updateQty(id: string, qty: number): Promise<Cart>
    removeItem(id: string): Promise<Cart>
    clear(): Promise<Cart>
}
