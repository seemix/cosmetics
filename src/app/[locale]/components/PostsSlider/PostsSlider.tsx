'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslations } from 'next-intl';

import { Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { assets } from '@/app/[locale]/assets/assets';
import type { PostCard } from '@/app/[locale]/types/post-card';

export default function PostsSlider({ slides }: { slides: PostCard[] }) {
    const t = useTranslations('StaticPages');

    return (
        <div className={'w-full overflow-hidden'}>
            <Swiper
                modules={[Pagination, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                className={'w-full max-w-full'}
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id} className={'max-w-full mySwiper'}>
                        <div className={'relative w-full h-[620px] overflow-hidden'}>
                            <Image
                                src={`${assets.backendUrl}${slide.slide.url}`}
                                alt={slide.slide.alt}
                                fill
                                className={'object-cover'}
                            />
                            <motion.div
                                initial={{ opacity: '0', y: -15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: .4, ease: 'easeInOut', delay: 0 }}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 text-white 
                                             md:w-3xl w-md bg-black/70 p-6 text-md md:text-lg`}>
                                <motion.p
                                    initial={{ opacity: 0, filter: 'blur(3px)', y: 15 }}
                                    whileInView={{ opacity: 1, filter: 'blur(0)', y: 0 }}
                                    transition={{ duration: .5, ease: 'easeInOut', delay: .5 }}
                                >
                                    {slide.excerpt}
                                </motion.p>
                                <div className={'flex w-full justify-end'}>
                                    <Link href={`/news/${slide.slug}`}>
                                        <button type={'button'}
                                                className={'bg-[var(--main)] px-3 py-1 mt-3 text-black cursor-pointer ml-3'}>
                                            {t('readMore')}
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
