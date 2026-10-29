import type { Metadata } from 'next';
import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/api/queries';

// Account pages are private.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ProtectedRoutes({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const user = await getCurrentUser();

	// Guests go to the home page of their current locale (decision D4).
	if (!user) return redirect({ href: '/', locale });

	return <>{children}</>;
}
