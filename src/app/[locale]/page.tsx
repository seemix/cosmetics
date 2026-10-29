import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import Brands from '@/components/Brands/Brands';
import PostsSlider from '@/components/PostsSlider/PostsSlider';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import { assets } from '@/config/assets';
import type { propsType } from '@/types/server-component-params';

export default async function HomePage(props: propsType) {
    const cookieStore = await cookies();
    const { locale } = await props.params;
    const { backendUrl } = assets;
    const t = await getTranslations('CatalogMenu');

    const headers = { Cookie: cookieStore.toString() };

    // The three requests are independent, so they run in parallel instead of sequentially.
    const [posts, brands, bestsellers] = await Promise.all([
        fetch(`${backendUrl}/api/posts?locale=${locale}`, { headers }).then(res => res.json()),
        fetch(`${backendUrl}/api/brands`, { headers }).then(res => res.json()),
        fetch(`${backendUrl}/api/products/bestsellers?locale=${locale}`, {
            headers,
            cache: 'no-store'
        }).then(res => res.json()),
    ]);

    return (
        <div className={'w-full'}>
            <PostsSlider slides={posts.docs}/>
            <h2 className={'font-semibold text-xl text-center my-5'}>{t('brands')}</h2>
            <Brands brands={brands.docs}/>
            <div className={'max-w-[1100px] mx-auto mt-6'}>
                <h2 className={'font-semibold text-xl text-center'}>{t('bestsellers')}</h2>
                <RelatedProducts products={bestsellers.products} labels={false}/>
            </div>
        </div>);
}
