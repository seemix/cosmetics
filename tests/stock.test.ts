import { AxiosError, type AxiosResponse } from 'axios';
import { describe, expect, it } from 'vitest';
import { getStockIssues } from '@/lib/api/errors';
import { isPurchasable } from '@/lib/productAvailability';

const axiosError = (status: number, data: unknown) =>
	new AxiosError('Request failed', undefined, undefined, undefined, {
		status,
		data,
	} as AxiosResponse);

describe('isPurchasable', () => {
	it('is true for an in-stock product', () => {
		expect(isPurchasable({ inStock: true })).toBe(true);
	});

	it('treats a missing inStock as in stock', () => {
		expect(isPurchasable({})).toBe(true);
	});

	it('is false when out of stock', () => {
		expect(isPurchasable({ inStock: false })).toBe(false);
	});

	it('is false when switched off in the admin panel', () => {
		expect(isPurchasable({ unavailable: true, inStock: true })).toBe(false);
	});
});

describe('getStockIssues', () => {
	it('returns the items of an INSUFFICIENT_STOCK conflict', () => {
		const items = [{ product: 'p1', requested: 12, available: 10 }];
		expect(
			getStockIssues(
				axiosError(409, { success: false, code: 'INSUFFICIENT_STOCK', items }),
			),
		).toEqual(items);
	});

	it('ignores other errors', () => {
		expect(getStockIssues(axiosError(409, { code: 'OTHER' }))).toBeNull();
		expect(
			getStockIssues(axiosError(400, { code: 'INSUFFICIENT_STOCK' })),
		).toBeNull();
		expect(getStockIssues(new Error('boom'))).toBeNull();
	});
});
