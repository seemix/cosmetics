export type OrderItemType = {
	id: string;
	title: string;
	subtitle: string;
	slug: string;
	price: number;
	quantity: number;
	thumbnail: string;
};

export interface IShippingAddress {
	address: string;
	email: string;
	name: string;
	phone: string;
	city: string;
}

/** Statuses the site knows; `GET /orders/my` may return others in the future. */
export type OrderStatus =
	| 'pending'
	| 'paid'
	| 'backorder'
	| 'shipped'
	| 'cancelled';

export interface IOrder {
	id: string;
	createdAt: string;
	orderNumber: string;
	total: number;
	status?: OrderStatus | (string & {});
	items: OrderItemType[];
	shippingAddress: IShippingAddress;
}
