import { describe, expect, it } from 'vitest';
import { getOrderStatusView } from '@/lib/orderStatus';

describe('getOrderStatusView', () => {
	it('maps every known status to its own label', () => {
		for (const status of [
			'pending',
			'paid',
			'backorder',
			'shipped',
			'cancelled',
		])
			expect(getOrderStatusView(status).labelKey).toBe(status);
	});

	it('adds a hint only to backorder', () => {
		expect(getOrderStatusView('backorder').hintKey).toBe('backorderHint');
		expect(getOrderStatusView('pending').hintKey).toBeUndefined();
	});

	it('shows an unknown or missing status as a neutral badge', () => {
		expect(getOrderStatusView('refunded').labelKey).toBe('unknown');
		expect(getOrderStatusView(undefined).labelKey).toBe('unknown');
		expect(getOrderStatusView('toString').labelKey).toBe('unknown');
	});
});
