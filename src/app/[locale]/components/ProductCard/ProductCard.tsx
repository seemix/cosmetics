'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AddToBasketButton } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';

const formatPrice = (value: number) =>
    new Intl.NumberFormat('md-MD', { style: 'currency', currency: assets.currency }).format(
        value,
    );

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
    const { backendUrl } = assets;
    const price = wholesalePrice || retailPrice;

    return (
        <div className={'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]'}>
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
                    <p className={'text-gray-500 text-sm'}>Код: {article}</p>
                    <p className={`${wholesalePrice ? 'text-green-500': 'text-[var(--main)]'} font-bold text-[1.2em]`}>
                        {formatPrice(price)}
                    </p>
                </div>
                <div className={'mx-auto mt-3'}>
                    <AddToBasketButton/>
                </div>
            </div>
        </div>
    );
}
