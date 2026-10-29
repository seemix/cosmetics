'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

import { useModal } from '@/hooks/useModal';

const PANEL_WIDTH = 500;

export default function ModalWindow() {
	const variants = {
		left: {
			hidden: { x: -PANEL_WIDTH },
			visible: { x: 0 },
		},
		right: {
			hidden: { x: PANEL_WIDTH },
			visible: { x: 0 },
		},
		zoom: {
			hidden: { scale: 0.8, opacity: 0 },
			visible: { scale: 1, opacity: 1 },
		},
	};

	const { open, appearance, content, hideModal } = useModal();

	useEffect(() => {
		if (!open) return;
		document.body.style.overflow = 'hidden';
		// Focus goes back to the element that opened the modal once it closes.
		const opener = document.activeElement as HTMLElement | null;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') hideModal();
		};
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('keydown', onKeyDown);
			opener?.focus?.();
		};
	}, [open, hideModal]);

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						onClick={hideModal}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className={'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'}
					/>

					<div
						className={`fixed inset-0 z-50 flex items-center pointer-events-none ${
							appearance === 'left'
								? 'justify-start'
								: appearance === 'right'
									? 'justify-end'
									: 'justify-center'
						}`}
					>
						<motion.div
							role={'dialog'}
							aria-modal={'true'}
							initial={'hidden'}
							animate={'visible'}
							exit={'hidden'}
							variants={variants[appearance]}
							transition={{
								type: 'tween',
								duration: 0.35,
								ease: 'easeInOut',
							}}
							className={`pointer-events-auto flex flex-col overflow-hidden
                                   ${appearance !== 'zoom' ? 'bg-background max-w-125' : 'items-center justify-center'}`}
						>
							{content}
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
