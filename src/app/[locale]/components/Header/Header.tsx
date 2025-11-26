'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
    FaInstagram,
    FaPhoneSquareAlt,
    FaTelegramPlane,
    FaRegUserCircle,
    FaRegHeart
} from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsCart3 } from 'react-icons/bs';

import { assets } from '@/app/[locale]/assets/assets';
import { BurgerMenu, CatalogMenu, HeadLinks, LanguageSwitcher, SearchBar } from '@/app/[locale]/components';
import logo from '../../../../../public/logo1.webp';

const Header = () => {
    const t = useTranslations('Header');
    const [burgerIsOpen, setBurgerIsOpen] = useState(false);

    return (
        <header>
            <div className={'hidden sm:flex bg-gray-100 px-7 py-2 justify-evenly'}>
                <Link href={`tel:${assets.phone}`}
                      className={'text-dark text-sm flex gap-2 transition-colors duration-300 hover:text-[var(--main)]'}>
                    <FaPhoneSquareAlt size={18}/> {assets.phone}
                </Link>
                <div className={'flex gap-4'}>
                    <Link href={assets.telegramLink}
                          className={'transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
                        <FaTelegramPlane size={18}/>
                    </Link>
                    <Link href={assets.instagramLink}
                          className={'transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
                        <FaInstagram size={18}/>
                    </Link>
                </div>
                <HeadLinks/>
            </div>
            <div className={'bg-foreground w-full p-3 text-black flex justify-evenly items-center'}>
                <div className={'flex flex-1 gap-8 ms-center justify-center'}>
                    <div><LanguageSwitcher/></div>
                    <Link href={'/login'}
                          className={`hidden sm:flex items-center justify-center gap-2 transition-colors duration-300 
                                        hover:text-[var(--main)]`}>
                        <FaRegUserCircle size={22}/>
                        <div className={''}>{t('login')}</div>
                    </Link>
                </div>
                <div className={'flex flex-1 gap-2 items-center justify-center'}>
                    <Image className={''} src={logo} alt={'logo'} width={90} height={90}/>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'text-xl md:text-2xl tracking-tight font-semibold hidden sm:block'}>NEXT LEVEL</h1>
                        <h2 className={'font-(family-name:--font-roboto) text-sm flex-none hidden sm:flex'}>
                            Barber supply</h2></div>
                    {/*<Image className={'flex-none hidden sm:flex'} src={logoText} width={120} height={40}*/}
                    {/*       alt="logoText"/>*/}
                </div>
                <div className={'flex flex-1 items-center justify-center gap-3 sm:gap-6 '}>
                    <SearchBar/>
                    <BsCart3 size={30}
                                  className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>
                    {/*<FaRegHeart size={26}*/}
                    {/*            className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>*/}
                </div>
                <button className={'cursor-pointer block sm:hidden'} onClick={() => setBurgerIsOpen(true)}>
                    <RxHamburgerMenu size={32} className={'transition-colors duration-300 hover:text-[var(--main)]'}/>
                </button>
                <BurgerMenu open={burgerIsOpen} setOpen={setBurgerIsOpen}/>
            </div>
            <CatalogMenu/>
        </header>
    );
};

export default Header;