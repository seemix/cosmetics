'use client';

import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { assets } from '@/app/[locale]/assets/assets';
import {
    AddToCartButton, AlreadyInCartButton,
    ProductGallerySlider,
    Quantity, RelatedProducts,
} from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { usePathname, useRouter } from 'next/navigation';

export default function ProductDetails({
                                           product,
                                       }: {
    product: IProduct;
}) {
    const router = useRouter();
    const t = useTranslations('Catalog');
    const { cart } = useCartStore();
    const{ user } = useAuthStore();

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
        brand,
    } = product;
    const { currency, backendUrl } = assets;
    const [value, setValue] = useState<number>(1);
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
        <div className={'grid grid-cols-[1fr] lg:grid-cols-[auto_1fr] gap-6'}>
            <ProductGallerySlider images={gallery}/>
            <div>
                <div className={'flex gap-4 items-center w-full justify-between'}>
                    <div>
                        <h2 className={'text-2xl lg:text-3xl font-bold leading-10 lg:leading-15 mt-3'}>
                            {' '}
                            {title}
                        </h2>
                        <h3 className={'text-md lg:text-[1.2em] leading-8 lg:leading-12'}>
                            {subtitle}
                        </h3>
                    </div>
                    <Link href={`../brand/${brand?.slug}`} className={'w-28 aspect-video relative'}>
                        <Image
                            className={'object-contain'}
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
                    <div className={'mt-2 flex items-center'}>
						<span className={`${wholesalePrice ? 'text-xl' : 'text-2xl'} 
						                   font-bold text-[var(--main)] leading-15`}>
							{retailPrice} {currency}
						</span>
                        {wholesalePrice && (
                            <span className={'text-2xl font-bold text-green-500 leading-15 ml-4'}>
							{wholesalePrice} {currency}
						</span>
                        )}
                    </div>
                    <div className={'flex gap-4 mt-2 items-end'}>
                        {!inCart ? (<><Quantity value={value} setValue={setValue}/>
                            <AddToCartButton productId={product.id} quantity={value}/></>) :
                            (<>
                                <div className={'w-0 lg:w-30'}></div>
                                <AlreadyInCartButton/>
                            </>)}
                    </div>
                </div>
            </div>
            <div className={'lg:col-span-2 text-sm'}>
                {description && <RichText data={description} className={'description-text'}/>}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                cupiditate ex fuga impedit laudantium, nam pariatur possimus suscipit.
                Consequuntur id nesciunt omnis provident reprehenderit? Ab accusantium
                mollitia officiis sequi totam?
            </div>
            {product.relatedProducts &&
                <div className={'lg:col-span-2'}>
                    <h2 className={'text-2xl font-bold mb-4'}>{t('relatedProducts')}</h2>
                    <RelatedProducts products={product.relatedProducts}/>
                </div>
            }
        </div>
    );
}
