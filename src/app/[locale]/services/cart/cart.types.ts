export type CartItemId = {
    cartId?: string;
    productId: string
    quantity: number
}
export type CartItem = {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    price: number;
    regularPrice?: number;
    quantity: number;
    thumbnail: string;
}
export type Cart = {
    id?: string;
    items: CartItem[]
    subtotal: number,
    preSubtotal?: number,
    promoDiscount?: number,
}