import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

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
		addItem: vi.fn().mockResolvedValue({ items: [item('a'), item('b')], subtotal: 20 }),
		updateQty: vi.fn().mockResolvedValue({ items: [item('a')], subtotal: 10 }),
		removeItem: vi.fn().mockResolvedValue({ items: [], subtotal: 0 }),
		clear: vi.fn().mockResolvedValue(undefined),
		...overrides,
	};
}

describe('cart store', () => {
	beforeEach(() => {
		useCartStore.setState({ adapter: null, cart: null, promoCode: '', itemLoading: null });
	});

	it('adds an item through the adapter and resets the loading flag', async () => {
		useCartStore.setState({ adapter: adapter() });
		await useCartStore.getState().addItem({ productId: 'b', quantity: 1 });
		expect(useCartStore.getState().cart?.items).toHaveLength(2);
		expect(useCartStore.getState().itemLoading).toBeNull();
	});

	it('rolls back an optimistic removal when the request fails', async () => {
		const prev = { items: [item('a'), item('b')], subtotal: 20 };
		useCartStore.setState({
			adapter: adapter({ removeItem: vi.fn().mockRejectedValue(new Error('network')) }),
			cart: prev,
		});
		vi.spyOn(console, 'log').mockImplementation(() => {});
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
});
