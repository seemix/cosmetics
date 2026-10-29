import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CartAdapter } from '@/lib/cart/cart.adapter';
import type { Cart } from '@/lib/cart/cart.types';
import { useCartStore } from '@/stores/cart.store';

const item = (id: string) => ({
	id,
	title: id,
	subtitle: '',
	slug: id,
	price: 10,
	quantity: 1,
	thumbnail: '',
});

function adapter(overrides: Partial<CartAdapter> = {}): CartAdapter {
	return {
		load: vi.fn().mockResolvedValue({ items: [item('a')], subtotal: 10 }),
		addItem: vi
			.fn()
			.mockResolvedValue({ items: [item('a'), item('b')], subtotal: 20 }),
		updateQty: vi.fn().mockResolvedValue({ items: [item('a')], subtotal: 10 }),
		removeItem: vi.fn().mockResolvedValue({ items: [], subtotal: 0 }),
		clear: vi.fn().mockResolvedValue(undefined),
		...overrides,
	};
}

describe('cart store', () => {
	beforeEach(() => {
		useCartStore.setState({
			adapter: null,
			locale: 'ru',
			cart: null,
			promoCode: '',
			itemLoading: null,
			error: null,
		});
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	it('adds an item through the adapter with locale and promo code', async () => {
		const a = adapter();
		useCartStore.setState({ adapter: a, locale: 'ro', promoCode: 'X' });
		await useCartStore.getState().addItem({ productId: 'b', quantity: 1 });
		expect(a.addItem).toHaveBeenCalledWith(
			{ productId: 'b', quantity: 1 },
			{ locale: 'ro', promoCode: 'X' },
		);
		expect(useCartStore.getState().cart?.items).toHaveLength(2);
		expect(useCartStore.getState().itemLoading).toBeNull();
	});

	it('resets the loading flag and keeps the cart when adding fails', async () => {
		const prev = { items: [item('a')], subtotal: 10 };
		useCartStore.setState({
			adapter: adapter({ addItem: vi.fn().mockRejectedValue(new Error('x')) }),
			cart: prev,
		});
		await useCartStore.getState().addItem({ productId: 'b', quantity: 1 });
		expect(useCartStore.getState().itemLoading).toBeNull();
		expect(useCartStore.getState().cart).toEqual(prev);
	});

	it('rolls back an optimistic removal when the request fails', async () => {
		const prev = { items: [item('a'), item('b')], subtotal: 20 };
		useCartStore.setState({
			adapter: adapter({
				removeItem: vi.fn().mockRejectedValue(new Error('network')),
			}),
			cart: prev,
		});
		await useCartStore.getState().removeItem('cart-1', 'a');
		expect(useCartStore.getState().cart).toEqual(prev);
	});

	it('clear() empties the cart and the promo code', async () => {
		useCartStore.setState({
			adapter: adapter(),
			cart: { items: [item('a')], subtotal: 10 },
			promoCode: 'X',
		});
		await useCartStore.getState().clear();
		expect(useCartStore.getState().cart).toBeNull();
		expect(useCartStore.getState().promoCode).toBe('');
	});

	it('ignores a stale init that resolves after a newer one', async () => {
		let resolveSlow: (cart: Cart) => void = () => {};
		const slow = adapter({
			load: vi.fn(
				() =>
					new Promise<Cart>((resolve) => {
						resolveSlow = resolve;
					}),
			),
		});
		const fast = adapter({
			load: vi.fn().mockResolvedValue({ items: [item('fresh')], subtotal: 1 }),
		});
		const first = useCartStore.getState().init(slow, 'ru');
		await useCartStore.getState().init(fast, 'ru');
		resolveSlow({ items: [item('stale')], subtotal: 1 });
		await first;
		expect(useCartStore.getState().cart?.items[0].id).toBe('fresh');
	});
});
