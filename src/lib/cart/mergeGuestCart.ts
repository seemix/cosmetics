import { apiClient } from '@/lib/api/client';
import { localStorageService } from '@/lib/cart/localStorage.service';

export const mergeGuestCart = async () => {
	const items = localStorageService.get();

	if (!items.length) return;
	const normalizedItems = items.map((item) => ({
		product: { id: item.productId },
		quantity: item.quantity,
	}));
	const mergedCart = await apiClient.post('carts/merge', {
		items: normalizedItems,
	});
	localStorageService.clear();
	return mergedCart.data;
};
