'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { PiShoppingCartSimple, PiUser } from 'react-icons/pi';

import {
    BurgerMenu,
    Cart,
    CatalogMenu,
    HeadLinks,
    LanguageSwitcher,
    LoginForm,
    ModalWindow,
    SearchBar,
    SocialIcons,
} from '@/app/[locale]/components';
import logo from '../../../../../public/logo1.webp';
import type { IModalProps } from '@/app/[locale]/components/Header/types';

const Header = () => {
    const [modalState, setModalState] = useState<IModalProps>({
        open: false,
        appearance: null,
        modalChildren: null,
    });

    const onCloseModal = () => {
        setModalState((state) => ({
            ...state,
            appearance: null,
            modalChildren: null,
            open: false,
        }));
    };

    return (
        <header>
            <ModalWindow
                open={modalState.open}
                appearance={modalState.appearance as 'left' | 'right' | 'zoom'}
                children={modalState.modalChildren}
                onClose={onCloseModal}
            />
            <div className={'hidden sm:flex bg-gray-100 py-2 justify-evenly'}>
                <div className={'flex px-4 gap-4 w-full lg:w-[1100px] justify-between'}>
                    <SocialIcons/>
                    <HeadLinks/>
                    <LanguageSwitcher/>
                </div>
            </div>
            <div
                className={
                    'bg-foreground w-full py-3 px-6 text-black flex justify-center items-center'
                }
            >
                <div
                    className={`grid gap-1 grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto]                                
                                max-w-[1200px] w-full mx-auto`}
                >
                    <button
                        type={'button'}
                        aria-label="Open-close Menu"
                        className={'flex gap-6 md:hidden'}
                        onClick={() =>
                            setModalState((state) => ({
                                ...state,
                                appearance: 'left',
                                modalChildren: <BurgerMenu/>,
                                open: true,
                            }))
                        }
                    >
                        <RxHamburgerMenu
                            size={35}
                            className={'block md:hidden cursor-pointer items-center h-full'}
                        />
                        <LanguageSwitcher/>
                    </button>
                    <div
                        className={
                            'justify-items-center lg:justify-items-start items-center'
                        }
                    >
                        <div className={'flex gap-1 items-center'}>
                            <Image
                                className={'ml-5 ml-5 w-18 lg:w-20 h-auto'}
                                src={logo}
                                alt={'logo'}
                            />
                            <div className={'flex flex-col items-center'}>
                                <h1
                                    className={`hidden sm:block text-sm sm:text-base text-center lg:text-2xl 
                                                tracking-tight font-semibold sm:block`}
                                >
                                    NEXT LEVEL
                                </h1>
                                <h2
                                    className={`hidden sm:block text-xs sm:text-sm text-center 
                                                font-(family-name:--font-roboto) text-sm flex-none sm:flex`}
                                >
                                    Barber supply
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            'hidden md:flex justify-center items-end place-items-end -mb-3'
                        }
                    >
                        <CatalogMenu/>
                    </div>
                    <div className={'flex h-full justify-end'}>
                        <div className={'flex items-center justify-items-end gap-5'}>
                            <SearchBar/>
                            <button
                                type={'button'}
                                aria-label={'search'}
                                onClick={() =>
                                    setModalState((state) => ({
                                        ...state,
                                        appearance: 'zoom',
                                        modalChildren: <LoginForm/>,
                                        open: true,
                                    }))
                                }
                                className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)] cursor-pointer`}
                            >
                                <PiUser size={29}/>
                            </button>
                            <button
                                type={'button'}
                                aria-label={'Cart'}
                                className={'cursor-pointer z-6'}
                                onClick={() => {
                                    setModalState((state) => ({
                                        ...state,
                                        appearance: 'right',
                                        modalChildren: <Cart/>,
                                        open: true,
                                    }));
                                }}
                            >
                                <PiShoppingCartSimple
                                    size={29}
                                    className={`text-black transition-colors duration-300 
                                                      hover:text-[var(--main)] cursor-pointer`}
                                />
                            </button>
                        </div>
                    </div>
                    {/*<CatalogMenu/>                    */}
                </div>
            </div>
            <div
                className={'w-full bg-background hidden sm:block justify-items-center'}
            >
                {/*/!*cm*!/<CatalogMenu/>*/}
            </div>
        </header>
    );
};

export default Header;
