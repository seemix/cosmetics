import type { OrderStatus } from '@/types/order';

export type OrderStatusView = {
	/** Key in the `OrderStatus` messages namespace. */
	labelKey: OrderStatus | 'unknown';
	/** Tailwind classes of the badge. */
	className: string;
	/** Key of an explanation shown under the order header, if any. */
	hintKey?: 'backorderHint';
};

const NEUTRAL = 'bg-gray-100 text-gray-600';

const VIEWS: Record<OrderStatus, OrderStatusView> = {
	pending: { labelKey: 'pending', className: 'bg-blue-50 text-blue-700' },
	paid: { labelKey: 'paid', className: 'bg-green-50 text-green-700' },
	backorder: {
		labelKey: 'backorder',
		className: 'bg-amber-50 text-amber-700',
		hintKey: 'backorderHint',
	},
	shipped: {
		labelKey: 'shipped',
		className: 'bg-emerald-100 text-emerald-800',
	},
	cancelled: { labelKey: 'cancelled', className: NEUTRAL },
};

/** Badge of an order status; an unknown or missing status gets a neutral badge. */
export function getOrderStatusView(
	status: string | undefined,
): OrderStatusView {
	return (
		(status && Object.hasOwn(VIEWS, status)
			? VIEWS[status as OrderStatus]
			: undefined) ?? { labelKey: 'unknown', className: NEUTRAL }
	);
}
