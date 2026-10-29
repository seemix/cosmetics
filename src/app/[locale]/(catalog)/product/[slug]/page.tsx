import type { Metadata } from 'next';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import { getProduct } from '@/lib/api/queries';
import { buildCategoryChain } from '@/lib/buildCategoryChain';
import { getProductMetadata } from '@/lib/seo/getProductMetadata';
import type { PageProps } from '@/types/page-props';

type Props = Pick<PageProps<{ slug: string }>, 'params'>;

export async function generateMetadata(props: Props): Promise<Metadata> {
	const { locale, slug } = await props.params;
	// Shares the request with the page through React `cache()`.
	const product = await getProduct(slug, locale);
	return getProductMetadata(product, locale);
}

export default async function ProductPage(props: Props) {
	const { locale, slug } = await props.params;
	const product = await getProduct(slug, locale);

	if (!product) {
		return (
			<div className={'mx-auto max-w-[1100px] p-4 w-full flex flex-col gap-3'}>
				<NoContent />
			</div>
		);
	}

	const categoriesChain = [
		...buildCategoryChain(product.categories?.[0]),
		{ id: product.id, title: product.title, slug: '' },
	];

	return (
		<div className={'mx-auto max-w-[1100px] p-4 w-full flex flex-col gap-3'}>
			<BreadCrumbs breadcrumbs={categoriesChain} />
			<ProductDetails product={product} />
		</div>
	);
}
