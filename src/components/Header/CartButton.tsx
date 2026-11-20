'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { PiShoppingCartSimple } from 'react-icons/pi';
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber';
import Cart from '@/components/Cart/Cart';
import { useModal } from '@/hooks/useModal';
import { useCartStore } from '@/stores/cart.store';

const PARTICLES = Array.from({ length: 8 }, (_, i) => {
	const angle = (i / 8) * Math.PI * 2;
	return { x: Math.cos(angle) * 18, y: Math.sin(angle) * 18 };
});

export default function CartButton() {
	const { showModal } = useModal();
	const reduceMotion = useReducedMotion();
	const count = useCartStore((s) => s.cart?.items?.length ?? 0);
	// Total units: changes on add and on quantity edits, and drives the feedback animation.
	const units = useCartStore(
		(s) => s.cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0,
	);

	// Bumped on every growth of the cart; used as a key to replay the animations.
	const [burst, setBurst] = useState(0);
	const loaded = useCartStore((s) => s.cart !== null);
	const [prev, setPrev] = useState({ units, loaded });
	if (units !== prev.units || loaded !== prev.loaded) {
		// The initial load (cart null -> fetched) is not something the user did.
		if (prev.loaded && units > prev.units) setBurst((b) => b + 1);
		setPrev({ units, loaded });
	}

	const animate = burst > 0 && !reduceMotion;

	return (
		<button
			type={'button'}
			aria-label={'Cart'}
			className={'cursor-pointer z-6 relative'}
			onClick={() => showModal(<Cart />, 'right')}
		>
			<motion.span
				key={`icon-${burst}`}
				className={'block'}
				initial={false}
				animate={
					animate
						? {
								scale: [1, 1.2, 0.95, 1],
								rotate: [0, -14, 10, 0],
								y: [0, -4, 0, 0],
							}
						: undefined
				}
				transition={{ duration: 0.5, ease: 'easeOut' }}
			>
				<PiShoppingCartSimple
					size={29}
					className={`text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer`}
				/>
			</motion.span>
			<AnimatePresence>
				{count ? (
					<motion.div
						className={'absolute -top-3 -right-2'}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ type: 'spring', stiffness: 500, damping: 25 }}
					>
						{animate && (
							<span key={`burst-${burst}`} className={'pointer-events-none'}>
								{PARTICLES.map((p, i) => (
									<motion.span
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed, static list
										key={i}
										className={
											'absolute top-1/2 left-1/2 -ml-[2px] -mt-[2px] w-1 h-1 rounded-full bg-[var(--main)]'
										}
										initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
										animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
										transition={{ duration: 0.55, ease: 'easeOut' }}
									/>
								))}
							</span>
						)}
						<motion.div
							key={`badge-${burst}`}
							initial={false}
							animate={animate ? { scale: [1, 1.35, 1] } : undefined}
							transition={{ duration: 0.35, ease: 'easeOut' }}
							className={`relative bg-[var(--main)] text-black rounded-full text-xs w-[19px] aspect-square
                                        flex items-center justify-center`}
						>
							<AnimatedNumber
								value={count}
								format={(n) => (n >= 9 ? '9+' : String(n))}
								className={'relative ml-[1px]'}
							/>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</button>
	);
}
