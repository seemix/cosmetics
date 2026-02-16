type itemsType = {
    id: string;
    quantity: number;
}

export interface IShippingAddress {
    address: string;
    email: string;
    name: string,
    phone: string,
    city: string,
}

export interface IOrder {
    items: itemsType[];
    shippingAddress: IShippingAddress
}