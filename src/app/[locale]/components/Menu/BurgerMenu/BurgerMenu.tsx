import {
	CatalogMenu,
	CloseModalButton,
	HeadMenu,
	SocialIcons,
} from '@/app/[locale]/components';

export default function BurgerMenu() {
	return (
		<div
			className={
				'h-full px-5 grid grid-rows-[auto_1fr_auto] relative bg-white min-h-dvh'
			}
		>
			<CloseModalButton />
			<div className={'mt-5'}>
				<div className={'block sm:hidden'}>
					<HeadMenu />
				</div>
				<div className={'ml-5'}>
					<CatalogMenu />
				</div>
			</div>
			<div className={'mb-10 flex w-full justify-center'}>
				<SocialIcons />
			</div>
		</div>
	);
}
