import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import { assets } from '@/config/assets';
import { buildCategoryChain } from '@/lib/buildCategoryChain';
import { getProductMetadata } from '@/lib/seo/getProductMetadata';
import type { IProduct } from '@/types/product';

export async function generateMetadata(props: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await props.params;
	const { backendUrl } = assets;

	const response = await fetch(
		`${backendUrl}/api/products?where[slug][equals]=${slug}&locale=${locale}`,
	).then((res) => res.json());

	const product: IProduct = response.docs[0];

	return getProductMetadata(product, locale);
}
export default async function ProductPage(props: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await props.params;
	const cookieStore = await cookies();
	const { backendUrl } = assets;
	const product = await fetch(
		`${backendUrl}/api/products/${slug}?locale=${locale}`,
		{
			credentials: 'include',
			headers: {
				Cookie: cookieStore.toString(),
			},
		},
	).then((res) => res.json());

	const firstCategory =
		product.categories && product.categories.length > 0
			? product.categories[0]
			: null;

	const categoriesChain = buildCategoryChain(firstCategory);
	categoriesChain[2] = {
		id: product?.id,
		title: product?.title,
		slug: '',
	};

	return (
		<div className={'mx-auto max-w-[1100px] p-4 w-full flex flex-col gap-3'}>
			{product ? (
				<>
					<BreadCrumbs breadcrumbs={categoriesChain} />
					<ProductDetails product={product} />
				</>
			) : (
				<NoContent />
			)}
		</div>
	);
}
