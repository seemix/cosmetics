'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { BrandCard } from '@/app/[locale]/components';
import type { IBrand } from '@/app/[locale]/types/brand';

export default function Brands({ brands }: { brands: IBrand[] }) {

    return (
        <Swiper
            className={'max-w-[1100px] w-fit mx-auto'}
            spaceBetween={20}
            watchOverflow={true}
            centeredSlides={true}
            initialSlide={1}
            breakpoints={{
                400: { slidesPerView: 2.7 },
                600: { slidesPerView: 3 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
        >
            {brands.map(brand => <SwiperSlide key={brand.id} style={{width: 150, height: 120}}>
                <BrandCard brand={brand}/>
            </SwiperSlide>)}
        </Swiper>
    );
}