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
            className={'max-w-[90%] my-4'}
            spaceBetween={20}
            navigation={true}
            breakpoints={{
                400: { slidesPerView: 1.2 },
                600: { slidesPerView: 2.3 },
                768: { slidesPerView: 3.3 },
                1024: { slidesPerView: 4.3 },
            }}
        >
            {products.map((product,index) => <SwiperSlide key={product.id}
                                                                        className={'flex h-auto'}>
                <ProductCard product={product} index={index} labels={labels}/>
            </SwiperSlide>)}
        </Swiper>
    );
}