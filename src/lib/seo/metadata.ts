import type { Metadata } from 'next';
import { env } from '@/config/env';
import { routing } from '@/i18n/routing';

export const SITE_NAME = 'Next Level Shop';

/** Absolute URL of a locale-less path in the given locale. */
export function localizedUrl(locale: string, path = '') {
	return `${env.siteUrl}/${locale}${path}`;
}

/** Canonical URL plus hreflang alternates for every site locale. */
export function localizedAlternates(
	locale: string,
	path = '',
): NonNullable<Metadata['alternates']> {
	return {
		canonical: localizedUrl(locale, path),
		languages: {
			...Object.fromEntries(
				routing.locales.map((l) => [l, localizedUrl(l, path)]),
			),
			'x-default': localizedUrl(routing.defaultLocale, path),
		},
	};
}

export function ogLocale(locale: string) {
	return locale === 'ru' ? 'ru_RU' : 'ro_MD';
}

type PageMetadataInput = {
	locale: string;
	/** Locale-less path of the page, e.g. `/news`. */
	path: string;
	title: string;
	description?: string;
	/** Keeps the page out of search results (search, account, checkout). */
	noindex?: boolean;
};

/** Metadata of an ordinary page: own title, canonical and hreflang. */
export function pageMetadata({
	locale,
	path,
	title,
	description,
	noindex,
}: PageMetadataInput): Metadata {
	const fullTitle = `${title} | ${SITE_NAME}`;
	return {
		title: fullTitle,
		...(description && { description }),
		alternates: localizedAlternates(locale, path),
		openGraph: {
			title: fullTitle,
			...(description && { description }),
			url: localizedUrl(locale, path),
			locale: ogLocale(locale),
		},
		...(noindex && { robots: { index: false, follow: true } }),
	};
}
