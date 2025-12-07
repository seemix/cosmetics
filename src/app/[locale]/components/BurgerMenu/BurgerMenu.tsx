import { CatalogMenu, HeadLinks, SocialIcons } from '@/app/[locale]/components';

export default function BurgerMenu() {
    return (
        <div className={'h-full p-5 grid grid-rows-[1fr_auto]'}>
            <div className={'mt-5'}>
                <div className={'block sm:hidden'}>
                    <HeadLinks/>
                </div>
                <div className={'ml-5'}>
                    <CatalogMenu/>
                </div>
            </div>
            <div className={'mb-10 flex w-full justify-center'}>
                <SocialIcons/>
            </div>
        </div>
    );
}
