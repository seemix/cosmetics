import type { MetadataRoute } from 'next';

import { assets } from '@/app/[locale]/assets/assets';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { frontendUrl } = assets;
    const locales = ['ru', 'ro'];

    const staticPages = ['', '/pages/about-us', '/pages/contacts', '/pages/payment-and-delivery'];

    const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((path) =>
        locales.map((locale) => ({
            url: `${frontendUrl}/${locale}${path}`,
            lastModified: new Date(),
            priority: path === '' ? 1.0 : 0.8,
        }))
    );

    return [
        ...staticEntries,
    ];
}