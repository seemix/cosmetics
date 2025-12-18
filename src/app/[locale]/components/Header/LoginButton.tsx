'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { PiUser } from 'react-icons/pi';
import { LoginForm } from '@/app/[locale]/components';
import { useClickOutside } from '@/app/[locale]/hooks/useClickOutside';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function LoginButton() {
	const ref = useRef<HTMLDivElement>(null);
	const { showModal } = useModal();
	const [open, setOpen] = useState(false);
	useClickOutside(ref, () => setOpen(false), open);
	const t = useTranslations('Header');

	return (
		<div className={'relative'} ref={ref}>
			<button
				type={'button'}
				aria-label={'search'}
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
						className="absolute -right-10 mt-2 bg-white shadow-md z-12"
					>
						<Link
							href={''}
							type={'button'}
							onClick={() => {
								showModal(<LoginForm />, 'zoom');
								setOpen(false);
							}}
							className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                    hover:text-[var(--main)] transition-colors duration-300 cursor-pointer text-black`}
						>
							<CiLogin size={20} />
							{t('login')}
						</Link>

						<Link
							href={'/register'}
							onClick={() => setOpen(false)}
							type={'button'}
							className={`flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 
                                    hover:text-[var(--main)] transition-colors duration-300 cursor-pointer text-black`}
						>
							<AiOutlineUserAdd size={20} />
							{t('register')}
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
