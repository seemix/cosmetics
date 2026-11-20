import { beforeEach, describe, expect, it, vi } from 'vitest';

const get = vi.fn();
const post = vi.fn();
const del = vi.fn();
vi.mock('@/lib/api/client', () => ({
	apiClient: {
		get: (...args: unknown[]) => get(...args),
		post: (...args: unknown[]) => post(...args),
		delete: (...args: unknown[]) => del(...args),
	},
}));

import {
	fetchProductsByIds,
	mergeGuestFavorites,
} from '@/lib/favorites/guestFavorites.api';
import { guestFavoritesStorage } from '@/lib/favorites/guestFavorites.storage';
import { useFavoritesStore } from '@/stores/favorites.store';

const KEY = 'nextLevelFavorites';

beforeEach(() => {
	localStorage.clear();
	get.mockReset();
	post.mockReset();
	del.mockReset();
	useFavoritesStore.setState({ favorites: [], favoriteProducts: [] });
});

describe('guestFavoritesStorage', () => {
	it('returns an empty list for missing or broken data', () => {
		expect(guestFavoritesStorage.get()).toEqual([]);
		localStorage.setItem(KEY, '{not json');
		expect(guestFavoritesStorage.get()).toEqual([]);
		localStorage.setItem(KEY, '{"a":1}');
		expect(guestFavoritesStorage.get()).toEqual([]);
		localStorage.setItem(KEY, '["p1",2,null]');
		expect(guestFavoritesStorage.get()).toEqual(['p1']);
	});

	it('saves and clears ids', () => {
		guestFavoritesStorage.save(['p1', 'p2']);
		expect(guestFavoritesStorage.get()).toEqual(['p1', 'p2']);
		guestFavoritesStorage.clear();
		expect(guestFavoritesStorage.get()).toEqual([]);
	});
});

describe('favorites store for a guest', () => {
	it('keeps added and removed ids in localStorage without calling the API', async () => {
		const { addFavorite, removeFavorite } = useFavoritesStore.getState();
		await addFavorite('p1');
		await addFavorite('p2');
		await addFavorite('p1');
		expect(useFavoritesStore.getState().favorites).toEqual(['p1', 'p2']);
		expect(guestFavoritesStorage.get()).toEqual(['p1', 'p2']);

		await removeFavorite('p1');
		expect(useFavoritesStore.getState().favorites).toEqual(['p2']);
		expect(guestFavoritesStorage.get()).toEqual(['p2']);
		expect(post).not.toHaveBeenCalled();
		expect(del).not.toHaveBeenCalled();
	});

	it('uses the API for a user and leaves localStorage alone', async () => {
		post.mockResolvedValue({ data: 'p1' });
		await useFavoritesStore.getState().addFavorite('p1', 'u1');
		expect(post).toHaveBeenCalledWith('users/favorites', { id: 'p1' });
		expect(guestFavoritesStorage.get()).toEqual([]);
	});
});

describe('fetchProductsByIds', () => {
	it('does not call the API for an empty list', async () => {
		expect(await fetchProductsByIds([], 'ru')).toEqual([]);
		expect(get).not.toHaveBeenCalled();
	});

	it('queries products by id and keeps the saved order', async () => {
		get.mockResolvedValue({ data: { docs: [{ id: 'p2' }, { id: 'p1' }] } });
		const products = await fetchProductsByIds(['p1', 'p2'], 'ro');
		expect(products.map((p) => p.id)).toEqual(['p1', 'p2']);
		expect(get).toHaveBeenCalledWith(
			'products',
			expect.objectContaining({
				params: expect.objectContaining({
					'where[id][in]': 'p1,p2',
					locale: 'ro',
				}),
			}),
		);
	});
});

describe('mergeGuestFavorites', () => {
	it('adds only the missing ids, one by one, and clears the guest list', async () => {
		guestFavoritesStorage.save(['p1', 'p2', 'p3']);
		get.mockResolvedValue({ data: ['p2'] });
		post.mockImplementation((_url, { id }) =>
			id === 'p3' ? Promise.reject(new Error('deleted')) : Promise.resolve({}),
		);
		vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(await mergeGuestFavorites()).toEqual(['p2', 'p1']);
		expect(post.mock.calls.map(([, body]) => body.id)).toEqual(['p1', 'p3']);
		expect(guestFavoritesStorage.get()).toEqual([]);
	});
});
