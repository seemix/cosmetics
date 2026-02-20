import { cookies } from 'next/headers';

import { BreadCrumbs, NoContent, Pagination, ProductCardsGrid, SortSelect } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';
import type { propsType } from '@/app/[locale]/types/server-component-params';
import { getTranslations } from 'next-intl/server';

export default async function CategoryPage(props: propsType) {

    const { locale, slug } = await props.params;
    const { sort, page } = await props.searchParams;
    const t = await getTranslations('Catalog');
    const { backendUrl } = assets;
    const cookieStore = await cookies();

    const url = new URL(`${backendUrl}/api/products/products-category/${slug}`);
    url.search = new URLSearchParams({
        locale,
        sort: sort?.toString() || '',
        page: page?.toString() || '1'
    }).toString();

    const response = await fetch(url, {
        credentials: 'include',
        headers: {
            Cookie: cookieStore.toString(),
        }
    }).then(res => res.json());

    const { products, categories, pagination } = response;
    const breadCrumbs = [{ id: '0', title: t('catalog'), slug: 'catalog' }, ...response.categories || []];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            {categories &&
                <div className={'flex flex-col sm:flex-row gap-2 items-start sm:justify-between sm:items-center'}>
                    <BreadCrumbs breadcrumbs={breadCrumbs}/>
                    <SortSelect/>
                </div>}
            {products.length ? <ProductCardsGrid products={products}/> : <NoContent/>}
            {pagination.totalPages > 1 && <Pagination pagination={pagination}/>}
        </div>
    );
}
