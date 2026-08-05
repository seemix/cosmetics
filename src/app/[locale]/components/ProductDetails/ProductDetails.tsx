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
        id,
        action,
        bestSeller,
        gallery,
        article,
        shortDescription,
        description,
        title,
        subtitle,
        retailPrice,
        wholesalePrice,
        discountPrice,
        unavailable,
        brand,
        relatedProducts,
    } = product;
    const { currency, backendUrl } = assets;
    const [value, setValue] = useState<number>(1);

    useAuthPrices(user);

    return (
        <div className={'grid grid-cols-[1fr] lg:grid-cols-[auto_1fr] gap-6'}>
            <div className={'relative'}>
                <ProductGallerySlider images={gallery}/>
                <ProductLabels action={Boolean(action)} bestSeller={Boolean(bestSeller)}/>
                <div className={'absolute top-7 right-3 z-5'}>
                    <FavoriteButton productId={id}/>
                </div>
            </div>
            <div>
                <div className={'flex gap-4 items-center w-full justify-between'}>
                    <div>
                        <h2 className={'text-2xl lg:text-[1.6em] font-bold leading-10 my-3'}>
                            {title}
                        </h2>
                        <h3 className={'text-md lg:text-[1.2em] leading-8 lg:leading-12'}>
                            {subtitle}
                        </h3>
                    </div>
                    <Link href={`../brand/${brand?.slug}`} className={'w-28 aspect-video relative'}>
                        <Image
                            className={'object-cover object-center fixed'}
                            src={backendUrl + brand?.logo.url}
                            quality={95}
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
                    {!unavailable && <div className={'w-full flex flex-col items-center lg:items-start'}>
                        {!unavailable && (
                            <div className={'mt-2 flex items-center gap-2'}>
                                <span
                                    className={`font-semibold text-[var(--main)] 
                                    ${wholesalePrice ? 'text-lg  text-[var(--main)]' : 'text-2xl'}`}>
                                 {retailPrice} {currency}
                                </span>

                                {wholesalePrice && (
                                    <span
                                        className={discountPrice ? 'line-through text-gray-400 font-semibold text-lg' :
                                            'text-2xl font-bold text-green-500'}>
                                  {wholesalePrice} {currency}
                                 </span>
                                )}

                                {discountPrice && (
                                    <span className={'text-2xl font-bold text-green-500'}>
                                {discountPrice} {currency}
                              </span>
                                )}
                            </div>
                        )}
                    </div>}

                    {!unavailable ? (
                        <div className={'flex gap-4 mt-4 items-end'}>
                            {!inCart ? (<><Quantity value={value} setValue={setValue}/>
                                    <AddToCartButton productId={product.id} quantity={value}/></>) :
                                (<>
                                    <div className={'w-0 lg:w-30'}></div>
                                    <AlreadyInCartButton/>
                                </>)}
                        </div>) : (<p className={'text-xl font-semibold text-gray-500 mt-4'}>
                        {t('notAvailable')}
                    </p>)}
                </div>
            </div>
            <div className={'lg:col-span-2 text-sm'}>
                {description && <RichText data={description} className={'description-text'}/>}
            </div>
            {relatedProducts &&
                <div className={'lg:col-span-2'}>
                    <h2 className={'text-2xl font-bold mb-4'}>{t('relatedProducts')}</h2>
                    <RelatedProducts products={relatedProducts} labels={false}/>
                </div>
            }
        </div>
    );
}
