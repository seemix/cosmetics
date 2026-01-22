import { create } from 'zustand';
import { axiosService } from '@/app/[locale]/services/axios.service';

import type { IProduct } from '@/app/[locale]/types/product';

interface SearchStore {
    loading: boolean;
    error: string | null;
    items: {
        products: IProduct[] | null
    };

    fastSearch: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchStore>((set) => ({
    error: null,
    loading: false,
    items: {
        products: null
    },

    fastSearch: async (q: string) => {
        set({ loading: true, error: null });
        const { data } = await axiosService.get('products/products-search', {
            params: { q }
        });
        set({ items: data, loading: false });
    }
}));