import { BreadCrumbs, SortSelect } from '@/app/[locale]/components';
import ProductCardsGrid from '@/app/[locale]/components/ProductCardsGrid';

export default async function CategoryPage(props: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await props.params;
    // const response = await fetch(`${process.env.API_URL}/products?where[categories.slug][equals]=${slug}&locale=${locale}`).then(res => res.json());
    const response = await fetch(`${process.env.API_URL}/products/products-category/${slug}?locale=${locale}`).then(res => res.json());
    const products = Array(10).fill(response.products[0]);
    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <div className={'p-4 flex justify-between items-center'}>
                {response.categories && <BreadCrumbs breadcrumbs={response.categories}/>}
                <SortSelect/>
            </div>
            <ProductCardsGrid products={products}/>
        </div>
    );
}
