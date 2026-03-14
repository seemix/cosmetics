'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { BrandCard } from '@/app/[locale]/components';
import type { IBrand } from '@/app/[locale]/types/brand';


export default function Brands({ brands }: { brands: IBrand[] }) {
    return (
        <div className={'max-w-xl mx-auto'}>
            <Swiper
                spaceBetween={20}
                centeredSlides={true}
                initialSlide={1}
                breakpoints={{
                    320: { slidesPerView: 2.5 },
                    400: { slidesPerView: 2.2},
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {brands.map(brand => (
                    <SwiperSlide
                        key={brand.id}
                        className={'h-70'}
                    >
                        <BrandCard brand={brand}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}