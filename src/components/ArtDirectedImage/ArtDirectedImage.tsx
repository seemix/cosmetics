import { getImageProps } from 'next/image';

type SlideImage = { url: string; alt?: string; blurHash?: string };

/**
 * Square image on phones, wide banner from the `sm` breakpoint (640px).
 * A single <picture> lets the browser download only the variant it shows,
 * where two `<Image>`s hidden with CSS would both be fetched.
 */
export default function ArtDirectedImage({
	mobile,
	desktop,
	alt,
	eager = false,
}: {
	mobile: SlideImage;
	desktop: SlideImage;
	alt: string;
	/** Above-the-fold image: loads immediately with high priority. */
	eager?: boolean;
}) {
	const common = { alt, fill: true, sizes: '100vw' } as const;
	const {
		props: { srcSet: desktopSrcSet },
	} = getImageProps({ ...common, src: desktop.url });
	const { props: mobileProps } = getImageProps({
		...common,
		src: mobile.url,
		placeholder: mobile.blurHash ? 'blur' : 'empty',
		blurDataURL: mobile.blurHash,
		loading: eager ? 'eager' : 'lazy',
		fetchPriority: eager ? 'high' : undefined,
	});

	return (
		<div className={'relative w-full aspect-square sm:aspect-[1920/620]'}>
			<picture>
				<source
					media={'(min-width: 640px)'}
					srcSet={desktopSrcSet}
					sizes={'100vw'}
				/>
				{/* biome-ignore lint/a11y/useAltText: alt is part of mobileProps */}
				<img {...mobileProps} className={'object-cover'} />
			</picture>
		</div>
	);
}
