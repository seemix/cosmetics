import { apiClient } from '@/lib/api/client';
import { guestFavoritesStorage } from '@/lib/favorites/guestFavorites.storage';
import type { Paginated } from '@/types/api';
import type { IProduct } from '@/types/product';

// Only what a product card needs; the full product carries descriptions and variants.
const CARD_FIELDS = [
	'title',
	'subtitle',
	'slug',
	'article',
	'gallery',
	'retailPrice',
	'discountPrice',
	'action',
	'bestSeller',
	'unavailable',
];

/**
 * Loads a guest's favourite products through the plain Payload REST API:
 * read access already limits guests to published products. Unknown or
 * unpublished ids are simply missing from the result.
 */
export async function fetchProductsByIds(
	ids: string[],
	locale: string,
): Promise<IProduct[]> {
	if (!ids.length) return [];

	const params: Record<string, string | number> = {
		'where[id][in]': ids.join(','),
		locale,
		depth: 1,
		limit: ids.length,
	};
	for (const field of CARD_FIELDS) params[`select[${field}]`] = 'true';

	const { data } = await apiClient.get<Paginated<IProduct>>('products', {
		params,
	});
	// Keep the order in which the guest added them.
	const position = new Map(ids.map((id, index) => [id, index]));
	return [...data.docs].sort(
		(a, b) => (position.get(a.id) ?? 0) - (position.get(b.id) ?? 0),
	);
}

/**
 * Moves the guest's favourites into the account after login and returns the
 * account's resulting list. Requests go one by one: the backend rewrites the
 * whole list on every add, so parallel adds would overwrite each other.
 */
export async function mergeGuestFavorites(): Promise<string[]> {
	const { data: accountIds } =
		await apiClient.get<string[]>('users/favorites/my');
	const merged = [...accountIds];

	for (const id of guestFavoritesStorage.get()) {
		if (merged.includes(id)) continue;
		try {
			await apiClient.post('users/favorites', { id });
			merged.push(id);
		} catch (error) {
			// A product deleted since it was saved; the rest still gets merged.
			console.error(error);
		}
	}

	guestFavoritesStorage.clear();
	return merged;
}
