'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import { assets } from '@/app/[locale]/assets/assets';
import { useModal } from '@/app/[locale]/hooks/useModal';
import type { ProductGallery } from '@/app/[locale]/types/product';

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

    useEffect(() => {
        if (mainSwiper) {
            mainSwiper.slideTo(initialIndex, 0);
        }
    }, [initialIndex, mainSwiper]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                hideModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [hideModal]);

    return (
        <div className={'fixed inset-0 z-50 flex flex-col'} onClick={hideModal} aria-hidden={'true'}>
            {/* CLOSE */}
            <button
                type={'button'}
                aria-label={'close gallery'}
                onClick={hideModal}
                className={`absolute right-2 top-0 z-50 text-white transition-colors duration-300 
                            hover:text-[var(--main)] text-7xl cursor-pointer`}
            >
                ×
            </button>
            {images.length > 1 && (
                <>
                    <button
                        type={'button'}
                        aria-label={'Previous image'}
                        onClick={(e) => {
                            e.stopPropagation();
                            mainSwiper?.slidePrev();
                            setActiveIndex(Number(mainSwiper?.realIndex));
                        }}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center
                            text-white text-8xl hover: transition-colors duration-300 hover:text-[var(--main)]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer`}
                    >
                        ‹
                    </button>
                    <button
                        type={'button'}
                        aria-label={'Next image'}
                        onClick={(e) => {
                            e.stopPropagation();
                            mainSwiper?.slideNext();
                            setActiveIndex(Number(mainSwiper?.realIndex));
                        }}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 flex items-center justify-center
                            text-white text-8xl hover: transition-colors duration-300 hover:text-[var(--main)]
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer`}
                    >
                        ›
                    </button>
                </>
            )}

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
                className={'flex-1 w-full'}
            >
                {images.map((img) => (
                    <SwiperSlide key={img.image.id}>
                        <div className={'swiper-zoom-container flex items-center justify-center'}>
                            <Image
                                //  onClick={e => e.stopPropagation()}
                                src={backendUrl + img.image.url}
                                alt={img.image.alt || ''}
                                placeholder={'blur'}
                                quality={95}
                                blurDataURL={img.image.blurHash}
                                fill
                                className={'object-contain'}
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
                    loop={images.length > 1}
                    spaceBetween={12}
                    modules={[Thumbs]}
                    className={'h-[80px] px-6 py-4 mt-2'}
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={img.image.id} className={'!w-[80px]'}>
                            <button
                                type={'button'}
                                aria-label={'gallery thumbnail'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(i);
                                    mainSwiper?.slideTo(i);
                                }}
                                className={'simple-button aspect-square cursor-pointer'}
                            >
                                <Image
                                    src={backendUrl + img.image.url}
                                    alt={img.image.alt || ''}
                                    width={90}
                                    height={90}
                                    quality={95}
                                    onClick={e => e.stopPropagation()}
                                    className={`object-contain border transition-colors
                                              ${
                                        activeIndex === i
                                            ? 'border-2 border-[var(--main)]'
                                            : 'border border-gray-500 hover:border-[var(--main)]'
                                    }`}
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
