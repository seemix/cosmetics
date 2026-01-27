import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { assets } from '../assets/assets';

const ItemCard = async () => {
	const t = await getTranslations('HomePage');

	return (
		<div
			className={
				'p-2 border border-[#ddd] hover:border-1 hover:border-[#ccc] max-h-110 grid grid-rows-[auto_1fr_auto]'
			}
		>
			<Image
				src={
					'https://barbercompany.com/image/cache/wp/gj/product/2017-04-truefitt-hill-edwardian-collection-mach-3-ebony-250x300.webp'
				}
				alt={'some-alt'}
				width={200}
				height={250}
			/>
			<h3 className={'text-center tracking-wide'}>Some caption</h3>
			<h2 className={'mb-2 text-2xl text-center tracking-wide'}>
				5000 {assets.currency}
			</h2>
			<button className="flex cursor-pointer overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background shadow hover:bg-black/90 h-9 px-4 py-2 whitespace-pre md:flex group relative w-full justify-center gap-2  transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2">
				<span className="ml-1 text-white tracking-wide">{t('toCart')}</span>
			</button>
		</div>
	);
};

export default ItemCard;
