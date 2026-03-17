import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import type { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, RelatedProducts, StaticPage } from '@/app/[locale]/components';

export default async function BrandPage(props: propsType) {
    const t = await getTranslations('CatalogMenu');
    const { slug, locale } = await props.params;
    const cookieStore = await cookies();
    const { backendUrl } = assets;

    const { products } = await fetch(`${backendUrl}/api/products/products-brand/${slug}?locale=${locale}`, {
        credentials: 'include',
        cache: 'no-cache',
        headers: {
            Cookie: cookieStore.toString(),
        }
    }).then(res => res.json());

    const brand = await fetch(`${backendUrl}/api/brands/${slug}?locale=${locale}`)
        .then(res => res.json());

    const breadCrumbs =
        [
            { id: '1', title: t('brands'), slug: 'brands' },
            { id: brand?.id, title: brand?.title, slug: brand?.slug }
        ];

    return (<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <StaticPage content={brand?.description} title={brand?.title}/>
            {/*<h2 className={'font-semibold text-xl text-center'}>{t('bestsellers')}</h2>*/}
            <RelatedProducts products={products} labels={true}/>
        </div>
    );
}