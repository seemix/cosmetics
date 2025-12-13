'use client';

import { MenuProvider } from './MenuContext';
import type { IMenuItem } from '@/app/[locale]/types/catalog-menu';

export default function MenuProviderWrapper({
                                                children,
                                                menu,
                                            }: {
    children: React.ReactNode;
    menu: {
        categories: IMenuItem[];
        brands: IMenuItem[];
    };
}) {
    return (
        <MenuProvider initialMenu={menu}>
            {children}
        </MenuProvider>
    );
}