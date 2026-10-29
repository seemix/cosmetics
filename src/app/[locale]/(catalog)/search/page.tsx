import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import Pagination from '@/components/Pagination/Pagination';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import { searchProducts } from '@/lib/api/queries';
import { pageMetadata } from '@/lib/seo/metadata';
import { firstParam, type PageProps } from '@/types/page-props';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { locale } = await props.params;
	const t = await getTranslations('Catalog');
	return pageMetadata({
		locale,
		path: '/search',
		title: t('searchResults'),
		noindex: true,
	});
}

export default async function SearchPage(props: PageProps) {
	const { locale } = await props.params;
	const searchParams = await props.searchParams;
	const query = firstParam(searchParams.query);
	if (!query) return <NoContent />;

	const t = await getTranslations();
	const { products, pagination } = await searchProducts(
		query,
		locale,
		firstParam(searchParams.page),
	);

	const searchResults = `${t('Catalog.searchResults')} '${query}'`;
	const breadCrumbs = [
		{ id: '0', title: t('Catalog.catalog'), href: '/catalog' },
		{ id: '2', title: searchResults },
	];

	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			{products.length < 1 ? (
				<NoContent />
			) : (
				<ProductCardsGrid products={products} />
			)}
			{pagination.totalPages > 1 && <Pagination pagination={pagination} />}
		</div>
	);
}
