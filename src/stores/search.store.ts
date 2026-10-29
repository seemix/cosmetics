import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

import type { IProduct } from '@/types/product';

interface SearchStore {
	loading: boolean;
	error: string | null;
	items: {
		products: IProduct[] | null;
	};

	fastSearch: (query: string, locale: string) => Promise<void>;
}

export const useSearchStore = create<SearchStore>((set) => ({
	error: null,
	loading: false,
	items: {
		products: null,
	},

	fastSearch: async (q: string, locale: string = 'ru') => {
		set({ loading: true, error: null });
		const { data } = await apiClient.get('products/products-search', {
			params: { q, locale },
		});
		set({ items: data, loading: false });
	},
}));
