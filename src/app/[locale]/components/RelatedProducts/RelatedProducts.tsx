'use client';

import type { IProduct } from '@/app/[locale]/types/product';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { ProductCard } from '@/app/[locale]/components';

export default function RelatedProducts({ products, labels }: { products: IProduct[], labels: boolean }) {
    return (
        <Swiper
            className={'max-w-[90%] my-4'}
            spaceBetween={20}
            navigation={true}
            // pagination={{ clickable: true }}
            breakpoints={{
                400: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            modules={[Navigation]}
        >
            {products.map((product,index) => <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} labels={labels}/>
            </SwiperSlide>)}
        </Swiper>
    );
}