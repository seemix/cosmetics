'use client';

import { useTranslations } from 'next-intl';
import { IoCloseSharp } from 'react-icons/io5';
import React, { Dispatch, SetStateAction } from 'react';

import { headMenuData } from '@/app/[locale]/components/Header/headMenuData';
import { catalogMenuData } from '@/app/[locale]/components/CatalogMenu/catalogMenuData';
import Link from 'next/link';

type ChildMenuProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};
export default function BurgerMenu({ open, setOpen }: ChildMenuProps) {
    const t = useTranslations('StaticPages');
    const tc = useTranslations('CatalogMenu');


    return (
        <div
            className={open ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50' : ''}
            onClick={() => setOpen(false)}
        >
            <div
                className={`z-6 fixed top-0 py-10 px-6 right-0 h-full w-full bg-background shadow-lg transform 
                transition-transform duration-500 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    className={'absolute right-5 top-4 hover:bg-background cursor-pointer'}
                    onClick={() => setOpen(false)}
                >
                    <IoCloseSharp size={30} color={'black'}/>
                </button>

                <ul className={'text-xl flex flex-col'}>
                    {
                        catalogMenuData.map((item) =>
                            <li key={item.name} className={'p-2'}>
                                <Link href={item.link}
                                      className={'block text-black w-full transition-colors duration-300 hover:text-[var(--main)]'}>
                                    {tc(`${item.name}`)}
                                </Link>
                            </li>)
                    }
                    {
                        headMenuData.map((item) =>
                            <li key={item.name} className={'p-2'}>
                                <Link href={item.link}
                                      className={'block text-black w-full transition-colors duration-300 hover:text-[var(--main)]'}>
                                    {t(`${item.name}`)}
                                </Link></li>)
                    }


                </ul>
            </div>
        </div>
    );
}