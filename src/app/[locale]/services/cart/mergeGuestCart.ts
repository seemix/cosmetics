import { localStorageService } from '@/app/[locale]/services/cart/localStorage.service';
import { axiosService } from '@/app/[locale]/services/axios.service';

export const mergeGuestCart = async () => {
    const items = localStorageService.get();

    if (!items.length) return;
    const normalizedItems = items.map(item => ({ product: { id: item.productId }, quantity: item.quantity }));
    const mergedCart = await axiosService.post('carts/merge', { items: normalizedItems });
    localStorageService.clear();
    return mergedCart.data;
};