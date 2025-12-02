import { CatalogMenu, HeadLinks } from '@/app/[locale]/components';

export default function BurgerMenu() {

    return (
        <div className={'min-h-screen pt-5'}>
            <HeadLinks/>
            <CatalogMenu/>
        </div>
    );
}