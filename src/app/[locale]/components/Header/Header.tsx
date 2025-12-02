'use client';

import React, { useState } from 'react';
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
import {
    BurgerMenu,
    Cart,
    CatalogMenu,
    HeadLinks,
    LanguageSwitcher,
    ModalWindow,
    SearchBar
} from '@/app/[locale]/components';
import logo from '../../../../../public/logo1.webp';
import { IModalProps } from '@/app/[locale]/components/Header/types';

const Header = () => {

    const [modalState, setModalState] = useState<IModalProps>({
        open: false,
        appearance: null,
        modalChildren: null
    });


    const onCloseModal = () => {
        setModalState(state => ({
            ...state,
            appearance: null,
            modalChildren: null,
            open: false
        }));
    };

    return (
        <header>
                <ModalWindow open={modalState.open} appearance={modalState.appearance as 'left' | 'right' | 'zoom'}
                             children={modalState.modalChildren}
                             onClose={onCloseModal}
                />
            <div className={'hidden sm:flex bg-gray-100 py-2 justify-evenly'}>
                <div className={'flex px-4 gap-4 w-full lg:w-[1100px] justify-between'}>
                    <div className={'flex gap-4 pt-1'}>
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
            <div className={'bg-foreground w-full py-3 px-6 text-black flex justify-center items-center'}>
                <div className={`grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto] md:grid-cols-[auto_1fr] 
                                max-w-[1200px] w-full mx-auto`}>

                    <RxHamburgerMenu size={35}
                                     className={'block sm:hidden cursor-pointer items-center h-full'}
                                     onClick={() => setModalState(state => ({
                                         ...state,
                                         appearance: 'left',
                                         modalChildren: <BurgerMenu/>,
                                         open: true
                                     }))}/>


                    <div className={'justify-items-center lg:justify-items-start items-center'}>
                        <div className={'flex items-center'}>
                            <Image className={'ml-5'} src={logo} alt={'logo'} width={80} height={80}/>
                            <div className={'flex flex-col items-center'}>
                                <h1 className={'text-xl md:text-2xl tracking-tight font-semibold sm:block'}>
                                    NEXT LEVEL
                                </h1>
                                <h2 className={'font-(family-name:--font-roboto) text-sm flex-none sm:flex'}>
                                    Barber supply
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className={'flex h-full justify-end'}>
                        <div className={'flex items-center justify-items-end gap-6 lg:gap-4'}>
                            {/*<LanguageSwitcher/>*/}
                            <SearchBar/>
                            <Link href={'/login'}
                                  className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)]`}>
                                <PiUser size={29}/>
                            </Link>
                            <button className={'cursor-pointer z-6'} onClick={() => {
                                setModalState(state => ({
                                    ...state,
                                    appearance: 'right',
                                    modalChildren: <Cart/>,
                                    open: true
                                }));
                            }}>
                                <PiShoppingCartSimple size={29}
                                                      className={`text-black transition-colors duration-300 
                                                      hover:text-[var(--main)] cursor-pointer`}/>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className={'w-full bg-background hidden sm:block justify-items-center'}><CatalogMenu/></div>
        </header>
    );
};

export default Header;