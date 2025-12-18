import { ProductDetails } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';

export default async function ProductPage(props: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await props.params;
	const response = await fetch(
		`${process.env.API_URL}/products?where[slug][equals]=${slug}&locale=${locale}`,
	).then((res) => res.json());
	const product: IProduct = response.docs[0];

	return (
		<div className={'mx-auto max-w-[1100px] p-4'}>
			<ProductDetails product={product} />
		</div>
	);
}
