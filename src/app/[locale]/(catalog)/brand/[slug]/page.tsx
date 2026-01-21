import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, NoContent, ProductCardsGrid } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';

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
    // const products = Array(10).fill(response?.products[0]);
    const { products, brand } = response;


    const breadCrumbs = [
        { id: 0, title: t('brands'), slug: 'brands' },
        { id: brand?.id, title: brand?.title, slug: brand?.slug }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            {products.length > 0 && <div className={'p-4 flex justify-between items-center'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
                {/*<SortSelect/>*/}
            </div>}
            {products.length ? <ProductCardsGrid products={products}/> : <NoContent/>}
        </div>
    );
}
