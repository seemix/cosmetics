import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import Pagination from '@/components/Pagination/Pagination';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import { searchProducts } from '@/lib/api/queries';
import { firstParam, type PageProps } from '@/types/page-props';

export default async function SearchPage(props: PageProps) {
	const { locale } = await props.params;
	const searchParams = await props.searchParams;
	const query = firstParam(searchParams.query);
	if (!query) return <NoContent />;

	const t = await getTranslations();
	const { products, pagination } = await searchProducts(query, {
		locale,
		page: firstParam(searchParams.page),
	});

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
