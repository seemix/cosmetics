import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import { assets } from '@/app/[locale]/assets/assets';
import type { propsType } from '@/app/[locale]/types/server-component-params';
import { BreadCrumbs, NoContent, Pagination, ProductCardsGrid } from '@/app/[locale]/components';

export default async function SearchPage(props: propsType) {
    const cookieStore = await cookies();
    const { locale } = await props.params;
    const { query } = await props.searchParams;
    if(!query) return <NoContent/>

    const t = await getTranslations();
    const url = new URL(`${assets.backendUrl}/api/products/products-search`);
    url.search = new URLSearchParams({
        locale,
        q: query as string
    }).toString();

    const response = await fetch(url, {
        credentials: 'include',
        headers: new Headers({
            Cookie: cookieStore.toString()
        })
    }).then(res => res.json());

    const { products, pagination } = response;
    const searchResults = `${t('Catalog.searchResults')} '${query}'`;
    const breadCrumbs = [
        { id: '0', title: t('Catalog.catalog'), slug: 'catalog' },
        { id: '2', title: searchResults, slug: searchResults }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
            {products?.length < 1 ? <NoContent/> :
                <ProductCardsGrid products={products}/>}
            {pagination.totalPages > 1 && <Pagination pagination={pagination}/>}
        </div>
    );
}
