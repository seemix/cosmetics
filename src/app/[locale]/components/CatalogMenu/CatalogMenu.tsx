import { catalogMenuData } from '@/app/[locale]/components/CatalogMenu/catalogMenuData';
import MenuItem from '@/app/[locale]/components/CatalogMenu/MenuItem';

export default function CatalogMenu() {
    return (
        <nav
            className={`container mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-10
                        mt-10 sm:mt-0 text-black`}>
            {catalogMenuData.map(item => <MenuItem key={item.name} item={item}/>)}
        </nav>
    );
};