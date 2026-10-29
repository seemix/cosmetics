import type { MetadataRoute } from 'next';
import { env } from '@/config/env';
import { routing } from '@/i18n/routing';

// Every page lives under a locale prefix, so private paths are listed per locale.
// Search results are kept out of the index with a noindex tag instead, which crawlers must be able to read.
const privatePaths = ['/checkout', '/orders', '/profile', '/favorites'];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/admin',
				...routing.locales.flatMap((locale) =>
					privatePaths.map((path) => `/${locale}${path}`),
				),
			],
		},
		sitemap: `${env.siteUrl}/sitemap.xml`,
	};
}
