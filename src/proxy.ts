import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Locale detection and prefixing only. Account pages are protected by
// app/[locale]/(protected)/layout.tsx, which checks the session with the backend.
export default createIntlMiddleware(routing);

export const config = {
	matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
