import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, NoContent, ProductCardsGrid, SortSelect, Pagination } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';
import type { propsType } from '@/app/[locale]/types/server-component-params';

export default async function BrandPage(props: propsType) {

    const { locale, slug } = await props.params;
    const { sort, page } = await props.searchParams;

    const { backendUrl } = assets;
    const t = await getTranslations();
    const cookieStore = await cookies();

    const url = new URL(`${backendUrl}/api/products/products-brand/${slug}`);
    url.search = new URLSearchParams({
        locale,
        sort: sort?.toString() || '',
        page: page?.toString() || '1'
    }).toString();

    const response = await fetch(url, {
        credentials: 'include',
        cache: 'no-cache',
        headers: {
            Cookie: cookieStore.toString(),
        }
    }).then(res => res.json());

    const { products, brand, pagination } = response;

    const breadCrumbs = [
        { id: '0', title: t('Catalog.catalog'), slug: 'catalog' },
        { id: '1', title: t('CatalogMenu.brands'), slug: 'brands' },
        { id: brand?.id, title: brand?.title, slug: brand?.slug }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            {products.length > 0 &&
                <div className={'flex flex-col sm:flex-row gap-2 items-start sm:justify-between sm:items-center'}>
                    <BreadCrumbs breadcrumbs={breadCrumbs}/>
                    <SortSelect/>
                </div>}
            {products.length ? <ProductCardsGrid products={products}/> : <NoContent/>}
            {pagination.totalPages > 1 && <Pagination pagination={pagination}/>}
        </div>
    );
}
