import { beforeEach, describe, expect, it, vi } from 'vitest';

const post = vi.fn();
vi.mock('@/lib/api/client', () => ({
	apiClient: { post: (...args: unknown[]) => post(...args) },
}));

import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { localStorageService } from '@/lib/cart/localStorage.service';

const cart = { items: [], subtotal: 0 };
const ro = { locale: 'ro' };

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
		await adapter.addItem({ productId: 'p1', quantity: 1 }, ro);
		await adapter.addItem({ productId: 'p1', quantity: 2 }, ro);
		expect(localStorageService.get()).toEqual([
			{ productId: 'p1', quantity: 3 },
		]);
		expect(post).toHaveBeenLastCalledWith(
			'carts/guest',
			expect.objectContaining({ items: [{ productId: 'p1', quantity: 3 }] }),
			expect.anything(),
		);
	});

	it('sends the locale with every request, not only on load', async () => {
		const adapter = guestCartAdapter();
		await adapter.addItem({ productId: 'p1', quantity: 1 }, ro);
		await adapter.updateQty({ productId: 'p1', quantity: 4 }, ro);
		for (const call of post.mock.calls) {
			expect(call[2]).toEqual({ params: { locale: 'ro' } });
		}
	});

	it('updates quantity and removes items', async () => {
		localStorageService.save([
			{ productId: 'p1', quantity: 1 },
			{ productId: 'p2', quantity: 1 },
		]);
		const adapter = guestCartAdapter();
		await adapter.updateQty({ productId: 'p2', quantity: 5 }, ro);
		expect(localStorageService.get()[1].quantity).toBe(5);
		await adapter.removeItem(undefined, 'p1', ro);
		expect(localStorageService.get()).toEqual([
			{ productId: 'p2', quantity: 5 },
		]);
		expect(await adapter.removeItem(undefined, 'p2', ro)).toBeNull();
	});

	it('does not crash when updating an item missing from storage', async () => {
		await guestCartAdapter().updateQty({ productId: 'p9', quantity: 2 }, ro);
		expect(localStorageService.get()).toEqual([
			{ productId: 'p9', quantity: 2 },
		]);
	});

	it('passes the promo code to the API', async () => {
		await guestCartAdapter().addItem(
			{ productId: 'p1', quantity: 1 },
			{ locale: 'ru', promoCode: 'PROMO' },
		);
		expect(post).toHaveBeenLastCalledWith(
			expect.any(String),
			expect.objectContaining({ promoCode: 'PROMO' }),
			expect.anything(),
		);
	});
});
