'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { LuChevronRight, LuLayoutGrid, LuX } from 'react-icons/lu';
import { useMenu } from '@/components/Menu/MenuContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Link, usePathname } from '@/i18n/navigation';
import type { IMenuItem } from '@/types/catalog-menu';

/**
 * Desktop catalog: a button in the header that opens a panel right below it.
 * The left column lists categories (and brands); the right one shows the
 * subcategories of the one hovered or focused.
 */
export default function CatalogButton() {
	const [open, setOpen] = useState(false);
	const panelId = useId();
	const t = useTranslations();
	const { categories, brands } = useMenu();
	const pathname = usePathname();

	const items: IMenuItem[] = [
		...categories,
		{ title: t('CatalogMenu.brands'), id: 'brands', sub: brands, uri: '' },
	];
	const [activeId, setActiveId] = useState<string | null>(null);
	const active = items.find((i) => i.id === activeId) ?? items[0];

	const close = () => setOpen(false);
	// The backdrop handles clicks on the page; this catches the rest of the header.
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, close, open);

	// Navigating anywhere closes the panel.
	// biome-ignore lint/correctness/useExhaustiveDependencies: run on route change only
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) return;
		document.body.style.overflow = 'hidden';
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<div ref={ref}>
			<button
				type={'button'}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((v) => !v)}
				className={`flex items-center gap-2 h-11 px-4 cursor-pointer font-semibold uppercase
				            tracking-[0.05em] transition-colors duration-300
				            border ${open ? 'bg-[var(--main)] text-white border-[var(--main)]' : 'bg-transparent text-black border-black hover:bg-[var(--main)] hover:text-white hover:border-[var(--main)]'}`}
			>
				{open ? <LuX size={20} /> : <LuLayoutGrid size={20} />}
				{t('Header.catalog')}
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						key={'catalog-panel'}
						id={panelId}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className={'absolute left-0 right-0 top-full h-dvh z-30'}
					>
						{/* Backdrop covers the page below the header. */}
						<div
							aria-hidden={'true'}
							onClick={close}
							className={'absolute inset-0 bg-black/40 backdrop-blur-sm'}
						/>
						<motion.nav
							aria-label={t('Header.catalog')}
							initial={{ y: -12 }}
							animate={{ y: 0 }}
							exit={{ y: -12 }}
							transition={{ duration: 0.25 }}
							className={`relative mx-auto max-w-[1200px] bg-white shadow-lg grid
							            grid-cols-[260px_1fr] max-h-[70dvh] overflow-hidden`}
						>
							<ul
								className={
									'bg-gray-50 py-3 overflow-y-auto border-r border-gray-200'
								}
							>
								{items.map((item) => {
									const isActive = item.id === active?.id;
									return (
										<li key={item.id}>
											<button
												type={'button'}
												onMouseEnter={() => setActiveId(item.id)}
												onFocus={() => setActiveId(item.id)}
												onClick={() => setActiveId(item.id)}
												aria-current={isActive ? 'true' : undefined}
												className={`w-full flex items-center justify-between px-5 py-3 text-left
												            cursor-pointer uppercase font-semibold tracking-[0.05em]
												            transition-colors duration-200
												            ${isActive ? 'bg-white text-[var(--main)]' : 'text-black hover:text-[var(--main)]'}`}
											>
												{item.title}
												<LuChevronRight size={18} />
											</button>
										</li>
									);
								})}
							</ul>

							<div className={'p-6 overflow-y-auto'}>
								{active && (
									<>
										{active.uri ? (
											<Link
												href={active.uri}
												onClick={close}
												className={`inline-block mb-4 text-xl font-semibold uppercase tracking-[0.05em]
												            hover:text-[var(--main)] transition-colors duration-300`}
											>
												{active.title}
											</Link>
										) : (
											<p
												className={
													'mb-4 text-xl font-semibold uppercase tracking-[0.05em]'
												}
											>
												{active.title}
											</p>
										)}
										<ul
											className={
												'grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1'
											}
										>
											{(active.sub ?? []).map((child) => (
												<li key={child.id}>
													<Link
														href={child.uri}
														onClick={close}
														className={`block py-2 text-black hover:text-[var(--main)]
														            transition-colors duration-300`}
													>
														{child.title}
													</Link>
												</li>
											))}
										</ul>
									</>
								)}
							</div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
