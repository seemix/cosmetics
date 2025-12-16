'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Thumbs, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import { assets } from '@/app/[locale]/assets/assets';
import type { ProductGallery } from '@/app/[locale]/types/product';
import { useModal } from '@/app/[locale]/hooks/useModal';
import FullScreenProductGallery from '@/app/[locale]/components/ProductDetails/FullScreenProductGallery';

export default function ProductGallerySlider({ images }: { images: ProductGallery[] }) {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const { backendUrl } = assets;
    const { showModal } = useModal();

    return (
        <div className={`grid grid-cols-[100px_1fr] gap-5 max-w-[650px] mx-auto`}>
            {/* Thumbnails */}
            <Swiper
                onSwiper={setThumbsSwiper}
                direction="vertical"
                slidesPerView="auto"
                spaceBetween={12}
                zoom={{ maxRatio: 2.5 }}
                mousewheel
                modules={[Thumbs, Mousewheel]}
                className={`h-[420px] [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:justify-center
                            [&_.swiper-slide-thumb-active_img]:border-[var(--main)]
                            [&_.swiper-slide-thumb-active_img]:border-[2px]`}
            >
                {images.length > 1 && images.map(img => (
                    <SwiperSlide key={img.image.id} className={'!h-auto'}>
                        <div className={'swiper-zoom-container flex justify-center'} >
                            <img
                                src={backendUrl + img.image.url}
                                alt={img.image.alt || ''}
                                className={`w-[80px] h-[80px] object-contain cursor-pointer border border-gray-300
                                            transition-colors hover:border-[var(--main)] `}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Main image */}
            <Swiper
                zoom
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Zoom, Thumbs]}
                className={'w-full max-w-[450px] lg:max-w-[380px] overflow-hidden'}
            >
                {images.map(img => (
                    <SwiperSlide key={img.image.id}>
                        <div className={'swiper-zoom-container'}>
                            <img
                                onClick={() => showModal(<FullScreenProductGallery images={images}/>,'zoom')}
                                src={backendUrl + img.image.url}
                                alt={img.image.alt || ''}
                                className={'object-contain transition-transform duration-400 hover:scale-120 cursor-zoom-in'}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/*<button onClick={() => showModal(<FullScreenProductGallery images={images}/>,'zoom')}>click me!</button>*/}
        </div>
    );
}

