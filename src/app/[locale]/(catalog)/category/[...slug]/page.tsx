import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import Pagination from '@/components/Pagination/Pagination';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import SortSelect from '@/components/SortSelect/SortSelect';
import { getCategoryProducts } from '@/lib/api/queries';
import { firstParam, type PageProps } from '@/types/page-props';

export default async function CategoryPage(
	props: PageProps<{ slug: string[] }>,
) {
	const { locale, slug } = await props.params;
	const searchParams = await props.searchParams;
	const t = await getTranslations('Catalog');

	// Same value as the former `${slug}` interpolation of the catch-all segment.
	const { products, categories, pagination } = await getCategoryProducts(
		slug.join(','),
		{
			locale,
			sort: firstParam(searchParams.sort),
			page: firstParam(searchParams.page),
		},
	);
	const breadCrumbs = [
		{ id: '0', title: t('catalog'), href: '/catalog' },
		...(categories ?? []).map(({ id, title, slug }) => ({
			id,
			title,
			href: `/category/${slug}`,
		})),
	];

	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			{categories && (
				<div
					className={
						'flex flex-col sm:flex-row gap-2 items-start sm:justify-between sm:items-center'
					}
				>
					<BreadCrumbs breadcrumbs={breadCrumbs} />
					<SortSelect />
				</div>
			)}
			{products.length ? (
				<ProductCardsGrid products={products} />
			) : (
				<NoContent />
			)}
			{pagination.totalPages > 1 && <Pagination pagination={pagination} />}
		</div>
	);
}
