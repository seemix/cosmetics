import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { Cart, CartItemId } from '@/lib/cart/cart.types';

interface CartState {
	adapter: CartAdapter | null;
	locale: string;
	cart: Cart | null;
	promoCode: string;
	promoError: string;
	promoLoading: boolean;
	/** Product whose add/update request is in flight. */
	itemLoading: string | null;
	error: string | null;

	/** Switches between the guest and the authenticated cart and loads it. */
	init(adapter: CartAdapter, locale: string): Promise<void>;
	setCart(cart: Cart | null): void;
	addItem(item: CartItemId): Promise<void>;
	updateQty(item: CartItemId): Promise<void>;
	removeItem(cartId: string | undefined, productId: string): Promise<void>;
	applyPromoCode(promoCode: string): Promise<void>;
	deletePromoCode(): Promise<void>;
	clear(): Promise<void>;
}

// Only the latest `init` may write the cart: login/logout can start a new load
// before the previous one has finished.
let initRequest = 0;

export const useCartStore = create<CartState>((set, get) => {
	const request = () => ({
		locale: get().locale,
		promoCode: get().promoCode || undefined,
	});

	/** Runs an item request with `itemLoading` set; failures keep the current cart. */
	const withItemLoading = async (
		productId: string,
		run: (adapter: CartAdapter) => Promise<Cart | null>,
	) => {
		const { adapter } = get();
		if (!adapter) return;
		set({ itemLoading: productId, error: null });
		try {
			set({ cart: await run(adapter) });
		} catch (e) {
			console.error(e);
			set({ error: getErrorMessage(e) });
		} finally {
			set({ itemLoading: null });
		}
	};

	return {
		adapter: null,
		locale: 'ru',
		cart: null,
		promoCode: '',
		promoError: '',
		promoLoading: false,
		itemLoading: null,
		error: null,

		async init(adapter, locale) {
			const current = ++initRequest;
			set({ adapter, locale });
			try {
				const cart = await adapter.load(locale);
				if (current === initRequest) set({ cart });
			} catch (e) {
				console.error(e);
				if (current === initRequest) set({ error: getErrorMessage(e) });
			}
		},

		setCart: (cart) => set({ cart }),

		addItem: (item) =>
			withItemLoading(item.productId, (adapter) =>
				adapter.addItem(item, request()),
			),

		updateQty: (item) =>
			withItemLoading(item.productId, (adapter) =>
				adapter.updateQty(item, request()),
			),

		async removeItem(cartId, productId) {
			const { adapter, cart: prev } = get();
			if (!adapter || !prev) return;

			// Optimistic update: drop the item locally, roll back if the request fails.
			set({
				cart: { ...prev, items: prev.items.filter((i) => i.id !== productId) },
			});
			try {
				set({ cart: await adapter.removeItem(cartId, productId, request()) });
			} catch (e) {
				console.error(e);
				set({ cart: prev });
			}
		},

		async applyPromoCode(promoCode) {
			const { cart, adapter, locale } = get();

			// A guest cart has no backend id ("preview"), so its items are sent instead.
			const payload = {
				promoCode,
				...(cart?.id !== 'preview'
					? { cartId: cart?.id }
					: {
							items: cart?.items.map((item) => ({
								productId: item.id,
								quantity: item.quantity,
							})),
						}),
			};
			set({ promoLoading: true, promoError: '' });
			try {
				const { data } = await apiClient.post<Cart>('carts/promo', payload, {
					params: { locale },
				});
				set({ cart: data || null, promoCode, error: null });
			} catch (e) {
				set({ promoError: getErrorMessage(e), promoCode: '' });
				if (adapter)
					set({ cart: await adapter.load(locale).catch(() => cart) });
			} finally {
				set({ promoLoading: false });
			}
		},

		async deletePromoCode() {
			const { adapter, locale } = get();
			if (!adapter) return;

			set({ promoLoading: true, promoError: '', promoCode: '' });
			try {
				set({ cart: await adapter.load(locale) });
			} catch (e) {
				set({ error: getErrorMessage(e) });
			} finally {
				set({ promoLoading: false });
			}
		},

		async clear() {
			try {
				await get().adapter?.clear();
				set({ cart: null, promoCode: '' });
			} catch (e) {
				console.error(e);
				set({ error: getErrorMessage(e) });
			}
		},
	};
});
