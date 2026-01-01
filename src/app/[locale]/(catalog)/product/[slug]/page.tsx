import { BreadCrumbs, ProductDetails } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { buildCategoryChain } from '@/app/[locale]/services/buildCategoryChain';

export default async function ProductPage(props: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await props.params;
    const response = await fetch(
        `${process.env.API_URL}/products?where[slug][equals]=${slug}&locale=${locale}`,
    ).then((res) => res.json());
    const product: IProduct = response.docs[0];
    const categoriesChain = buildCategoryChain(product.categories[0]);
    categoriesChain[2] = {
        id: product.id,
        title: product.title,
        slug: product.slug
    }

    return (
        <div className={'mx-auto max-w-[1100px] p-4'}>
            {/*<div className={'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] p-4 flex justify-between items-center'}>*/}
                <BreadCrumbs breadcrumbs={categoriesChain}/>
            {/*</div>*/}
            <ProductDetails product={product}/>
        </div>
    );
}
