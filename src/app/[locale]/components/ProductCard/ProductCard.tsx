'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiShoppingCartSimple } from 'react-icons/pi';

export type Product = {
    id: string | number;
    name: string;
    slug?: string;
    category?: string;
    image: string; // url or import
    alt?: string;
    price: number; // in smallest currency unit or float
    oldPrice?: number;
    rating?: number; // 0..5
    reviews?: number;
    brand?: string;
    badge?: 'sale' | 'new' | string | null;
};

type Props = {
    product: Product;
    onAddToCart?: (product: Product) => void;
    className?: string;
};

const formatPrice = (value: number) =>
    new Intl.NumberFormat('md-MD', { style: 'currency', currency: 'MDL' }).format(value);

export default function ProductCard({ product }: Props) {
    const {
        id,
        name,
        slug,
        image,
        alt = 'product image',
        price,
        brand
    } = product;

    return (
        <div className={'w-80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]'}>
            <div className={'w-full aspect-[4/3] relative'}>
                <Image src={image} alt={alt} layout={'fill'} objectFit={'cover'}/>
            </div>
            <div className={'p-4 flex flex-col gap-2'}>
                <p className={'text-xs uppercase'}>{brand}</p>
                <Link href={`/catalog/${slug}`} className={'text-black text'}>{name}</Link>
                <p className={'text-sm text-gray-500'}>Код товара: {'005' + id}</p>
                <div className={'flex justify-end w-full'}>
                    <p className={'text-black font-gray-500 font-bold text-xl'}>{formatPrice(price)}</p>
                </div>
                <button
                    className={`cursor-pointer transition-colors duration-300 border-1 border-black p-2 
                                 hover:border-[var(--main)] hover:text-[var(--main)] flex gap-2 justify-center
                                 font-(family-name:--font-roboto)`}>
                    Добавить в корзину
                    <PiShoppingCartSimple size={23}/>
                </button>
            </div>
        </div>
    );
}
