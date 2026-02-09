import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { create } from 'zustand';
import type { Cart, CartItemId } from '@/app/[locale]/services/cart/cart.types';

interface CartState {
    adapter: CartAdapter | null;
    cart: Cart | null;
    loading: boolean;
    itemLoading: string | null;
    error: string | null;

    init(adapter: CartAdapter, locale: string): void;

    loadCart(adapter: CartAdapter): Promise<void>;

    setCart(cart: Cart): void;

    addItem(item: CartItemId): Promise<void>;

    updateQty(item: CartItemId): Promise<void>;

    removeItem(productId: string, cartId?: string): Promise<void>;

    clear(): Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    adapter: null,
    cart: null,
    loading: false,
    itemLoading: null,
    error: null,

    init(adapter: CartAdapter, locale: string = 'ru') {
        set({ adapter });
        adapter.load(locale).then(cart => set({ cart: cart }));
    },

    setCart: (cart) => set({ cart }),

    async loadCart(adapter: CartAdapter, locale: string = 'ru') {
        adapter.load(locale).then(cart => set({ cart: cart }));
    },

    async addItem(item: CartItemId) {
        set({ itemLoading: item.productId });
        const cart = await get().adapter?.addItem(item);
        set({ cart });
        set({ itemLoading: null });
    },

    async updateQty(item: CartItemId) {
        set({ itemLoading: item.productId });
        const cart = await get().adapter?.updateQty(item);
        set({ cart });
        set({ itemLoading: null });

    },

    async removeItem(productId: string, cartId: string) {
        const prev = get().cart;
        set({
            cart: {
                ...prev!,
                items: prev!.items.filter(i => i.id !== productId),
            },
        });
        try {
            const cart = await get().adapter?.removeItem(productId, cartId);
            set({ cart });
        } catch (e) {
            console.log(e);
            set({ cart: prev });
        }
    },

    async clear() {
        const res = await get().adapter?.clear();
        set({ cart: res || null });
    }
}));