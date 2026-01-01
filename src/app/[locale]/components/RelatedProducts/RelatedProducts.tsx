'use client';

import type { IProduct } from '@/app/[locale]/types/product';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { ProductCard } from '@/app/[locale]/components';

export default function RelatedProducts({ products }: { products: IProduct[] }) {
    return (
        <Swiper
            spaceBetween={20}
            pagination={{ clickable: true }}
            breakpoints={{
                400: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            modules={[Pagination]}
        >
            {products.map(product => <SwiperSlide key={product.id}>
                <ProductCard product={product}/>
            </SwiperSlide>)}
        </Swiper>
    );
}