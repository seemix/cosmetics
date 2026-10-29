import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import Pagination from '@/components/Pagination/Pagination';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import SortSelect from '@/components/SortSelect/SortSelect';
import { getCategoryProducts } from '@/lib/api/queries';
import { pageMetadata } from '@/lib/seo/metadata';
import { firstParam, type PageProps } from '@/types/page-props';

export async function generateMetadata(
	props: PageProps<{ slug: string[] }>,
): Promise<Metadata> {
	const { locale, slug } = await props.params;
	const searchParams = await props.searchParams;
	const t = await getTranslations('Catalog');
	// Same arguments as the page, so the request is shared through cache().
	const { categories } = await getCategoryProducts(
		slug.join(','),
		locale,
		firstParam(searchParams.sort),
		firstParam(searchParams.page),
	);
	return pageMetadata({
		locale,
		path: `/category/${slug.join('/')}`,
		title: categories?.at(-1)?.title ?? t('catalog'),
	});
}

export default async function CategoryPage(
	props: PageProps<{ slug: string[] }>,
) {
	const { locale, slug } = await props.params;
	const searchParams = await props.searchParams;
	const t = await getTranslations('Catalog');

	// Same value as the former `${slug}` interpolation of the catch-all segment.
	const { products, categories, pagination } = await getCategoryProducts(
		slug.join(','),
		locale,
		firstParam(searchParams.sort),
		firstParam(searchParams.page),
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
