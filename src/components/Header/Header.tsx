import BurgerButton from '@/components/Header/BurgerButton';
import CartButton from '@/components/Header/CartButton';
import CatalogButton from '@/components/Header/CatalogButton';
import FavoritesButton from '@/components/Header/FavoritesButton';
import LanguageSwitcher from '@/components/Header/LanguageSwitcher';
import Logo from '@/components/Header/Logo';
import SearchBar from '@/components/Header/SearchBar';
import SearchField from '@/components/Header/SearchField';
import SocialIcons from '@/components/Header/SocialIcons';
import UserButtonWrapper from '@/components/Header/UserButtonWrapper';
import HeadMenu from '@/components/Menu/HeadMenu';

export default function Header() {
	return (
		<div className={'fixed bottom-0 left-0 sm:relative w-full z-20'}>
			<div className={'hidden sm:flex bg-gray-100 py-2 justify-evenly'}>
				<div className={'flex px-4 gap-4 w-full lg:w-[1100px] justify-between'}>
					<SocialIcons />
					<HeadMenu />
					<LanguageSwitcher />
				</div>
			</div>
			<header
				className={
					'relative bg-foreground w-full py-3 px-6 text-black border-t border-gray-300 sm:border-t-0'
				}
			>
				<div
					className={
						'flex items-center justify-between gap-4 lg:gap-6 max-w-[1200px] w-full mx-auto'
					}
				>
					{/* Mobile / tablet: burger (+ language on phones). */}
					<div className={'flex gap-7 sm:gap-4 items-center md:hidden'}>
						<BurgerButton />
						<div className={'sm:hidden'}>
							<LanguageSwitcher />
						</div>
					</div>
					<div className={'hidden sm:block shrink-0'}>
						<Logo />
					</div>
					{/* Desktop: catalog button + inline search. */}
					<div className={'hidden md:block shrink-0'}>
						<CatalogButton />
					</div>
					{/* The field is centred in the free space, so its left and right gaps match. */}
					<div className={'hidden md:block flex-1 min-w-0'}>
						<div className={'max-w-md mx-auto'}>
							<SearchField />
						</div>
					</div>
					<div className={'flex items-center gap-8 sm:gap-5 shrink-0'}>
						<div className={'flex md:hidden'}>
							<SearchBar />
						</div>
						<FavoritesButton />
						<UserButtonWrapper />
						<CartButton />
					</div>
				</div>
			</header>
		</div>
	);
}
