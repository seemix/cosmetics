'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BrandCard } from '@/app/[locale]/components';
import { IBrand } from '@/app/[locale]/types/brand';

export default function Brands({ brands }: { brands: IBrand[] }) {
    return (
        <Swiper
            className={'max-w-[90%]'}
            spaceBetween={20}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
                400: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
            }}
            modules={[Pagination, Navigation]}
        >
            {brands.map(brand => <SwiperSlide key={brand.id}>
                <BrandCard brand={brand}/>
            </SwiperSlide>)}
        </Swiper>
    );
}