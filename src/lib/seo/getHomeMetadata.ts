import type { Metadata } from 'next';
import { env } from '@/config/env';
import {
	localizedAlternates,
	localizedUrl,
	ogLocale,
} from '@/lib/seo/metadata';

const seoData = {
	ru: {
		title:
			'Next Level Barber Supply — Профессиональная мужская косметика в Молдове',
		description:
			'Эксклюзивный дистрибьютор Uppercut, Luxina и Xflex в Молдове. Оригинальная косметика для барбершопов: стайлинг, уход за бородой и волосами. Доставка по всей Молдове.',
		keywords:
			'мужская косметика, барбершоп молдова, стайлинг для волос, уход за бородой, Uppercut Deluxe Молдова, Luxina, Xflex, купить косметику для мужчин',
	},
	ro: {
		title:
			'Next Level Barber Supply — Cosmetică profesională pentru bărbați în Moldova',
		description:
			'Distribuitor exclusiv Uppercut, Luxina și Xflex în Moldova. Cosmetică originală pentru frizerii: styling, îngrijirea bărbii și a părului. Livrare în toată Moldova.',
		keywords:
			'cosmetică bărbați, barbershop moldova, styling păr, îngrijire barbă, Uppercut Deluxe Moldova, Luxina, Xflex, cumpără cosmetică pentru bărbați',
	},
};

const seoFor = (locale: string) =>
	seoData[locale as keyof typeof seoData] || seoData.ro;

/**
 * Site-wide defaults set by the locale layout. Deliberately without a canonical URL:
 * child pages inherit layout metadata, and a shared canonical would mark every page
 * as a duplicate of the home page.
 */
export function getSiteMetadata(locale: string): Metadata {
	const current = seoFor(locale);
	return {
		metadataBase: new URL(env.siteUrl),
		title: current.title,
		description: current.description,
		openGraph: {
			title: current.title,
			description: current.description,
			locale: ogLocale(locale),
			type: 'website',
			siteName: 'Next Level Barber Supply',
			images: [{ url: '/logo1.webp', alt: 'site_logo' }],
		},
		icons: {
			icon: '/favicon.png',
			shortcut: '/favicon.png',
			apple: '/favicon.png',
		},
	};
}

/** Home page: the defaults plus keywords, canonical and hreflang. */
export function getHomeMetadata(locale: string): Metadata {
	const current = seoFor(locale);
	const site = getSiteMetadata(locale);
	return {
		...site,
		keywords: current.keywords,
		alternates: {
			...localizedAlternates(locale),
			languages: {
				...localizedAlternates(locale).languages,
				'x-default': env.siteUrl,
			},
		},
		openGraph: { ...site.openGraph, url: localizedUrl(locale) },
	};
}
