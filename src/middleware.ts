import type { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
    // 1️⃣ Спочатку ОБОВʼЯЗКОВО next-intl
    const intlResponse = intlMiddleware(req);
    if (intlResponse) return intlResponse;

    const { pathname } = req.nextUrl;

    // 2️⃣ Захищені роути
    const isAccountRoute =
        pathname.startsWith('/profile') ||
        routing.locales.some((locale) =>
            pathname.startsWith(`/${locale}/profile`)
        );

    if (isAccountRoute) {
        const hasAuthCookie =
            req.cookies.get('payload-token') ||
            req.cookies.get('payload-refresh-token');

        if (!hasAuthCookie) {
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
