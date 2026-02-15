'use client';

import type { IProduct } from '@/app/[locale]/types/product';
import { ProductCard } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useAuthPrices } from '@/app/[locale]/hooks/useAuthPrices';

export default function ProductCardsGrid({ products }: { products: IProduct[] }) {

    const { user } = useAuthStore();
    useAuthPrices(user);

    return (
        <div className={`grid w-full max-w-[1100px] grid-cols-[repeat(auto-fll,minmax(220px,1fr))] justify-items-start 
                         gap-4 sm:grid-cols-[repeat(auto-fit,260px)] sm:justify-items-center`}>
            {products.map((product, i) =>
                <ProductCard product={product} key={product.id} index={i}/>
            )}
        </div>
    );
}