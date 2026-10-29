import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { Cart, CartItemId } from '@/lib/cart/cart.types';

interface CartState {
	adapter: CartAdapter | null;
	cart: Cart | null;
	promoCode?: string;
	promoError?: string;
	loading: boolean;
	promoLoading: boolean;
	itemLoading: string | null;
	error: string | null;

	init(adapter: CartAdapter, locale: string): void;

	loadCart(adapter: CartAdapter): Promise<void>;

	setCart(cart: Cart): void;

	addItem(item: CartItemId): Promise<void>;

	updateQty(item: CartItemId): Promise<void>;

	removeItem(cartId: string | undefined, productId: string): Promise<void>;

	applyPromoCode(promoCode: string, locale: string): Promise<void>;

	deletePromoCode(locale: string): void;

	clear(): Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	adapter: null,
	cart: null,
	loading: false,
	promoLoading: false,
	promoError: '',
	promoCode: '',
	itemLoading: null,
	error: null,

	init(adapter: CartAdapter, locale: string = 'ru') {
		set({ adapter });
		adapter.load(locale).then((cart) => set({ cart: cart }));
	},

	setCart: (cart) => set({ cart }),

	async loadCart(adapter: CartAdapter, locale: string = 'ru') {
		adapter.load(locale).then((cart) => set({ cart: cart }));
	},

	async addItem(item: CartItemId) {
		set({ itemLoading: item.productId });
		const cart = await get().adapter?.addItem(item, get().promoCode);
		set({ cart });
		set({ itemLoading: null });
	},

	async updateQty(item: CartItemId) {
		set({ itemLoading: item.productId });
		const cart = await get().adapter?.updateQty(item, get().promoCode);
		set({ cart });
		set({ itemLoading: null });
	},

	// Argument order matches `CartAdapter.removeItem` and the `CartItem` call site: cartId first.
	async removeItem(cartId: string | undefined, productId: string) {
		const prev = get().cart;
		if (!prev) return;

		// Optimistic update: drop the item locally, roll back if the request fails.
		set({
			cart: {
				...prev,
				items: prev.items.filter((i) => i.id !== productId),
			},
		});
		try {
			const cart = await get().adapter?.removeItem(
				cartId as string,
				productId,
				get().promoCode,
			);
			set({ cart });
		} catch (e) {
			console.log(e);
			set({ cart: prev });
		}
	},

	async applyPromoCode(promoCode: string, locale: string) {
		const cart = get().cart;

		const payload = {
			promoCode,
			...(cart?.id !== 'preview'
				? { cartId: cart?.id }
				: {
						items: cart?.items.map((item) => {
							return { productId: item.id, quantity: item.quantity };
						}),
					}),
		};
		set({ promoLoading: true, promoError: '' });
		try {
			const { data } = await apiClient.post('/carts/promo', payload);
			set({ cart: data || null, promoCode, error: null });
		} catch (e) {
			get()
				?.adapter?.load(locale)
				.then((cart) => set({ cart: cart }));
			set({ promoError: getErrorMessage(e), promoCode: '' });
		} finally {
			set({ promoLoading: false });
		}
	},

	async deletePromoCode(locale: string = 'ru') {
		const { adapter } = get();
		if (!adapter) return;

		set({ promoLoading: true, promoError: '', promoCode: '' });

		try {
			const cart = await adapter.load(locale);
			set({ cart, promoError: '' });
		} catch (e) {
			set({ error: getErrorMessage(e) });
		} finally {
			set({ promoLoading: false });
		}
	},

	async clear() {
		const res = await get().adapter?.clear();
		set({ cart: res || null, promoCode: '' });
	},
}));
