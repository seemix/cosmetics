import { create } from 'zustand';
import { axiosService } from '@/app/[locale]/services/axios.service';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import type { IShippingAddress } from '@/app/[locale]/types/order';
import { getErrorMessage } from '@/app/[locale]/services/getErrorMessage';

interface ICheckoutStore {
    error?: string | null;
    orderNumber?: string;
    loading: boolean;
    success: boolean;
    created: boolean;

    createNewOrder: (shippingAddress: IShippingAddress, locale: string, comment?: string) => Promise<void>;
    clearOrder: () => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
        error: null,
        loading: false,
        success: false,
        orderNumber: '',
        created: false,

        createNewOrder: async (shippingAddress: IShippingAddress, locale: string, comment?: string,) => {
            try {
                set({ loading: true });
                const { cart } = useCartStore.getState();
                const items = cart?.items.map(item => {
                    return { product: item.id, quantity: item.quantity };
                });
                const res = await axiosService.post(`/orders/create?locale=${locale}`, {
                    items, shippingAddress, comment
                }).then(res => res.data);
                set({ success: res.success, orderNumber: res.order.orderNumber });
            } catch (error) {
                set({ error: getErrorMessage(error) });
            } finally {
                set({ loading: false, created: true });
            }
        },
        clearOrder: () => {
            set({ created: false });
        }
    })
);