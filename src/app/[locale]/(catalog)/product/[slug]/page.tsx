import { cookies } from 'next/headers';

import type { Metadata } from 'next';
import { BreadCrumbs, NoContent, ProductDetails } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { buildCategoryChain } from '@/app/[locale]/services/buildCategoryChain';
import { assets } from '@/app/[locale]/assets/assets';
import { getProductMetadata } from '@/app/[locale]/meta/getProductMetadata';

export async function generateMetadata(props: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await props.params;
    const { backendUrl } = assets;

    const response = await fetch(
        `${backendUrl}/api/products?where[slug][equals]=${slug}&locale=${locale}`
    ).then((res) => res.json());

    const product: IProduct = response.docs[0];

    return getProductMetadata(product, locale);
}
export default async function ProductPage(props: {
    params: Promise<{ locale: string; slug: string }>;
}) {

    const { locale, slug } = await props.params;
    const cookieStore = await cookies();
    const { backendUrl } = assets;
    const product = await fetch(
        `${backendUrl}/api/products/${slug}?locale=${locale}`, {
            credentials: 'include',
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    ).then((res) => res.json());


    const firstCategory = product.categories && product.categories.length > 0
        ? product.categories[0]
        : null;

    const categoriesChain = buildCategoryChain(firstCategory);
    categoriesChain[2] = {
        id: product?.id,
        title: product?.title,
        slug: ''
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
