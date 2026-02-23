import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { Brands, PostsSlider, RelatedProducts } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';

export default async function HomePage() {
    const cookieStore = await cookies();
    const { backendUrl } = assets;
    const t = await getTranslations('CatalogMenu');

    const posts = await fetch(`${backendUrl}/api/posts`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    const brands = await fetch(`${backendUrl}/api/brands`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    const bestsellers = await fetch(`${backendUrl}/api/products/bestsellers`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    }).then(res => res.json());

    return (<div className={'w-full'}>
        <PostsSlider slides={posts.docs}/>k
        <div className={'mx-auto max-w-[1100px] mt-6'}>
            <h2 className={'font-semibold text-xl text-center'}>{t('brands')}</h2>
            <Brands brands={brands.docs}/>
        </div>
        <div className={'max-w-[1100px] mx-auto mt-6'}>
            <h2 className={'font-semibold text-xl text-center'}>{t('bestsellers')}</h2>
            <RelatedProducts products={bestsellers.docs} labels={false}/>
        </div>

    </div>);
}
