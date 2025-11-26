import { catalogMenuData } from '@/app/[locale]/components/CatalogMenu/catalogMenuData';
import MenuItem from '@/app/[locale]/components/CatalogMenu/MenuItem';

export default function CatalogMenu() {
    return (
        <div className={'w-full bg-background hidden sm:block'}>
            <nav className={'container mx-auto flex justify-center gap-12 text-black'}>
                {catalogMenuData.map(item => <MenuItem key={item.name} item={item}/>)}
            </nav>
        </div>
    );
};