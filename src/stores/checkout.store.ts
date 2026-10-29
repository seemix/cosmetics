import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/api/errors';
import { useCartStore } from '@/stores/cart.store';
import type { IShippingAddress } from '@/types/order';

export type PaymentType = 'cash' | 'transfer';

export type NewOrder = {
	shippingAddress: IShippingAddress;
	paymentType: PaymentType;
	/** Company name, required for bank transfer. */
	SRL?: string;
	comment?: string;
};

interface ICheckoutStore {
	error: string | null;
	orderNumber: string;
	loading: boolean;
	success: boolean;

	createNewOrder: (order: NewOrder, locale: string) => Promise<void>;
	clearOrder: () => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
	error: null,
	loading: false,
	success: false,
	orderNumber: '',

	createNewOrder: async (order, locale) => {
		set({ loading: true, error: null });
		try {
			const { cart, promoCode } = useCartStore.getState();
			const { data } = await apiClient.post<{
				success: boolean;
				order: { orderNumber: string };
			}>(
				'orders/create',
				{
					...order,
					items: cart?.items.map((item) => ({
						product: item.id,
						quantity: item.quantity,
					})),
					promoCode,
				},
				{ params: { locale } },
			);
			set({ success: data.success, orderNumber: data.order.orderNumber });
		} catch (error) {
			set({ error: getErrorMessage(error) });
		} finally {
			set({ loading: false });
		}
	},

	clearOrder: () => set({ success: false }),
}));
