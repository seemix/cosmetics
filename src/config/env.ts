import { z } from 'zod';

const url = z
	.url()
	.transform((value) => value.replace(/\/+$/, ''))
	.optional();

const schema = z.object({
	NEXT_PUBLIC_SERVER_URL: url,
	NEXT_PUBLIC_SITE_URL: url,
	API_URL: url,
});

// `NEXT_PUBLIC_*` must be referenced literally so Next.js can inline them into client bundles.
// Empty strings are treated as "not set" so the production defaults apply.
const parsed = schema.parse({
	NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,
	NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
	API_URL: process.env.API_URL || undefined,
});

const backendUrl =
	parsed.NEXT_PUBLIC_SERVER_URL ?? 'https://admin.nextlevelshop.md';

export const env = {
	/** Payload backend origin, also used for media URLs. */
	backendUrl,
	/** Public origin of this site, used for canonical URLs and the sitemap. */
	siteUrl: parsed.NEXT_PUBLIC_SITE_URL ?? 'https://nextlevelshop.md',
	/** REST API root. */
	apiUrl: `${backendUrl}/api`,
	/**
	 * Server-only override of the API root for the menu request (e.g. an internal address).
	 * Undefined in the browser, where the public `apiUrl` is used anyway.
	 */
	serverApiUrl: parsed.API_URL ?? `${backendUrl}/api`,
};
