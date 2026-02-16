import { create } from 'zustand';
import { axiosService } from '@/app/[locale]/services/axios.service';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import type { IShippingAddress } from '@/app/[locale]/types/order';

interface ICheckoutStore {
    error?: string | null;
    orderNumber?: string;
    loading: boolean;
    success: boolean;

    createNewOrder: (shippingAddress: IShippingAddress, comment?: string) => Promise<void>;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
        error: null,
        loading: false,
        success: false,
        orderNumber: '',

        createNewOrder: async (shippingAddress: IShippingAddress, comment?: string) => {
            const { cart } = useCartStore.getState();
            const items = cart?.items.map(item => {
                return { product: item.id, quantity: item.quantity };
            });
            const res = await axiosService.post('/orders/create', {
                items, shippingAddress, comment
            }).then(res => res.data);
            set({ success: res.success, orderNumber: res.order.orderNumber });
        }
    })
);