import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import MyFavorites from '@/components/MyFavorites/MyFavorites';

// Open to guests too (their list lives in localStorage), but personal: not indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function FavoritesPage() {
	const t = await getTranslations();
	const breadCrumbs = [
		{ id: '0', title: t('StaticPages.Main'), href: '/' },
		{ id: '1', title: t('Account.favorites') },
	];
	return (
		<div className={'max-w-[1100px] w-full p-4'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			<MyFavorites />
		</div>
	);
}
