import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import ContentAccordion from '@/components/ContentAccordion/ContentAccordion';
import NoContent from '@/components/NoContent/NoContent';
import Pagination from '@/components/Pagination/Pagination';
import ProductCardsGrid from '@/components/ProductCardsGrid/ProductCardsGrid';
import SortSelect from '@/components/SortSelect/SortSelect';
import { getBrand, getBrandProducts } from '@/lib/api/queries';
import { pageMetadata } from '@/lib/seo/metadata';
import { firstParam, type PageProps } from '@/types/page-props';

export async function generateMetadata(
	props: PageProps<{ slug: string }>,
): Promise<Metadata> {
	const { locale, slug } = await props.params;
	const brand = await getBrand(slug, locale);
	return pageMetadata({
		locale,
		path: `/brand/${slug}`,
		title: brand?.title ?? slug,
	});
}

export default async function BrandPage(props: PageProps<{ slug: string }>) {
	const t = await getTranslations();
	const { slug, locale } = await props.params;
	const searchParams = await props.searchParams;

	const [{ products, pagination }, brand] = await Promise.all([
		getBrandProducts(
			slug,
			locale,
			firstParam(searchParams.sort),
			firstParam(searchParams.page),
		),
		getBrand(slug, locale),
	]);

	const breadCrumbs = [
		{ id: '0', title: t('Catalog.catalog'), href: '/catalog' },
		{ id: '1', title: t('CatalogMenu.brands') },
		{ id: brand?.id ?? slug, title: brand?.title ?? '' },
	];

	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			{brand && (
				<ContentAccordion content={brand.description} logo={brand.logo.url} />
			)}
			{products.length > 0 && (
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
