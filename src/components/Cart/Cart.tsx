'use client';

import { AnimatePresence, motion } from 'motion/react';
import CartWindow from '@/components/Cart/CartWindow';
import EmptyCart from '@/components/Cart/EmptyCart';
import CloseModalButton from '@/components/ModalWindow/CloseModalButton';
import { useCartStore } from '@/stores/cart.store';

export default function Cart() {
	const cart = useCartStore((s) => s.cart);
	const items = cart?.items;

	return (
		<div
			className={
				'text-black max-w-[100%] w-110 flex flex-col h-dvh overflow-x-hidden'
			}
		>
			<CloseModalButton />
			<AnimatePresence mode={'wait'}>
				{items?.length ? (
					<motion.div
						className={'h-full'}
						key={'cart'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, delay: 0.35, ease: 'easeOut' }}
					>
						<CartWindow />
					</motion.div>
				) : (
					<motion.div
						className={'h-full'}
						key={'empty'}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, delay: 0.1, ease: 'easeOut' }}
					>
						<EmptyCart />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
