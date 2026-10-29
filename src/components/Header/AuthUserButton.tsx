'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { FaChalkboardUser } from 'react-icons/fa6';
import { IoMdHeartEmpty } from 'react-icons/io';
import { LuClipboardList } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { PiUserCheck } from 'react-icons/pi';
import { useShallow } from 'zustand/react/shallow';
import DropdownItem from '@/components/Header/DropdownItem';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthUserButton() {
	const ref = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	useClickOutside(ref, () => setOpen(false), open);
	const t = useTranslations();
	const { logout, user } = useAuthStore(
		useShallow((s) => ({ logout: s.logout, user: s.user })),
	);

	const close = () => setOpen(false);

	return (
		<div className={'relative'} ref={ref}>
			<button
				type={'button'}
				aria-label={'user menu'}
				aria-expanded={open}
				onClick={() => setOpen(!open)}
				className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)] cursor-pointer ${open ? 'text-[var(--main)]' : ''}`}
			>
				<PiUserCheck size={33} className={'text-green-500'} />
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						key={'dropdown'}
						initial={{ opacity: 0, y: -6, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className={
							'absolute -right-20 -top-54 sm:top-7 mt-2 bg-white shadow-md z-12 w-50'
						}
					>
						<p className={'font-bold m-3'}>
							{t('RegisterForm.welcome')}, {user?.name}
						</p>
						<DropdownItem
							href={'/orders'}
							onClick={close}
							icon={<LuClipboardList size={20} className={'mr-2'} />}
						>
							{t('RegisterForm.orders')}
						</DropdownItem>
						<DropdownItem
							href={'/profile'}
							onClick={close}
							icon={<FaChalkboardUser size={20} className={'mr-2'} />}
						>
							{t('RegisterForm.profile')}
						</DropdownItem>
						<DropdownItem
							href={'/favorites'}
							onClick={close}
							icon={<IoMdHeartEmpty size={24} className={'mr-1'} />}
						>
							{t('Account.favorites')}
						</DropdownItem>
						<DropdownItem
							onClick={logout}
							icon={<MdLogout size={20} className={'mr-2'} />}
						>
							{t('RegisterForm.logout')}
						</DropdownItem>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
