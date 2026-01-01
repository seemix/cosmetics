import { Montserrat, Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { Footer, Header, ModalWindow } from '@/app/[locale]/components';
import { routing } from '@/i18n/routing';
import './globals.css';
import { MenuProvider } from '@/app/[locale]/components/Menu/MenuContext';

const roboto = Roboto({
    variable: '--font-roboto',
    subsets: ['latin'],
});

const montSerrat = Montserrat({
    variable: '--font-montserrat',
    subsets: ['latin'],
    preload: true,
});

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
    const menu = await fetch(`${process.env.API_URL}/menu?locale=${locale}`).then(
        (res) => res.json(),
    );

    return (
        <html lang={locale}>
        <body
            className={`${roboto.className} ${montSerrat.className} antialiased`}
        >
        <div className={'grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] h-screen'}>
            <NextIntlClientProvider>
                <MenuProvider initialMenu={menu}>
                    <Header/>
                    <main className={'w-full flex justify-center'}>
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
