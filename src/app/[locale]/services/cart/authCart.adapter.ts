// import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
//
// export const authCartAdapter = (token: string): CartAdapter => ({
//     async load() {
//         return api.get('/cart', token)
//     },
//
//     async addItem(item) {
//         return api.post('/cart/items', item, token)
//     },
//
//     async updateQty(id, qty) {
//         return api.patch(`/cart/items/${id}`, { qty }, token)
//     },
//
//     async removeItem(id) {
//         return api.delete(`/cart/items/${id}`, token)
//     },
//
//     async clear() {
//         return api.post('/cart/clear', {}, token)
//     },
// })