import type { IBreadcrumb } from '@/types/breadcrumb';
import type { IMenuItem } from '@/types/catalog-menu';
import type { IOrder } from '@/types/order';
import type { PaginationProps } from '@/types/pagination';
import type { IProduct } from '@/types/product';
import type { UserState } from '@/types/user-state';

/** Payload's standard paginated collection response. */
export type Paginated<T> = PaginationProps & { docs: T[] };

/** Custom product list endpoints (category, brand, search, bestsellers). */
export type ProductListResponse = {
	products: IProduct[];
	pagination: PaginationProps;
	/** Category chain, only returned by the category endpoint. */
	categories?: IBreadcrumb[];
};

export type MenuData = {
	categories: IMenuItem[];
	brands: IMenuItem[];
};

export type UserResponse = { user: UserState | null };

export type OrdersResponse = Paginated<IOrder>;
