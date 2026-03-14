import { Montserrat, Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { MenuProvider } from '@/app/[locale]/components/Menu/MenuContext';
import { CheckAuth, ClearAuthError, Footer, Header, HeaderLogo, ModalWindow } from '@/app/[locale]/components';

import './globals.css';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
});

const montSerrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
    preload: true,
});

import type { Metadata } from 'next'

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const menu = await fetch(`${process.env.API_URL}/menu?locale=${locale}`,{
        cache: 'no-cache'
    }).then(res => res.json()) || [];

    return (
        <html lang={locale}>
        <body className={`${roboto.className} ${montSerrat.className} antialiased`}
        >
        <div className={'grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] h-screen min-w-0'}>
            <NextIntlClientProvider>
                <MenuProvider initialMenu={menu}>
                    <HeaderLogo/>
                    <Header/>
                    <CheckAuth/>
                    <ClearAuthError/>
                    <main className={'w-full min-w-0 flex justify-center'}>
                        {children}
                    </main>
                    <Footer/>
                    <ModalWindow/>
                </MenuProvider>
            </NextIntlClientProvider>
        </div>
        </body>
        </html>
    );
}
