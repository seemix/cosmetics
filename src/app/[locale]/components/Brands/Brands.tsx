'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { BrandCard } from '@/app/[locale]/components';
import type { IBrand } from '@/app/[locale]/types/brand';

export default function Brands({ brands }: { brands: IBrand[] }) {
    return (
        <Swiper
            className={'max-w-[90%] border-0'}
            spaceBetween={20}
            centeredSlides={true}
            breakpoints={{
                400: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
        >
            {brands.map(brand => <SwiperSlide key={brand.id}>
                <BrandCard brand={brand}/>
            </SwiperSlide>)}
        </Swiper>
    );
}