import type { CartAdapter } from '@/app/[locale]/services/cart/cart.adapter';
import type { CartItemId, Cart } from '@/app/[locale]/services/cart/cart.types';
import { axiosService } from '@/app/[locale]/services/axios.service';

export const authCartAdapter = (): CartAdapter => ({
    async load(): Promise<Cart> {
        const { data } = await axiosService.get<Cart>('carts/me');
        return data;
    },

    async addItem(item: CartItemId): Promise<Cart> {
        const { data } = await axiosService.post<{ cart: Cart }>(
            'carts/add-item',
            item
        );
        return data.cart;
    },

    async updateQty(item: CartItemId): Promise<Cart> {
        const { data } = await axiosService.patch<{ cart: Cart }>(
            'carts/update-item',
            item
        );
        return data.cart;
    },

    async removeItem(cartId: string, productId: string): Promise<Cart> {
        const { data } = await axiosService.post<{ cart: Cart }>(
            'carts/remove-item',
            { cartId, productId }
        );
        return data.cart;
    },

    async clear(): Promise<void> {
        return await axiosService.post('carts/clear');
    }
});
