export type OrderItemType = {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

export interface IShippingAddress {
    address: string;
    email: string;
    name: string,
    phone: string,
    city: string,
}

export interface IOrder {
    id: string;
    createdAt: string;
    orderNumber: string;
    total: number;
    items: OrderItemType[];
    shippingAddress: IShippingAddress
}