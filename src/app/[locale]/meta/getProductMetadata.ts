import type { Metadata } from 'next';
import type { IProduct } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';

export function getProductMetadata(product: IProduct, locale: string): Metadata {
    if (!product) {
        return { title: 'Product Not Found' };
    }

    const { frontendUrl } = assets;
    const title = `${product.title} | Next Level Shop`;

    // Очищення опису від HTML тегів та обмеження довжини
    const plainDescription = product.description
        ? `${product?.shortDescription?.replace(/<[^>]*>/g, '').slice(0, 160).trim()}...`
        : locale === 'ru'
            ? `Купить ${product.title} в Молдове — профессиональная косметика.`
            : `Cumpără ${product.title} în Moldova — cosmetică profesională.`;

    const productUrl = `${frontendUrl}/${locale}/products/${product.slug}`;

    return {
        title: title,
        description: plainDescription,
        alternates: {
            canonical: productUrl,
            languages: {
                'ru-MD': `${frontendUrl}/ru/product/${product.slug}`,
                'ro-MD': `${frontendUrl}/ro/product/${product.slug}`,
            },
        },
        openGraph: {
            title: title,
            description: plainDescription,
            url: productUrl,
            type: 'website',
            images: [
                {
                    url: product?.gallery[0]?.image.url || '/logo1.webp',
                    width: 1000,
                    height: 1000,
                    alt: product.title,
                },
            ],
        },
    };
}