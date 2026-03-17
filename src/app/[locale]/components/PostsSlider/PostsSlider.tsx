'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination } from 'swiper/modules';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { assets } from '@/app/[locale]/assets/assets';
import type { PostCard } from '@/app/[locale]/types/post-card';

export default function PostsSlider({ slides }: { slides: PostCard[] }) {
    return (
        <div className={'w-full overflow-hidden'}>
            <Swiper
                modules={[Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: false }}
                loop={true}
                pagination={{ clickable: true }}
                className={'w-full max-w-full'}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id} className={'w-full'}>
                        <Link href={`/news/${slide.slug}`} className={'block w-full'}>
                            <div className={'relative w-full overflow-hidden'}>
                                <div className={'block sm:hidden'}>
                                    <div className={'relative w-full aspect-square'}>
                                        <Image
                                            src={`${assets.backendUrl}${slide['square-slide'].url}`}
                                            placeholder={'blur'}
                                            blurDataURL={slide['square-slide'].blurHash}
                                            alt={slide.slide.alt || 'Mobile slide'}
                                            quality={90}
                                            fill
                                            priority={index === 0}
                                            sizes={'100vw'}
                                            className={'object-cover'}
                                        />
                                    </div>
                                </div>
                                <div className={'hidden sm:block'}>
                                    <div className={'relative w-full aspect-[1920/620]'}>
                                        <Image
                                            src={`${assets.backendUrl}${slide.slide.url}`}
                                            alt={slide.slide.alt || 'Desktop slide'}
                                            placeholder={'blur'}
                                            blurDataURL={slide.slide.blurHash}
                                            loading={'eager'}
                                            fill
                                            priority
                                            sizes={'100vw'}
                                            className={'object-cover'}
                                        />
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
