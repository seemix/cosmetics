const STORAGE_KEY = 'nextLevelFavorites';

/** Favourite product ids of a guest; moved to the account on login (see mergeGuestFavorites). */
export const guestFavoritesStorage = {
	get(): string[] {
		if (typeof window === 'undefined') return [];

		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return [];

			const parsed = JSON.parse(raw);
			return Array.isArray(parsed)
				? parsed.filter((id): id is string => typeof id === 'string')
				: [];
		} catch {
			return [];
		}
	},

	save(ids: string[]): void {
		if (typeof window === 'undefined') return;

		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
		} catch {
			// Storage is full or blocked (private mode): favourites live for this session only.
		}
	},

	clear(): void {
		if (typeof window === 'undefined') return;

		try {
			localStorage.removeItem(STORAGE_KEY);
		} catch {
			// Nothing to clean up if storage is unavailable.
		}
	},
};
