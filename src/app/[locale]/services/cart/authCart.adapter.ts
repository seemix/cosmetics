import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import { axiosService } from '@/app/[locale]/services/cart/axios.service';
import type { CartItemId } from '@/app/[locale]/services/cart/cart.types';

export const authCartAdapter = (): CartAdapter => ({
    async load() {
        return await axiosService.get('me').then(value => value.data);
    },

    async addItem(item: CartItemId) {
        return axiosService.post('add-item', item).then(value => value.data.cart);
    },

    async updateQty(item: CartItemId) {
        return axiosService.patch(`update-item`, item).then(value => value.data.cart);
    },

    async removeItem(cartId: string, productId: string) {
        return axiosService.post(`remove-item`, {
            cartId, productId
        }).then(value => value.data.cart);
    },

    async clear() {
        return axiosService.post('clear').then(value => value.data.cart);
    },
});