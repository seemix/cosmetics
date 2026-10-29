import { beforeEach, describe, expect, it } from 'vitest';
import { localStorageService } from '@/lib/cart/localStorage.service';

describe('localStorageService', () => {
	beforeEach(() => localStorage.clear());

	it('returns an empty list for missing or broken data', () => {
		expect(localStorageService.get()).toEqual([]);
		localStorage.setItem('nextLevelCart', '{not json');
		expect(localStorageService.get()).toEqual([]);
		localStorage.setItem('nextLevelCart', '{"a":1}');
		expect(localStorageService.get()).toEqual([]);
	});

	it('saves and clears items', () => {
		localStorageService.save([{ productId: 'p1', quantity: 2 }]);
		expect(localStorageService.get()).toEqual([
			{ productId: 'p1', quantity: 2 },
		]);
		localStorageService.clear();
		expect(localStorageService.get()).toEqual([]);
	});
});
