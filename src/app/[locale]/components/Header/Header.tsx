'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaInstagram,
    FaPhoneSquareAlt,
    FaTelegramPlane,
} from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { PiShoppingCartSimple, PiUser } from 'react-icons/pi';

import { assets } from '@/app/[locale]/assets/assets';
import { BurgerMenu, CatalogMenu, HeadLinks, LanguageSwitcher, SearchBar } from '@/app/[locale]/components';
import logo from '../../../../../public/logo1.webp';

const Header = () => {
    const t = useTranslations('Header');
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    return (
        <header>
            <div className={'hidden sm:flex bg-gray-100 py-2 justify-evenly'}>
                <div className={'flex gap-4 w-full lg:w-[1100px] justify-between'}>
                    <div className={'flex gap-4'}>
                        <Link href={assets.telegramLink}
                              className={'transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
                            <FaTelegramPlane size={18}/>
                        </Link>
                        <Link href={assets.instagramLink}
                              className={'transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
                            <FaInstagram size={18}/>
                        </Link>
                        <Link href={`tel:${assets.phone}`}
                              className={'text-dark text-sm flex gap-2 transition-colors duration-300 hover:text-[var(--main)]'}>
                            <FaPhoneSquareAlt size={18}/> {assets.phone}
                        </Link>
                    </div>

                    <HeadLinks/>
                    <LanguageSwitcher/>
                </div>
            </div>
            <div
                className={'bg-foreground w-full py-3 px-6 text-black flex justify-center items-center'}>

                <div className={'grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto] max-w-[1200px] w-full mx-auto'}>
                    <RxHamburgerMenu size={35} className={'block sm:hidden cursor-pointer items-center h-full'}
                                     onClick={() => setBurgerIsOpen(true)}/>
                    <div className={'justify-items-center lg:justify-items-start items-center'}>
                        <div className={'flex items-center'}>
                            <Image className={'ml-5'} src={logo} alt={'logo'} width={90} height={90}/>
                            <div className={'flex flex-col items-center'}>
                                <h1 className={'text-xl md:text-2xl tracking-tight font-semibold sm:block'}>NEXT
                                    LEVEL</h1>
                                <h2 className={'font-(family-name:--font-roboto) text-sm flex-none sm:flex'}>
                                    Barber supply</h2>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-1 items-center justify-center gap-6 lg:gap-4 '}>
                        <SearchBar/>
                        <Link href={'/login'}
                              className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)]`}>
                            <PiUser size={29}/>
                        </Link>
                        <PiShoppingCartSimple size={29}
                                              className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>
                        {/*<FaRegHeart size={26}*/}
                        {/*            className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>*/}
                    </div>
                </div>
                <BurgerMenu open={burgerIsOpen} setOpen={setBurgerIsOpen}/>
            </div>
            <CatalogMenu/>
        </header>
    );
};

export default Header;