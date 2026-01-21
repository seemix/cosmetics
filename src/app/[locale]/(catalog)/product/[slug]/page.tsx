import { cookies } from 'next/headers';

import { BreadCrumbs, NoContent, ProductDetails } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { buildCategoryChain } from '@/app/[locale]/services/buildCategoryChain';
import { assets } from '@/app/[locale]/assets/assets';

export default async function ProductPage(props: {
    params: Promise<{ locale: string; slug: string }>;
}) {

    const { locale, slug } = await props.params;
    const cookieStore = await cookies();
    const { backendUrl } = assets;
    const response = await fetch(
        `${backendUrl}/api/products?where[slug][equals]=${slug}&locale=${locale}`, {
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    ).then((res) => res.json());
    const product: IProduct = response.docs[0];

    const categoriesChain = buildCategoryChain(product?.categories[0]);
    categoriesChain[2] = {
        id: product?.id,
        title: product?.title,
        slug: product?.slug
    };

    return (
        <div className={'mx-auto max-w-[1100px] p-4 w-full flex flex-col gap-3'}>
            {product ?
                <>
                    <BreadCrumbs breadcrumbs={categoriesChain}/>
                    <ProductDetails product={product}/>
                </>
                : <NoContent/>}
        </div>
    );
}
