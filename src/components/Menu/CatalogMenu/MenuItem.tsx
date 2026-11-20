import { AnimatePresence, motion } from 'motion/react';
import { useModal } from '@/hooks/useModal';
import { Link } from '@/i18n/navigation';
import type { IMenuItem } from '@/types/catalog-menu';

export default function MenuItem({
	item,
	openItem,
	setOpenItem,
}: {
	item: IMenuItem;
	openItem: string | null;
	setOpenItem: (key: string | null) => void;
}) {
	const isOpen = openItem === item.id;

	const toggle = () => {
		setOpenItem(isOpen ? null : item.id);
	};
	const { hideModal } = useModal();
	const hasSub = Boolean(item.sub?.length);
	const rowClass = `flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold
                      uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[var(--main)]`;

	return (
		<div className={'relative md:p-2'}>
			{/* MOBILE: accordion rows; a category without children is a plain link. */}
			<div className={'block md:hidden border-b border-gray-200'}>
				{hasSub ? (
					<button
						type={'button'}
						aria-expanded={isOpen}
						onClick={toggle}
						className={`${rowClass} cursor-pointer ${isOpen ? 'text-[var(--main)]' : ''}`}
					>
						<span>{item.title}</span>
						<motion.svg
							animate={{ rotate: isOpen ? 180 : 0 }}
							transition={{ duration: 0.25 }}
							className={'w-4 h-4 shrink-0 text-gray-500'}
							fill={'currentColor'}
							viewBox={'0 0 20 20'}
							aria-hidden={'true'}
							focusable={'false'}
						>
							<path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
						</motion.svg>
					</button>
				) : (
					<Link
						href={item.uri || '/catalog'}
						onClick={hideModal}
						className={rowClass}
					>
						{item.title}
					</Link>
				)}

				<AnimatePresence initial={false}>
					{hasSub && isOpen && (
						<motion.div
							key={'content'}
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className={'overflow-hidden'}
						>
							<ul className={'pb-3 pl-3 border-l border-gray-200 ml-1 mb-1'}>
								{item.sub?.map((child) => (
									<li key={child.id}>
										<Link
											href={child.uri}
											onClick={hideModal}
											className={`block py-2 text-sm text-gray-700 transition-colors duration-300
                                                        hover:text-[var(--main)]`}
										>
											{child.title}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* DESKTOP: opens on hover, or on keyboard focus (Tab into the item, Escape closes). */}
			<motion.div
				role={'button'}
				tabIndex={0}
				aria-haspopup={'true'}
				aria-expanded={isOpen}
				className={`hidden md:flex items-center gap-1 relative uppercase text-lg 
                            font-semibold tracking-[0.05em] cursor-pointer`}
				onHoverStart={() => setOpenItem(item.id)}
				onHoverEnd={() => setOpenItem(null)}
				onFocus={() => setOpenItem(item.id)}
				onBlur={(e) => {
					if (!e.currentTarget.contains(e.relatedTarget as Node)) {
						setOpenItem(null);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === 'Escape') setOpenItem(null);
				}}
				animate={{
					color: isOpen ? 'var(--main)' : '#000000',
				}}
				whileHover={{
					color: 'var(--main)',
				}}
				transition={{ duration: 0.25 }}
			>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							key={'submenu'}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.35 }}
							className="absolute left-0 top-full bg-white shadow w-42 py-2 z-[70]"
						>
							{(item.sub ?? []).map((child) => (
								<Link href={child.uri} key={child.id}>
									<div
										className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-base tracking-normal 
                                                    normal-case font-normal
                                                    text-black hover:text-[var(--main)] transition-colors duration-300`}
									>
										{child.title}
									</div>
								</Link>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				<motion.span
					animate={{
						color: isOpen ? 'var(--main)' : '#000000',
					}}
					whileHover={{
						color: 'var(--main)',
					}}
					transition={{ duration: 0.25 }}
				>
					{item.title}
				</motion.span>

				{/* ICON */}
				<motion.svg
					animate={{ rotate: isOpen ? 180 : 0 }}
					whileHover={{ rotate: 180 }}
					transition={{ duration: 0.25 }}
					className={'w-4 h-4'}
					fill={'currentColor'}
					viewBox="0 0 20 20"
					aria-hidden={'true'}
					focusable={'false'}
				>
					<path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
				</motion.svg>
			</motion.div>
		</div>
	);
}
