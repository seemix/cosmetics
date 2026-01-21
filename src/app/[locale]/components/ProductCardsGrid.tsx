'use client';

import type { IProduct } from '@/app/[locale]/types/product';
import { ProductCard } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ProductCardsGrid({ products }: { products: IProduct[] }) {

    const { user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const prevUserRef = useRef<typeof user>(null);

    useEffect(() => {
        if (prevUserRef.current && !user) {
            router.replace(pathname);
        }

        if (!prevUserRef.current && user) {
            router.refresh();
        }

        prevUserRef.current = user;
    }, [user, router, pathname]);

    return (
        <div className="product-cards-grid">
            {products.map((product, i) => (
                <ProductCard product={product} key={product.id + String(i)}/>
            ))}
        </div>
    );
}