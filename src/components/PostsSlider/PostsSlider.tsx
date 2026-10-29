'use client';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@/i18n/navigation';

import 'swiper/css';
import 'swiper/css/pagination';
import ArtDirectedImage from '@/components/ArtDirectedImage/ArtDirectedImage';
import { assets } from '@/config/assets';
import type { PostCard } from '@/types/post-card';

export default function PostsSlider({ slides }: { slides: PostCard[] }) {
	return (
		<div className={'w-full overflow-hidden'}>
			<Swiper
				modules={[Pagination, Autoplay]}
				autoplay={{
					delay: 8000,
					disableOnInteraction: false,
					reverseDirection: false,
				}}
				loop={true}
				pagination={{ clickable: true }}
				className={'w-full max-w-full'}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={slide.id} className={'w-full'}>
						<Link
							href={
								slide.customLink
									? `/${slide.customLink}`
									: `/news/${slide.slug}`
							}
							className={'block w-full'}
						>
							<div className={'relative w-full overflow-hidden'}>
								<ArtDirectedImage
									mobile={{
										...slide['square-slide'],
										url: `${assets.backendUrl}${slide['square-slide'].url}`,
									}}
									desktop={{
										...slide.slide,
										url: `${assets.backendUrl}${slide.slide.url}`,
									}}
									alt={slide.slide.alt || 'Slide'}
									eager={index === 0}
								/>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
