import { catalogMenuData } from '@/app/[locale]/components/CatalogMenu/catalogMenuData';
import MenuItem from '@/app/[locale]/components/CatalogMenu/MenuItem';

export default function CatalogMenu() {
    return (
        <nav
            className={` container mx-auto flex flex-col sm:flex-row justify-center gap-y-5 sm:gap-y-0 gap-x-3 
            sm:gap-x-6 lg:gap-x-10 mt-10 sm:mt-0 text-black`}>
            {catalogMenuData.map(item => <MenuItem key={item.name} item={item}/>)}
        </nav>
    );
};