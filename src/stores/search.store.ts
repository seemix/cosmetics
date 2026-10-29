import axios from 'axios';
import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import type { ProductListResponse } from '@/types/api';
import type { IProduct } from '@/types/product';

interface SearchStore {
	loading: boolean;
	error: string | null;
	items: {
		products: IProduct[] | null;
	};

	fastSearch: (query: string, locale: string) => Promise<void>;
}

// A newer query cancels the previous request, so a slow response can't overwrite fresher results.
let controller: AbortController | null = null;

export const useSearchStore = create<SearchStore>((set) => ({
	error: null,
	loading: false,
	items: {
		products: null,
	},

	fastSearch: async (q, locale) => {
		controller?.abort();
		controller = new AbortController();
		const { signal } = controller;

		set({ loading: true, error: null });
		try {
			const { data } = await apiClient.get<ProductListResponse>(
				'products/products-search',
				{ params: { q, locale }, signal },
			);
			set({ items: data, loading: false });
		} catch (error) {
			if (axios.isCancel(error)) return;
			set({ error: getErrorMessage(error), loading: false });
		}
	},
}));
