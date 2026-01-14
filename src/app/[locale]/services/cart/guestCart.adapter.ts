// import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
//
// export const guestCartAdapter = (): CartAdapter => ({
//     async load() {
//         return getFromLocalStorage()
//     },
//
//     async addItem(item) {
//         const cart = getFromLocalStorage()
//         const updated = add(cart, item)
//         save(updated)
//         return updated
//     },
//
//     async updateQty(id, qty) {
//         const cart = getFromLocalStorage()
//         const updated = update(cart, id, qty)
//         save(updated)
//         return updated
//     },
//
//     async removeItem(id) {
//         const cart = getFromLocalStorage()
//         const updated = remove(cart, id)
//         save(updated)
//         return updated
//     },
//
//     async clear() {
//         save(emptyCart)
//         return emptyCart
//     },
// })