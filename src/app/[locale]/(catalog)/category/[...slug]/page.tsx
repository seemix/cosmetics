import { cookies } from 'next/headers';

import { BreadCrumbs, NoContent, ProductCardsGrid } from '@/app/[locale]/components';
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
    const { products, categories } = response;

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            {categories &&
                <div className={'p-4 flex justify-between items-center'}>
                    <BreadCrumbs breadcrumbs={response.categories}/>
                    {/*<SortSelect/>*/}
                </div>}
            {products.length ? <ProductCardsGrid products={products}/> : <NoContent/>}
        </div>
    );
}
