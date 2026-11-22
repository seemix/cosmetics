import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import {
	getErrorMessage,
	getStockIssues,
	type StockIssue,
} from '@/lib/api/errors';
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
	/** Set when the order was rejected because the web warehouse lacks stock. */
	stockIssues: StockIssue[] | null;
	orderNumber: string;
	loading: boolean;
	success: boolean;

	createNewOrder: (order: NewOrder, locale: string) => Promise<void>;
	/** Drops the stock issue of a product once the customer has fixed it in the cart. */
	resolveStockIssue: (productId: string) => void;
	clearOrder: () => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
	error: null,
	stockIssues: null,
	loading: false,
	success: false,
	orderNumber: '',

	createNewOrder: async (order, locale) => {
		set({ loading: true, error: null, stockIssues: null });
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
			// The server message is localized, but the UI renders its own text by code.
			const stockIssues = getStockIssues(error);
			if (stockIssues) {
				set({ stockIssues });
				// The cart stays as is; refresh it, stock may have changed since it was loaded.
				void useCartStore.getState().reload();
			} else set({ error: getErrorMessage(error) });
		} finally {
			set({ loading: false });
		}
	},

	resolveStockIssue: (productId) =>
		set(({ stockIssues }) => {
			const rest = stockIssues?.filter((issue) => issue.product !== productId);
			return { stockIssues: rest?.length ? rest : null };
		}),

	clearOrder: () => set({ success: false, stockIssues: null }),
}));
