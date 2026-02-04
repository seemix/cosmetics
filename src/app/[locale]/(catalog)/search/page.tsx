import { cookies } from 'next/headers';

import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, NoContent, Pagination, ProductCardsGrid } from '@/app/[locale]/components';
import { getTranslations } from 'next-intl/server';
import { propsType } from '@/app/[locale]/types/server-component-params';

export default async function SearchPage(props: propsType) {
    const cookieStore = await cookies();
    const { locale } = await props.params;
    const { query } = await props.searchParams;
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
        { id: '1', title: t('Header.find'), slug: 'search' },
        { id: '2', title: searchResults, slug: searchResults }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <div className={'p-4'}><BreadCrumbs breadcrumbs={breadCrumbs}/></div>
            {products?.length < 1 ? <NoContent/> :
                <ProductCardsGrid products={products}/>}
            {pagination.totalPages > 1 && <Pagination pagination={pagination}/>}
        </div>
    );
}
