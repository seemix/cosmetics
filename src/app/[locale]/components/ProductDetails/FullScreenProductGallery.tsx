'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Thumbs, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import { assets } from '@/app/[locale]/assets/assets';
import type { ProductGallery } from '@/app/[locale]/types/product';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function ProductGalleryModal({
                                                images,
                                                initialIndex = 0,
                                            }: {
    images: ProductGallery[];
    initialIndex?: number;
}) {
    const { backendUrl } = assets;
    const { hideModal } = useModal();

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="fixed inset-0 z-50 flex flex-col">

            {/* CLOSE */}
            <button
                type="button"
                aria-label="close gallery"
                onClick={hideModal}
                className={`absolute right-2 top-1 z-50 text-white transition-colors duration-300 
                            hover:text-[var(--main)] text-7xl cursor-pointer`}>
                ×
            </button>

            {/* MAIN IMAGE */}
            <Swiper
                onSwiper={(swiper) => {
                    setMainSwiper(swiper);
                    swiper.slideTo(initialIndex, 0);
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                initialSlide={initialIndex}
                zoom
                keyboard
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Zoom, Thumbs, Keyboard]}
                className="flex-1 w-full"
            >
                {images.map((img) => (
                    <SwiperSlide key={img.image.id}>
                        <div className="swiper-zoom-container flex items-center justify-center">
                            <Image
                                src={backendUrl + img.image.url}
                                alt={img.image.alt || ''}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* THUMBNAILS BOTTOM */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView="auto"
                    spaceBetween={12}
                    modules={[Thumbs]}
                    className="h-[80px] px-6 py-4 mt-2"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={img.image.id} className="!w-[80px]">
                            <button
                                type="button"
                                aria-label="gallery thumbnail"
                                onClick={() => {
                                    setActiveIndex(i);
                                    mainSwiper?.slideTo(i);
                                }}
                                className="aspect-square cursor-pointer"
                            >
                                <Image
                                    src={backendUrl + img.image.url}
                                    alt={img.image.alt || ''}
                                    width={80}
                                    height={80}
                                    className={`object-contain border transition-colors
                                              ${activeIndex === i
                                            ? 'border-2 border-[var(--main)]'
                                            : 'border border-gray-500 hover:border-[var(--main)]' }`}
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
