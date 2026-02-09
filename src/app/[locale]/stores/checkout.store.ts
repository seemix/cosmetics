import { create } from 'zustand';

interface ICheckoutStore {
    error?: string | null;
    loading: boolean;
    success: boolean;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
        error: null,
        loading: false,
        success: false,

        createNewOrder: () => {

        }
    })
);