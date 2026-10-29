import { redirect } from '@/i18n/navigation';
import { getCurrentUser } from '@/lib/api/queries';

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
