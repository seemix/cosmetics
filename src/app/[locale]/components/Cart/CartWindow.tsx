import { CartItem, CloseModalButton } from '@/app/[locale]/components';

export default function CartWindow() {
	const products = [
        {
            id: "692dadc51e3b32b700a79163",
            title: "Clay 70g",
            subtitle: "Așezarea argilei",
            slug: 'clay-70g',
            price: 120,
            quantity: 2,
            thumbnail: "/api/media/file/FUllSize_Travel-CC-1-96x96.webp"
        },
        {
            id: "69389115f3dcee46ed8433b9",
            title: "DAILY SHAMPOO",
            subtitle: "ȘAMPON ZILNIC 400 ML",
            slug: 'daily-shampoo',
            price: 320,
            quantity: 1,
            thumbnail: "/api/media/file/ds1-1-96x96.webp"
        }
    ]

    return (
		<div className={'h-screen bg-background text-black max-w-140'}>
			<CloseModalButton />
			<h2 className={'text-xl text-black text-center font-bold -my-3'}>
				Корзина
			</h2>
            {
                products.map((product => <CartItem key={product.id} product={product} />))
            }
			{/*<div*/}
			{/*	className={'border-b border-gray-300 flex items-center gap-2 mx-4 my-2'}*/}
			{/*>*/}
			{/*	<Image*/}
			{/*		src={*/}
			{/*			'https://barbercompany.com/image/cache/wp/gj/2024/12-24/nishman-beard-hair-milk-therapy-conditioner-400-ml-1000x1000.webp'*/}
			{/*		}*/}
			{/*		alt={'product'}*/}
			{/*		width={80}*/}
			{/*		height={80}*/}
			{/*	/>*/}
			{/*	<div>*/}
			{/*		<p className={'text-black text-xs'}>*/}
			{/*			{' '}*/}
			{/*			Nishman Beard & Hair Milk Therapy Conditioner 400 мл*/}
			{/*		</p>*/}
			{/*		<p className={'text-center'}>590 MDL</p>*/}
			{/*	</div>*/}
			{/*	<div className={'flex gap-2 items-center border-1 border-gray-400'}>*/}
			{/*		<button*/}
			{/*			className={'rounded p-2 cursor-pointer text-lg'}*/}
			{/*			type={'button'}*/}
			{/*		>*/}
			{/*			-*/}
			{/*		</button>*/}
			{/*		<p>222</p>*/}
			{/*		<button*/}
			{/*			className={'rounded p-2 cursor-pointer text-lg'}*/}
			{/*			type={'button'}*/}
			{/*		>*/}
			{/*			+*/}
			{/*		</button>*/}
			{/*	</div>*/}
			{/*	<div>*/}
			{/*		<button className={'cursor-pointer'} type={'button'}>*/}
			{/*			<MdDeleteOutline className={'w-8 sm:w-6 h-auto'} />*/}
			{/*		</button>*/}
			{/*	</div>*/}
			{/*</div>*/}
			{/*<div className={'border-b border-gray-300 flex items-center gap-2 mx-4'}>*/}
			{/*	<Image*/}
			{/*		src={*/}
			{/*			'https://barbercompany.com/image/cache/wp/gj/Morgans%20/kondicioner-dlja-volos-morgans-mens-conditioner-1000-ml-1000x1000.webp'*/}
			{/*		}*/}
			{/*		alt={'product'}*/}
			{/*		width={80}*/}
			{/*		height={80}*/}
			{/*	/>*/}
			{/*	<div>*/}
			{/*		<p className={'text-black text-xs'}>*/}
			{/*			Кондиціонер для волосся Morgan`s Men`s Conditioner 1000 мл*/}
			{/*		</p>*/}
			{/*		<p className={'text-center'}>690 MDL</p>*/}
			{/*	</div>*/}
			{/*	<div className={'flex gap-2 items-center border-1 border-gray-400'}>*/}
			{/*		<button*/}
			{/*			className={'rounded p-2 cursor-pointer text-lg'}*/}
			{/*			type={'button'}*/}
			{/*		>*/}
			{/*			-*/}
			{/*		</button>*/}
			{/*		<p>110</p>*/}
			{/*		<button*/}
			{/*			className={'rounded p-2 cursor-pointer text-lg'}*/}
			{/*			type={'button'}*/}
			{/*		>*/}
			{/*			+*/}
			{/*		</button>*/}
			{/*	</div>*/}
			{/*	<div>*/}
			{/*		<button className={'cursor-pointer'} type={'button'}>*/}
			{/*			<MdDeleteOutline className={'w-8 sm:w-6 h-auto'} />*/}
			{/*		</button>*/}
			{/*	</div>*/}
			{/*</div>*/}
		</div>
	);
}
