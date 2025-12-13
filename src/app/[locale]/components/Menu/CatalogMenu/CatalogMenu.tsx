'use client';

import { useState } from 'react';
import { MenuItem } from '@/app/[locale]/components';
import { useMenu } from '@/app/[locale]/components/Menu/MenuContext';
import { useTranslations } from 'next-intl';

export default function CatalogMenu() {
    const [openItem, setOpenItem] = useState<string | null>(null);
    const { categories, brands } = useMenu();
    const t = useTranslations('CatalogMenu');
    const brandsMenu = { title: t('brands'), id: 'brands', sub: brands, uri: '' };
    const arr = [...categories, brandsMenu];

    return (
        <nav
            className={`container mx-auto flex flex-col md:flex-row gap-y-5 sm:gap-y-0 mt-10 sm:mt-0 
                            text-black w-full max-w-170 justify-evenly`}
        >
            {arr.map((item) => (
                <MenuItem
                    openItem={openItem}
                    setOpenItem={setOpenItem}
                    key={item.id}
                    item={item}
                />
            ))}
        </nav>
    );
}
