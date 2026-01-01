import type { IProduct } from '@/app/[locale]/types/product';
import { ProductCard } from '@/app/[locale]/components';

export default function ProductCardsGrid({ products }: { products: IProduct[] }) {
    return (
        <div className={'product-cards-grid'}>
            {products.map((product, i) => (<ProductCard product={product} key={product.id+String(i)}/>))}
        </div>
    );
}