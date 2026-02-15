'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { AddToCartButton, AlreadyInCartButton, ProductLabels } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function ProductCard({ product, index = 0, labels = true }: { product: IProduct, index: number, labels?: boolean }) {
    const {
        title,
        subtitle,
        article,
        slug,
        gallery,
        retailPrice,
        wholesalePrice,
        action,
        bestSeller
    } = product;
    const { backendUrl, currency } = assets;
    const t = useTranslations('Catalog');
    const price = wholesalePrice || retailPrice;
    const { cart } = useCartStore();

    const inCart = cart?.items?.some((item) => item.id === product.id) as boolean;

    return (
        <motion.div
            initial={{ opacity: 0, x: 25, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: .35, ease: 'easeInOut', delay: index * .25 }}
            className={`bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] w-full max-w-[320px] mx-auto 
                        grid grid-rows-[auto_1fr_auto]`}>
            <div className={'w-full aspect-[4/3] relative'}>
                <Link href={`/product/${slug}`}>
                    <Image src={backendUrl + gallery[0].image.sizes.medium.url} alt={gallery[0].image.alt} fill
                           className={'object-cover relative'} placeholder={'blur'}
                           blurDataURL={gallery[0].image.blurHash}/>
                    {(action || bestSeller) && labels &&
                        <ProductLabels action={Boolean(action)} bestSeller={Boolean(bestSeller)}/>}
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
            </div>
            <div className={'mx-auto mb-3'}>
                {!inCart ? <AddToCartButton productId={product.id} quantity={1}/> : <AlreadyInCartButton/>}
            </div>
        </motion.div>
    );
}