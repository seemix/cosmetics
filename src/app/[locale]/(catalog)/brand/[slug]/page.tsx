import { cookies } from 'next/headers';

import { BreadCrumbs, ProductCardsGrid } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';
import { getTranslations } from 'next-intl/server';

export default async function BrandPage(props: { params: Promise<{ locale: string, slug: string }> }) {

    const { locale, slug } = await props.params;
    const { backendUrl } = assets;
    const t = await getTranslations('CatalogMenu');
    const cookieStore = await cookies();

    const response = await fetch(`${backendUrl}/api/products/products-brand/${slug}?locale=${locale}`, {
        credentials: 'include',
        headers: {
            Cookie: cookieStore.toString(),
        }
    }).then(res => res.json());
    const products = Array(10).fill(response.products[0]);

    const { brand } = response;
    const breadCrumbs = [
        { id: 0, title: t('brands'), slug: 'brands' },
        { id: brand.id, title: brand.title, slug: brand.slug }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <div className={'p-4 flex justify-between items-center'}>
                {response.brand && <BreadCrumbs breadcrumbs={breadCrumbs}/>}
                {/*<SortSelect/>*/}
            </div>
            <ProductCardsGrid products={products}/>
        </div>
    );
}
