'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { PiUser } from 'react-icons/pi';
import DropdownItem from '@/components/Header/DropdownItem';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useModal } from '@/hooks/useModal';

export default function UserButton() {
	const ref = useRef<HTMLDivElement>(null);
	const { showModal } = useModal();
	const [open, setOpen] = useState(false);
	useClickOutside(ref, () => setOpen(false), open);
	const t = useTranslations('Header');

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
				<PiUser size={29} />
			</button>
			<AnimatePresence>
				{open && (
					<motion.div
						key="dropdown"
						initial={{ opacity: 0, y: -6, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className={
							'absolute -top-23 sm:top-7 -right-15 mt-2 bg-white shadow-md z-12'
						}
					>
						<DropdownItem
							onClick={() => {
								showModal(<LoginForm />, 'zoom');
								setOpen(false);
							}}
							icon={<CiLogin size={20} />}
						>
							{t('login')}
						</DropdownItem>
						<DropdownItem
							href={'/register'}
							onClick={() => setOpen(false)}
							icon={<AiOutlineUserAdd size={20} />}
						>
							{t('register')}
						</DropdownItem>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
