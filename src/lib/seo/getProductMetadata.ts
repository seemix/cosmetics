import type { Metadata } from 'next';
import { assets } from '@/config/assets';
import { pageMetadata } from '@/lib/seo/metadata';
import type { IProduct } from '@/types/product';

const notFoundTitle = {
	ru: 'Товар не найден',
	ro: 'Produsul nu a fost găsit',
};

function productDescription(product: IProduct, locale: string) {
	const plain = product.shortDescription
		?.replace(/<[^>]*>/g, '')
		.trim()
		.slice(0, 160);
	if (plain) return `${plain}...`;
	return locale === 'ru'
		? `Купить ${product.title} в Молдове — профессиональная косметика.`
		: `Cumpără ${product.title} în Moldova — cosmetică profesională.`;
}

export function getProductMetadata(
	product: IProduct | null,
	locale: string,
): Metadata {
	if (!product) {
		return {
			title: notFoundTitle[locale as keyof typeof notFoundTitle],
			robots: { index: false },
		};
	}

	const base = pageMetadata({
		locale,
		path: `/product/${product.slug}`,
		title: product.title,
		description: productDescription(product, locale),
	});
	const image = product.gallery[0]?.image.url;

	return {
		...base,
		openGraph: {
			...base.openGraph,
			type: 'website',
			images: image
				? [
						{
							url: `${assets.backendUrl}${image}`,
							width: 1000,
							height: 1000,
							alt: product.title,
						},
					]
				: [{ url: '/logo1.webp', alt: product.title }],
		},
	};
}
