import type { Metadata } from 'next';

const seoData = {
    ru: {
        title: 'Next Level Barber Supply — Профессиональная мужская косметика в Молдове',
        description: 'Эксклюзивный дистрибьютор Uppercut, Luxina и Xflex в Молдове. Оригинальная косметика для барбершопов: стайлинг, уход за бородой и волосами. Доставка по всей Молдове.',
        keywords: 'мужская косметика, барбершоп молдова, стайлинг для волос, уход за бородой, Uppercut Deluxe Молдова, Luxina, Xflex, купить косметику для мужчин',
    },
    ro: {
        title: 'Next Level Barber Supply — Cosmetică profesională pentru bărbați în Moldova',
        description: 'Distribuitor exclusiv Uppercut, Luxina și Xflex în Moldova. Cosmetică originală pentru frizerii: styling, îngrijirea bărbii și a părului. Livrare în toată Moldova.',
        keywords: 'cosmetică bărbați, barbershop moldova, styling păr, îngrijire barbă, Uppercut Deluxe Moldova, Luxina, Xflex, cumpără cosmetică pentru bărbați',
    }
};

export function getHomeMetadata(locale: string): Metadata {
    const current = seoData[locale as keyof typeof seoData] || seoData.ro;

    return {
        title: current.title,
        description: current.description,
        keywords: current.keywords,
        alternates: {
            languages: {
                'ru-MD': '/ru',
                'ro-MD': '/ro',
            },
        },
        openGraph: {
            title: current.title,
            description: current.description,
            locale: locale === 'ru' ? 'ru_MD' : 'ro_MD',
            type: 'website',
            siteName: 'Next Level Barber Supply',
            images: [{ url: '/logo1.webp', alt: 'site_logo' }]
        },
        icons: {
            icon: '/favicon.png',
            shortcut: '/favicon.png',
            apple: '/favicon.png',
        },
    };
}