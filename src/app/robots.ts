import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/cart', '/checkout'], // Закриваємо технічні сторінки
        },
        sitemap: 'https://nextlevelshop.md/sitemap.xml',
    };
}