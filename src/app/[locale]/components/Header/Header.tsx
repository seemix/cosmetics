import {
    BurgerButton,
    CartButton,
    CatalogMenu,
    HeadMenu,
    LanguageSwitcher,
    Logo,
    SearchBar,
    SocialIcons, UserButtonWrapper,
} from '@/app/[locale]/components';

export default async function Header() {
    return (
        <div className={'fixed bottom-0 left-0 sm:relative w-full z-20'}>
            <div className={'hidden sm:flex bg-gray-100 py-2 justify-evenly'}>
                <div className={'flex px-4 gap-4 w-full lg:w-[1100px] justify-between'}>
                    <SocialIcons/>
                    <HeadMenu/>
                    <LanguageSwitcher/>
                </div>
            </div>
            <header className={`bg-foreground w-full py-3 px-6 text-black flex justify-between sm:justify-center 
                                items-center top-0 z-10`}>
                <div className={`flex justify-between sm:grid gap-1 sm:grid-cols-[auto_1fr_auto] 
                                md:grid-cols-[auto_auto_1fr_auto] max-w-[1200px] w-full mx-auto`}>
                    <div className={'flex gap-7 sm:gap-4 items-center justify-center'}>
                        <BurgerButton/>
                        <div className={'sm:hidden'}>
                            <LanguageSwitcher/>
                        </div>
                    </div>
                    <div className={'hidden sm:block justify-items-center lg:justify-items-start items-center'}>
                        <Logo/>
                    </div>
                    <div className={'hidden md:flex justify-center items-end place-items-end -mb-5'}>
                        <CatalogMenu/>
                    </div>
                    <div className={'flex h-full'}>
                        <div className={'flex items-center justify-items-end gap-8 sm:gap-5'}>
                            <SearchBar/>
                            <UserButtonWrapper/>
                            <CartButton/>
                        </div>
                    </div>
                </div>
            </header>
            {/*<div className={'w-full bg-background hidden sm:block justify-items-center'}/>*/}
        </div>
    );
}
