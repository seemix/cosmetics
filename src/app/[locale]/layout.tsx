import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import CheckAuth from '@/components/CheckAuth/CheckAuth';
import ClearAuthError from '@/components/ClearAuthError/ClearAuthError';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeaderLogo from '@/components/Header/HeaderLogo';
import { MenuProvider } from '@/components/Menu/MenuContext';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import { routing } from '@/i18n/routing';
import { getMenu } from '@/lib/api/queries';
import { getSiteMetadata } from '@/lib/seo/getHomeMetadata';
import './globals.css';

// next/font needs literal options. Subsets: Cyrillic for ru, Latin Extended for Romanian (ă, â, î, ș, ț).

/** Secondary face, applied via `font-(family-name:--font-roboto)`. */
const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin', 'latin-ext', 'cyrillic'],
	preload: false,
});

/** Body face. */
const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin', 'latin-ext', 'cyrillic'],
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	return getSiteMetadata(locale);
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
	const menu = await getMenu(locale);

	return (
		<html lang={locale} className={`${roboto.variable} ${montserrat.variable}`}>
			<body className={`${montserrat.className} antialiased`}>
				<div
					className={
						'grid grid-rows-[auto_1fr_auto] grid-cols-[1fr] h-screen min-w-0'
					}
				>
					<NextIntlClientProvider>
						<MenuProvider initialMenu={menu}>
							<HeaderLogo />
							<Header />
							<CheckAuth />
							<ClearAuthError />
							<main className={'w-full min-w-0 flex justify-center'}>
								{children}
							</main>
							<Footer />
							<ModalWindow />
						</MenuProvider>
					</NextIntlClientProvider>
				</div>
			</body>
		</html>
	);
}
