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

    createNewOrder: (shippingAddress: {
        name: `${string} ${string}`;
        email: string;
        phone: string;
        city: string;
        address: string
    }, locale: string, paymentType: 'cash' | 'transfer', comment?: string | undefined) => Promise<void>;
    clearOrder: () => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
        error: null,
        loading: false,
        success: false,
        orderNumber: '',

        createNewOrder: async (shippingAddress: IShippingAddress, locale: string, paymentType: 'cash' | 'transfer', comment?: string,) => {
            try {
                set({ loading: true });
                const { cart } = useCartStore.getState();
                const items = cart?.items.map(item => {
                    return { product: item.id, quantity: item.quantity };
                });
                const { data } = await axiosService.post(`/orders/create?locale=${locale}`, {
                    items, shippingAddress, comment, paymentType
                });
                set({ success: data.success, orderNumber: data.order.orderNumber });
            } catch (error) {
                set({ error: getErrorMessage(error) });
            } finally {
                set({ loading: false });
            }
        },
        clearOrder: () => {
            set({ success: false });
        }
    })
);