'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton, AlreadyInCartButton } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { useTranslations } from 'next-intl';

// const formatPrice = (value: number) =>
//     new Intl.NumberFormat('md-MD', { style: 'currency', currency: assets.currency }).format(
//         value,
//     );

export default function ProductCard({ product }: { product: IProduct }) {
    const {
        title,
        subtitle,
        article,
        slug,
        gallery,
        retailPrice,
        wholesalePrice,
    } = product;
    const { backendUrl, currency } = assets;
    const t = useTranslations('Catalog');
    const price = wholesalePrice || retailPrice;
    const { cart } = useCartStore();

    const inCart = cart?.items?.some((item) => item.id === product.id) as boolean;


    return (
        <div className={'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] max-w-70'}>
            <div className={'w-full aspect-[4/3] relative'}>
                <Link href={`/product/${slug}`}>
                    <Image src={backendUrl + gallery[0].image.sizes.medium.url} alt={gallery[0].image.alt} fill
                           className={'object-cover'} placeholder={'blur'} blurDataURL={gallery[0].image.blurHash}/>
                </Link>
            </div>
            <div className={'p-4 flex flex-col gap-2 bg-white'}>
                <Link href={`/product/${slug}`} className={'transition-colors duration-300 hover:text-[var(--main)]'}>
                    <p className={'text-lg font-bold'}>{title}</p>
                    <p className={'text-xs'}>{subtitle}</p>
                </Link>
                <div className={'flex justify-between mt-2 items-center'}>
                    <p className={'text-gray-500 text-sm'}>{t('shortArticle')}: {article}</p>
                    <p className={`${wholesalePrice ? 'text-green-500' : 'text-[var(--main)]'} font-bold text-[1.2em]`}>
                        {price} {currency}
                    </p>
                </div>
                <div className={'mx-auto mt-3'}>
                    {!inCart ? <AddToCartButton productId={product.id} quantity={1}/> : <AlreadyInCartButton/>}
                </div>
            </div>
        </div>
    );
}