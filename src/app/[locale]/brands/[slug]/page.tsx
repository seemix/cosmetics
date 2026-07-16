import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import type { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import {
    BreadCrumbs,
    ContentAccordion, NoContent, Pagination,
    ProductCardsGrid,
    SortSelect,
} from '@/app/[locale]/components';

export default async function BrandPage(props: propsType) {
    const t = await getTranslations('CatalogMenu');
    const { slug, locale } = await props.params;
    const { sort, page } = await props.searchParams;

    const cookieStore = await cookies();
    const { backendUrl } = assets;
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

    const { products,  pagination } = response;

    const brand = await fetch(`${backendUrl}/api/brands/${slug}?locale=${locale}`)
        .then(res => res.json());

    const breadCrumbs =
        [
            { id: '1', title: t('brands'), slug: 'brands' },
            { id: brand?.id, title: brand?.title, slug: brand?.slug }
        ];


    return (<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <ContentAccordion content={brand.description} logo={brand.logo.url}/>
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