import { Montserrat, Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { MenuProvider } from '@/components/Menu/MenuContext';
import { getHomeMetadata } from '@/lib/seo/getHomeMetadata';
import CheckAuth from '@/components/CheckAuth/CheckAuth';
import ClearAuthError from '@/components/ClearAuthError/ClearAuthError';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeaderLogo from '@/components/Header/HeaderLogo';
import ModalWindow from '@/components/ModalWindow/ModalWindow';

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

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return getHomeMetadata(locale);
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
    const menu = await fetch(`${process.env.API_URL}/menu?locale=${locale}`, {
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
