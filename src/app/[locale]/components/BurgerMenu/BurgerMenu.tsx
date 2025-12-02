import { CatalogMenu, HeadLinks } from '@/app/[locale]/components';

export default function BurgerMenu() {

    return (
        <div className={'h-full pt-10'}>
            <HeadLinks/>
            <div className={'ml-5'}><CatalogMenu/></div>
        </div>
    );
}