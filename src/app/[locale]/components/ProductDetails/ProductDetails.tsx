'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { assets } from '@/app/[locale]/assets/assets';
import {
    AddToCartButton, AlreadyInCartButton, FavoriteButton,
    ProductGallerySlider, ProductLabels,
    Quantity, RelatedProducts,
} from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useAuthPrices } from '@/app/[locale]/hooks/useAuthPrices';

export default function ProductDetails({
                                           product,
                                       }: {
    product: IProduct;
}) {
    const t = useTranslations('Catalog');
    const { cart } = useCartStore();
    const { user } = useAuthStore();

    const inCart = cart?.items?.some((item) => item.id === product.id) as boolean;

    const {
        gallery,
        article,
        shortDescription,
        description,
        title,
        subtitle,
        retailPrice,
        wholesalePrice,
        unavailable,
        brand,
    } = product;
    const { currency, backendUrl } = assets;
    const [value, setValue] = useState<number>(1);

    useAuthPrices(user);

    return (
        <div className={'grid grid-cols-[1fr] lg:grid-cols-[auto_1fr] gap-6'}>
            <div className={'relative'}>
                <ProductGallerySlider images={gallery}/>
                <ProductLabels action={Boolean(product.action)} bestSeller={Boolean(product.bestSeller)}/>
                <div className={'absolute top-7 right-3 z-5'}>
                    <FavoriteButton productId={product.id}/>
                </div>
            </div>
            <div>
                <div className={'flex gap-4 items-center w-full justify-between'}>
                    <div>
                        <h2 className={'text-2xl lg:text-3xl font-bold leading-6 my-3'}>
                            {title}
                        </h2>
                        <h3 className={'text-md lg:text-[1.2em] leading-8 lg:leading-12'}>
                            {subtitle}
                        </h3>
                    </div>
                    <Link href={`../brand/${brand?.slug}`} className={'w-28 aspect-video relative'}>
                        <Image
                            className={'object-contain coverfixed '}
                            src={backendUrl + brand?.logo.url}
                            alt={'brand logo'}
                            fill
                        />
                    </Link>
                </div>
                <h4 className={'text-lg text-gray-500 leading-10'}>
                    {t('article')}: {article}
                </h4>
                <p className={'text-[.95em] mt-2'}>{shortDescription}</p>
                <div className={'w-full flex flex-col items-center lg:items-start'}>
                    {!unavailable && <div className={'mt-2 flex items-center'}>
						<span className={`${wholesalePrice ? 'text-xl' : 'text-2xl'} 
						                   font-bold text-[var(--main)] leading-15`}>
							{retailPrice} {currency}
						</span>
                        {wholesalePrice && (
                            <span className={'text-2xl font-bold text-green-500 leading-15 ml-4'}>
							{wholesalePrice} {currency}
						</span>
                        )}
                    </div>}
                    {!unavailable ? (
                        <div className={'flex gap-4 mt-2 items-end'}>
                            {!inCart ? (<><Quantity value={value} setValue={setValue}/>
                                    <AddToCartButton productId={product.id} quantity={value}/></>) :
                                (<>
                                    <div className={'w-0 lg:w-30'}></div>
                                    <AlreadyInCartButton/>
                                </>)}
                        </div>) : (<p className={'text-xl font-semibold text-gray-500 mt-4 '}>
                        {t('notAvailable')}
                    </p>)}
                </div>
            </div>
            <div className={'lg:col-span-2 text-sm'}>
                {description && <RichText data={description} className={'description-text'}/>}
            </div>
            {product.relatedProducts &&
                <div className={'lg:col-span-2'}>
                    <h2 className={'text-2xl font-bold mb-4'}>{t('relatedProducts')}</h2>
                    <RelatedProducts products={product.relatedProducts} labels={false}/>
                </div>
            }
        </div>
    );
}
