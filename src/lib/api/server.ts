import { cookies } from 'next/headers';

import { env } from '@/config/env';

export class ApiError extends Error {
	constructor(
		readonly status: number,
		readonly url: string,
	) {
		super(`API ${status}: ${url}`);
	}
}

type Params = Record<string, string | number | undefined>;

export type ServerFetchOptions = {
	params?: Params;
	/** Forwards the visitor's session so the backend returns wholesale prices for wholesale accounts. */
	withCookies?: boolean;
	/** Seconds to keep the response in the Data Cache; without it the request is never cached. */
	revalidate?: number;
	method?: 'GET' | 'POST';
	/** API root, `env.apiUrl` by default. */
	baseUrl?: string;
};

/**
 * Server-side request to the Payload REST API.
 * Resolves to `null` for 404, throws `ApiError` for any other non-2xx status.
 */
export async function serverFetch<T>(
	path: string,
	{
		params,
		withCookies,
		revalidate,
		method = 'GET',
		baseUrl = env.apiUrl,
	}: ServerFetchOptions = {},
): Promise<T | null> {
	const url = new URL(`${baseUrl}/${path}`);
	for (const [key, value] of Object.entries(params ?? {})) {
		if (value !== undefined) url.searchParams.set(key, String(value));
	}

	const headers: HeadersInit = {};
	if (withCookies) headers.Cookie = (await cookies()).toString();

	const res = await fetch(url, {
		method,
		headers,
		...(revalidate === undefined
			? { cache: 'no-store' }
			: { next: { revalidate } }),
	});

	if (res.status === 404) return null;
	if (!res.ok) throw new ApiError(res.status, url.toString());
	return (await res.json()) as T;
}
