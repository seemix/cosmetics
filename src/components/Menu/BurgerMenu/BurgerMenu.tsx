import { useTranslations } from 'next-intl';
import SocialIcons from '@/components/Header/SocialIcons';
import CatalogMenu from '@/components/Menu/CatalogMenu/CatalogMenu';
import HeadMenu from '@/components/Menu/HeadMenu';
import CloseModalButton from '@/components/ModalWindow/CloseModalButton';

/**
 * Mobile drawer: fixed title bar, a scrollable middle (catalog + info pages)
 * and the contacts pinned to the bottom.
 */
export default function BurgerMenu() {
	const t = useTranslations('Header');

	return (
		<div className={'flex flex-col h-dvh w-[86vw] max-w-sm bg-white'}>
			<div
				className={
					'flex shrink-0 items-center justify-between gap-4 pl-5 pr-3 h-16 border-b border-gray-200'
				}
			>
				<span className={'text-base font-semibold uppercase tracking-[0.15em]'}>
					{t('catalog')}
				</span>
				<div className={'w-auto'}>
					<CloseModalButton />
				</div>
			</div>

			<div className={'flex-1 overflow-y-auto overscroll-contain px-5'}>
				<CatalogMenu />
				<div className={'sm:hidden py-4'}>
					<HeadMenu variant={'drawer'} />
				</div>
			</div>

			<div
				className={'flex shrink-0 justify-center border-t border-gray-200 py-4'}
			>
				<SocialIcons />
			</div>
		</div>
	);
}
