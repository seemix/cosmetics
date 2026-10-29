import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import CatalogMenu from '@/components/Menu/CatalogMenu/CatalogMenu';

export default async function CatalogPage() {
	const t = await getTranslations();

	const breadCrumbs = [
		{ id: '0', title: t('StaticPages.Main'), href: '/' },
		{ id: '1', title: t('Catalog.catalog') },
	];
	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			<CatalogMenu />
		</div>
	);
}
