'use client';

import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/[locale]/hooks/useClickOutside';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { PiUserCheck } from 'react-icons/pi';
import { MdLogout } from 'react-icons/md';
import { IoMdHeartEmpty } from 'react-icons/io';
import { LuClipboardList } from 'react-icons/lu';
import { FaChalkboardUser } from 'react-icons/fa6';
import Link from 'next/link';

import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useRouter } from 'next/navigation';

export default function AuthUserButton() {

    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    useClickOutside(ref, () => setOpen(false), open);
    const router = useRouter();
    const t = useTranslations();
    const { logout } = useAuthStore();
    const { user } = useAuthStore();

    const userLogout = () => {
        logout().then();
        router.refresh()
    }

    return (
        <div className={'relative'} ref={ref}>
            <button
                type={'button'}
                aria-label={'search'}
                onClick={() => setOpen(!open)}
                className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)] cursor-pointer ${open ? 'text-[var(--main)]' : ''}`}
            >
                <PiUserCheck size={33} className={'text-green-500'}/>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key={'dropdown'}
                        initial={{ opacity: 0, y: -6, scale: .96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: .96 }}
                        transition={{ duration: .2 }}
                        className={'absolute -right-20 mt-2 bg-white shadow-md z-12 w-50'}
                    >
                        <p className={'font-bold m-3'}>{t('RegisterForm.welcome')}, {user?.name}</p>
                        <Link
                            href={'/orders'}
                            type={'button'}
                            onClick={() => {
                                setOpen(false);
                            }}
                            className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                        text-[.95em] hover:text-[var(--main)] transition-colors duration-300 
                                        cursor-pointer text-black`}
                        >
                            <LuClipboardList size={20} className={'mr-2'}/>
                            {t('RegisterForm.orders')}
                        </Link>
                        <Link
                            href={'/profile'}
                            type={'button'}
                            onClick={() => {
                                setOpen(false);
                            }}
                            className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                        text-[.95em] hover:text-[var(--main)] transition-colors duration-300 
                                        cursor-pointer text-black`}
                        >
                            <FaChalkboardUser size={20} className={'mr-2'}/>
                            {t('RegisterForm.profile')}
                        </Link>
                        <Link href={'/favorites'}
                              onClick={() => setOpen(false)}
                              type={'button'}
                              className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                        text-[.95em] hover:text-[var(--main)] transition-colors duration-300 
                                        cursor-pointer text-black`}>
                            <IoMdHeartEmpty size={24} className={'mr-1'}/>
                            {t('Account.favorites')}
                        </Link>
                        <Link
                            href={''}
                            onClick={userLogout}
                            type={'button'}
                            className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                        text-[.95em] hover:text-[var(--main)] transition-colors duration-300 
                                        cursor-pointer text-black`}
                        >
                            <MdLogout size={20} className={'mr-2'}/>
                            {t('RegisterForm.logout')}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}