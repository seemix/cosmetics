import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat, Roboto } from "next/font/google";

import { Header, Footer } from "@/app/[locale]/components";
import "./globals.css";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

const montSerrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
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

	return (
		<html lang={locale}>
			<body
				className={`${roboto.className} ${montSerrat.className} antialiased`}
			>
				<div className={"grid grid-rows-[auto_1fr_auto] h-screen"}>
					<NextIntlClientProvider>
						<Header />
						{children}
						<Footer />
					</NextIntlClientProvider>
				</div>
			</body>
		</html>
	);
}
