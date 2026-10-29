import type { SerializedEditorState } from 'lexical';
import { cache } from 'react';
import { env } from '@/config/env';
import { ApiError, serverFetch } from '@/lib/api/server';
import type {
	MenuData,
	OrdersResponse,
	Paginated,
	ProductListResponse,
	UserResponse,
} from '@/types/api';
import type { IBrand } from '@/types/brand';
import type { PostCard } from '@/types/post-card';
import type { IProduct } from '@/types/product';

/** Editorial content (menu, posts, pages, brands) may lag behind the admin panel by this many seconds. */
export const CONTENT_REVALIDATE = 300;

const EMPTY_MENU: MenuData = { categories: [], brands: [] };

const EMPTY_PRODUCT_LIST: ProductListResponse = {
	products: [],
	pagination: {
		page: 1,
		limit: 12,
		totalPages: 0,
		totalDocs: 0,
		hasPrevPage: false,
		hasNextPage: false,
	},
};

export type ContentPage = {
	id: string;
	title: string;
	slug: string;
	content: SerializedEditorState;
};

/**
 * Payload answers a missing document looked up by slug with 500 instead of 404,
 * so for those endpoints any API error means "not found".
 */
async function orNull<T>(request: Promise<T | null>): Promise<T | null> {
	try {
		return await request;
	} catch (error) {
		if (error instanceof ApiError) return null;
		throw error;
	}
}

// The menu is rendered by the root layout of every page, so a failing menu request
// must not take the whole site down: it falls back to an empty menu.
export const getMenu = cache(async (locale: string): Promise<MenuData> => {
	try {
		const menu = await serverFetch<MenuData>('menu', {
			params: { locale },
			revalidate: CONTENT_REVALIDATE,
			baseUrl: env.serverApiUrl,
		});
		return menu ?? EMPTY_MENU;
	} catch (error) {
		console.error('Failed to load the menu', error);
		return EMPTY_MENU;
	}
});

export const getPosts = cache(async (locale: string, page?: string) => {
	return serverFetch<Paginated<PostCard>>('posts', {
		params: { locale, page },
		revalidate: CONTENT_REVALIDATE,
	});
});

export const getPost = cache(async (slug: string, locale: string) =>
	orNull(
		serverFetch<ContentPage>(`posts/${slug}`, {
			params: { locale },
			revalidate: CONTENT_REVALIDATE,
		}),
	),
);

export const getPage = cache(async (slug: string, locale: string) =>
	orNull(
		serverFetch<ContentPage>(`pages/${slug}`, {
			params: { locale },
			revalidate: CONTENT_REVALIDATE,
		}),
	),
);

export const getBrands = cache(async () =>
	serverFetch<Paginated<IBrand>>('brands', { revalidate: CONTENT_REVALIDATE }),
);

export const getBrand = cache(async (slug: string, locale: string) =>
	orNull(
		serverFetch<IBrand>(`brands/${slug}`, {
			params: { locale },
			revalidate: CONTENT_REVALIDATE,
		}),
	),
);

// Product data carries per-customer prices, so it is fetched with the visitor's cookies and never cached.

export const getBestsellers = cache(async (locale: string) => {
	const res = await serverFetch<ProductListResponse>('products/bestsellers', {
		params: { locale },
		withCookies: true,
	});
	return res ?? EMPTY_PRODUCT_LIST;
});

export const getProduct = cache(async (slug: string, locale: string) =>
	serverFetch<IProduct>(`products/${slug}`, {
		params: { locale },
		withCookies: true,
	}),
);

type ListQuery = { locale: string; sort?: string; page?: string };

export const getCategoryProducts = cache(
	async (slug: string, { locale, sort, page }: ListQuery) => {
		const res = await serverFetch<ProductListResponse>(
			`products/products-category/${slug}`,
			{
				params: { locale, sort: sort ?? '', page: page ?? '1' },
				withCookies: true,
			},
		);
		return res ?? EMPTY_PRODUCT_LIST;
	},
);

export const getBrandProducts = cache(
	async (slug: string, { locale, sort, page }: ListQuery) => {
		const res = await serverFetch<ProductListResponse>(
			`products/products-brand/${slug}`,
			{
				params: { locale, sort: sort ?? '', page: page ?? '1' },
				withCookies: true,
			},
		);
		return res ?? EMPTY_PRODUCT_LIST;
	},
);

export const searchProducts = cache(
	async (query: string, { locale, page }: Omit<ListQuery, 'sort'>) => {
		const res = await serverFetch<ProductListResponse>(
			'products/products-search',
			{ params: { locale, q: query, page }, withCookies: true },
		);
		return res ?? EMPTY_PRODUCT_LIST;
	},
);

export const getMyOrders = cache(async (locale: string) => {
	const res = await serverFetch<OrdersResponse>('orders/my', {
		params: { locale },
		withCookies: true,
	});
	return res?.docs ?? [];
});

export const getCurrentUser = cache(async () => {
	try {
		const res = await serverFetch<UserResponse>('users/me', {
			withCookies: true,
		});
		return res?.user ?? null;
	} catch {
		return null;
	}
});

/** Activates an account from the e-mail link. */
export async function verifyEmail(
	token: string,
): Promise<{ ok: true } | { ok: false; message?: string }> {
	const res = await fetch(`${env.apiUrl}/users/verify/${token}`, {
		method: 'POST',
		cache: 'no-store',
	});
	if (res.ok) return { ok: true };
	const data = await res.json().catch(() => null);
	return { ok: false, message: data?.errors?.[0]?.message };
}
