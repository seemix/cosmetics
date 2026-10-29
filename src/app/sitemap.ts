import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { listSlugs } from '@/lib/api/queries';
import { localizedUrl } from '@/lib/seo/metadata';

// Rebuilt at most once an hour.
export const revalidate = 3600;

type Entry = { path: string; lastModified?: string; priority: number };

/** One sitemap entry per locale, each listing its translations. */
function localized({ path, lastModified, priority }: Entry) {
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, localizedUrl(l, path)]),
	);
	return routing.locales.map((locale) => ({
		url: localizedUrl(locale, path),
		lastModified: lastModified ? new Date(lastModified) : new Date(),
		priority,
		alternates: { languages },
	}));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [pages, posts, brands, categories, products] = await Promise.all([
		listSlugs('pages'),
		listSlugs('posts'),
		listSlugs('brands'),
		listSlugs('categories'),
		listSlugs('products', { 'where[_status][equals]': 'published' }),
	]);

	const entries: Entry[] = [
		{ path: '', priority: 1 },
		{ path: '/catalog', priority: 0.9 },
		{ path: '/news', priority: 0.6 },
		...pages.map((p) => ({
			path: `/pages/${p.slug}`,
			lastModified: p.updatedAt,
			priority: 0.8,
		})),
		...categories.map((c) => ({
			path: `/category/${c.slug}`,
			lastModified: c.updatedAt,
			priority: 0.8,
		})),
		...brands.map((b) => ({
			path: `/brand/${b.slug}`,
			lastModified: b.updatedAt,
			priority: 0.8,
		})),
		...products.map((p) => ({
			path: `/product/${p.slug}`,
			lastModified: p.updatedAt,
			priority: 0.7,
		})),
		...posts.map((p) => ({
			path: `/news/${p.slug}`,
			lastModified: p.updatedAt,
			priority: 0.5,
		})),
	];

	return entries.flatMap(localized);
}
