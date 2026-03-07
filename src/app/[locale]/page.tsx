import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { Brands, PostsSlider, RelatedProducts } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';
import type { propsType } from '@/app/[locale]/types/server-component-params';

export default async function HomePage(props: propsType) {
    const cookieStore = await cookies();
    const { locale } = await props.params;
    const { backendUrl } = assets;
    const t = await getTranslations('CatalogMenu');

    const posts = await fetch(`${backendUrl}/api/posts?locale=${locale}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    const brands = await fetch(`${backendUrl}/api/brands`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    const bestsellers = await fetch(`${backendUrl}/api/products/bestsellers?locale=${locale}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    return (<div className={'w-full'}>
        <PostsSlider slides={posts.docs}/>
        <div className={'mx-auto max-w-[1000px] mt-6'}>
            <h2 className={'font-semibold text-xl text-center mb-4'}>{t('brands')}</h2>
            <Brands brands={brands.docs}/>
        </div>
        <div className={'max-w-[1100px] mx-auto mt-6'}>
            <h2 className={'font-semibold text-xl text-center'}>{t('bestsellers')}</h2>
            <RelatedProducts products={bestsellers.docs} labels={false}/>
        </div>

    </div>);
}
