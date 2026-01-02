import { RichText } from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { assets } from '@/app/[locale]/assets/assets';
import {
    AddToBasketButton,
    ProductGallerySlider,
    Quantity, RelatedProducts,
} from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';

export default async function ProductDetails({
                                                 product,
                                             }: {
    product: IProduct;
}) {
    const t = await getTranslations('Catalog');
    const {
        gallery,
        article,
        shortDescription,
        description,
        title,
        subtitle,
        price,
        wholesale,
        brand,
    } = product;
    const { currency, backendUrl } = assets;

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
                    <Link href={`..//brand/${brand.slug}`} className={'w-28 aspect-video relative'}>
                        <Image
                            className={'object-contain'}
                            src={backendUrl + brand.logo.url}
                            alt={'brand logo'}
                            fill
                            // unoptimized
                        />
                    </Link>
                </div>
                <h4 className={'text-lg text-gray-500 leading-10'}>
                    {t('article')}: {article}
                </h4>
                <p className={'text-[.95em] mt-2'}>{shortDescription}</p>
                <div className={'w-full flex flex-col items-center lg:items-start'}>
                    <div className={'mt-2'}>
						<span className={'text-2xl font-bold text-[var(--main)] leading-15'}>
							{price} {currency}
						</span>
                        <span className={'text-2xl font-bold text-green-500 leading-15 ml-4'}>
							{wholesale} {currency}
						</span>
                    </div>
                    <div className={'flex gap-4 mt-2 items-end'}>
                        <Quantity/>
                        <AddToBasketButton/>
                    </div>
                </div>
            </div>
            <div className={'lg:col-span-2 text-sm'}>
                <RichText data={description} className={'description-text'}/>
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
