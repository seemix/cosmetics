import { cookies } from 'next/headers';

import { BreadCrumbs, ProductCardsGrid } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';

export default async function CategoryPage(props: { params: Promise<{ locale: string, slug: string }> }) {

    const { locale, slug } = await props.params;
    const { backendUrl } = assets;
    const cookieStore = await cookies();
    const response = await fetch(`${backendUrl}/api/products/products-category/${slug}?locale=${locale}`, {
        credentials: 'include',
        headers: {
            Cookie: cookieStore.toString(),
        }
    }).then(res => res.json());
    const products = Array(10).fill(response.products[0]);

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <div className={'p-4 flex justify-between items-center'}>
                {response.categories && <BreadCrumbs breadcrumbs={response.categories}/>}
                {/*<SortSelect/>*/}
            </div>
            <ProductCardsGrid products={products}/>
        </div>
    );
}
