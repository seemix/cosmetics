'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import FullScreenProductGallery from '@/components/ProductDetails/FullScreenProductGallery';
import { assets } from '@/config/assets';
import { useModal } from '@/hooks/useModal';
import type { ProductGallery } from '@/types/product';

export default function ProductGallerySlider({
	images,
}: {
	images: ProductGallery[];
}) {
	const { backendUrl } = assets;
	const [activeIndex, setActiveIndex] = useState(0);
	const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
	const { showModal } = useModal();

	return (
		<div
			className={`grid ${images.length > 1 ? 'grid-cols-[100px_1fr]' : 'grid-cols-[auto_1fr]'} 
                        max-w-[650px] gap-5 mx-auto`}
		>
			{/* Thumbnails: scroll independently, clicks drive the main slider. */}
			<Swiper
				direction={'vertical'}
				slidesPerView={'auto'}
				spaceBetween={12}
				mousewheel
				modules={[Mousewheel]}
				className={`h-[420px] w-auto [&_.swiper-wrapper]:flex [&_.swiper-wrapper]:justify-center
                            [&_.swiper-slide-thumb-active_img]:border-[var(--main)]
                            [&_.swiper-slide-thumb-active_img]:border-[2px]`}
			>
				{images.length > 1 &&
					images.map((img, i) => (
						<SwiperSlide key={img.image.id} className={'!h-auto'}>
							<div className={'swiper-zoom-container flex justify-center'}>
								<button
									type={'button'}
									aria-label={'product-gallery-thumbnails'}
									className={'simple aspect-square cursor-pointer'}
									onClick={() => mainSwiper?.slideTo(i)}
								>
									<Image
										width={90}
										height={90}
										placeholder={'empty'}
										src={backendUrl + img.image.sizes.thumbnail.url}
										alt={img.image.alt || ''}
										className={`
                                          object-contain cursor-pointer object-contain
                                          border transition-colors
                                            ${
																							activeIndex === i
																								? 'border-2 border-[var(--main)]'
																								: 'border border-gray-300 hover:border-[var(--main)]'
																						}`}
									/>
								</button>
							</div>
						</SwiperSlide>
					))}
			</Swiper>

			{/* Main image: the single source of the active index (thumbnails, full screen). */}
			<Swiper
				onSwiper={setMainSwiper}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				zoom
				modules={[Zoom]}
				className={'w-full max-w-[450px] lg:max-w-[380px] overflow-hidden'}
			>
				{images.map((img) => (
					<SwiperSlide key={img.image.id}>
						<div className={'swiper-zoom-container w-full aspect-square'}>
							<button
								type={'button'}
								aria-label={'product-gallery-image'}
								className={
									'simple-button w-full min-w-[380px] aspect-square cursor-pointer'
								}
								onClick={() =>
									showModal(
										<FullScreenProductGallery
											images={images}
											initialIndex={activeIndex}
										/>,
										'zoom',
									)
								}
							>
								<Image
									src={backendUrl + img.image.url}
									sizes={'(min-width: 1024px) 380px, 450px'}
									alt={img.image.alt || ''}
									placeholder={'blur'}
									blurDataURL={img.image.blurHash}
									className={'object-contain'}
									fill
								/>
							</button>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
