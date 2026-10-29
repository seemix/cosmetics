'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useRef, useState, useTransition } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
	const currentLocale = useLocale();
	// Locale-less path; next-intl adds the target locale back.
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	// click outside
	useClickOutside(ref, () => setOpen(false), open);

	const changeLocale = (newLocale: string) => {
		// Query (search, sort, page) is kept on the translated page (decision D5).
		const query = searchParams.toString();
		startTransition(() => {
			router.replace(query ? `${pathname}?${query}` : pathname, {
				locale: newLocale,
			});
		});

		setOpen(false);
	};

	return (
		<div className={'relative'} ref={ref}>
			{/* BUTTON */}
			<button
				type={'button'}
				onClick={() => setOpen(!open)}
				className={'px-2 py-1 bg-transparent text-black cursor-pointer'}
			>
				{currentLocale.toUpperCase()}
			</button>

			{/* DROPDOWN */}
			<AnimatePresence>
				{open && (
					<motion.div
						key={'dropdown'}
						initial={{ opacity: 0, y: -6, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className={
							'absolute -top-22 sm:top-5 -right-2 mt-2 bg-white shadow-md z-12'
						}
					>
						{routing.locales.map((code) => (
							<button
								type={'button'}
								key={code}
								onClick={() => changeLocale(code)}
								className={`block px-4 py-2 md:text-sm w-full text-left hover:bg-gray-100 
								            hover:text-[var(--main)] cursor-pointer`}
							>
								{code.toUpperCase()}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
