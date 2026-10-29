import { beforeEach, describe, expect, it, vi } from 'vitest';

const post = vi.fn();
vi.mock('@/lib/api/client', () => ({
	apiClient: { post: (...args: unknown[]) => post(...args) },
}));

import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { localStorageService } from '@/lib/cart/localStorage.service';

const cart = { items: [], subtotal: 0 };

describe('guestCartAdapter', () => {
	beforeEach(() => {
		localStorage.clear();
		post.mockReset();
		post.mockResolvedValue({ data: { cart } });
	});

	it('does not call the API for an empty cart', async () => {
		expect(await guestCartAdapter().load('ru')).toBeNull();
		expect(post).not.toHaveBeenCalled();
	});

	it('adds a new item and increases quantity of an existing one', async () => {
		const adapter = guestCartAdapter();
		await adapter.addItem({ productId: 'p1', quantity: 1 });
		await adapter.addItem({ productId: 'p1', quantity: 2 });
		expect(localStorageService.get()).toEqual([
			{ productId: 'p1', quantity: 3 },
		]);
		expect(post).toHaveBeenLastCalledWith(
			expect.stringContaining('carts/guest'),
			expect.objectContaining({ items: [{ productId: 'p1', quantity: 3 }] }),
		);
	});

	it('updates quantity and removes items', async () => {
		localStorageService.save([
			{ productId: 'p1', quantity: 1 },
			{ productId: 'p2', quantity: 1 },
		]);
		const adapter = guestCartAdapter();
		await adapter.updateQty({ productId: 'p2', quantity: 5 });
		expect(localStorageService.get()[1].quantity).toBe(5);
		await adapter.removeItem('', 'p1');
		expect(localStorageService.get()).toEqual([
			{ productId: 'p2', quantity: 5 },
		]);
		expect(await adapter.removeItem('', 'p2')).toBeNull();
	});

	it('passes the promo code to the API', async () => {
		await guestCartAdapter().addItem({ productId: 'p1', quantity: 1 }, 'PROMO');
		expect(post).toHaveBeenLastCalledWith(
			expect.any(String),
			expect.objectContaining({ promoCode: 'PROMO' }),
		);
	});
});
