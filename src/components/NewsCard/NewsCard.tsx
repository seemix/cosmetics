import ArtDirectedImage from '@/components/ArtDirectedImage/ArtDirectedImage';
import { assets } from '@/config/assets';
import { Link } from '@/i18n/navigation';
import type { PostCard } from '@/types/post-card';

export default function NewsCard({
	post,
	locale,
	eager = false,
}: {
	post: PostCard;
	locale: string;
	/** The first card is above the fold. */
	eager?: boolean;
}) {
	const { title, slide, slug, customLink } = post;
	const { backendUrl } = assets;
	const date = new Date(post.createdAt);
	const formattedDate = new Intl.DateTimeFormat(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);

	return (
		<div
			className={'w-full my-2 p-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]'}
		>
			<div>
				<p className={'text-gray-500 text-right text-sm'}>{formattedDate}</p>
				<h3 className={'text-xl text-center mb-4 font-semibold'}>{title}</h3>
			</div>
			<Link href={customLink ? `/${customLink}` : `/news/${slug}`}>
				<ArtDirectedImage
					mobile={{
						...post['square-slide'],
						url: `${backendUrl}${post['square-slide'].url}`,
					}}
					desktop={{ ...slide, url: `${backendUrl}${slide.url}` }}
					alt={slide.alt || 'Slide'}
					eager={eager}
				/>
			</Link>
		</div>
	);
}
