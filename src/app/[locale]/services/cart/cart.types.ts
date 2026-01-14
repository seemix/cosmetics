export type CartItem = {
    productId: string
    quantity: number
    priceSnapshot: number
    subtotal: number
}

export type Cart = {
    items: CartItem[]
    subtotal: number
}