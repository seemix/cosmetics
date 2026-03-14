'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ProductCard } from '@/app/[locale]/components';
import type { IProduct } from '@/app/[locale]/types/product';

export default function RelatedProducts({ products, labels }: { products: IProduct[], labels: boolean }) {
    return (
        <Swiper
            className={'max-w-[98%] my-4'}
            spaceBetween={20}
            navigation={true}
            breakpoints={{
                320: { slidesPerView: 1.5 },
                400: { slidesPerView: 1.8 },
                600: { slidesPerView: 3.3 },
                768: { slidesPerView: 3.9 },
                1024: { slidesPerView: 4.3 },
            }}
        >
            {products.map((product, index) => <SwiperSlide key={product.id}
                                                           className={'flex h-auto'}>
                <div className={'h-112'}><ProductCard product={product} index={index} labels={labels}/></div>
            </SwiperSlide>)}
        </Swiper>
    );
}