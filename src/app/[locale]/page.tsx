import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Brands from '@/components/Brands/Brands';
import PostsSlider from '@/components/PostsSlider/PostsSlider';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import { getBestsellers, getBrands, getPosts } from '@/lib/api/queries';
import { getHomeMetadata } from '@/lib/seo/getHomeMetadata';
import type { PageProps } from '@/types/page-props';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { locale } = await props.params;
	return getHomeMetadata(locale);
}

export default async function HomePage(props: PageProps) {
	const { locale } = await props.params;
	const t = await getTranslations('CatalogMenu');

	const [posts, brands, bestsellers] = await Promise.all([
		getPosts(locale),
		getBrands(),
		getBestsellers(locale),
	]);

	return (
		<div className={'w-full'}>
			<PostsSlider slides={posts?.docs ?? []} />
			<h2 className={'font-semibold text-xl text-center my-5'}>
				{t('brands')}
			</h2>
			<Brands brands={brands?.docs ?? []} />
			<div className={'max-w-[1100px] mx-auto mt-6'}>
				<h2 className={'font-semibold text-xl text-center'}>
					{t('bestsellers')}
				</h2>
				<RelatedProducts products={bestsellers.products} labels={false} />
			</div>
		</div>
	);
}
