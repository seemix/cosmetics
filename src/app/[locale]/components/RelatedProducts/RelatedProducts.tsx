'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';
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
            pagination={{ clickable: true }}
            breakpoints={{
                400: { slidesPerView: 1.5 },
                600: { slidesPerView: 2.5 },
                768: { slidesPerView: 3.5 },
                1024: { slidesPerView: 4.5 },
            }}
            modules={[Pagination]}
        >
            {products.map((product,index) => <SwiperSlide key={product.id}>
                <ProductCard product={product} index={index} labels={labels}/>
            </SwiperSlide>)}
        </Swiper>
    );
}