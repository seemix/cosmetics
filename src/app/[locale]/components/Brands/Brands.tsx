'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { BrandCard } from '@/app/[locale]/components';
import type { IBrand } from '@/app/[locale]/types/brand';

export default function Brands({ brands }: { brands: IBrand[] }) {

    return (
        <Swiper
            className={'max-w-[95%]'}
            spaceBetween={20}
            centeredSlides={false}
            slidesPerView={'auto'}
            navigation={true}
            watchOverflow={true}
            breakpoints={{
                400: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
        >
            {brands.map(brand => <SwiperSlide key={brand.id} style={{ width: '250px' }}>
                <BrandCard brand={brand}/>
            </SwiperSlide>)}
        </Swiper>
    );
}