'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import CartItem from '@/components/Cart/CartItem';
import ClearCart from '@/components/Cart/ClearCart';
import { assets } from '@/config/assets';
import { useModal } from '@/hooks/useModal';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';

export default function CartWindow() {
	const cart = useCartStore((s) => s.cart);
	const user = useAuthStore((s) => s.user);
	const cartId = cart?.id || '';
	const router = useRouter();
	const t = useTranslations('Cart');
	const { hideModal } = useModal();

	return (
		<div className={'grid grid-rows-[auto_1fr_auto] h-full'}>
			<div className={'bg-white w-full'}>
				<h2 className={'text-2xl -mt-5 py-2 mx-2 text-center font-medium'}>
					{t('cart')}
				</h2>
			</div>

			{/* SCROLL AREA */}
			<div className={'overflow-hidden w-full mt-2'}>
				<div
					className={'h-full border-t border-b border-gray-300 overflow-y-auto'}
				>
					<AnimatePresence initial={false}>
						{cart?.items?.map((product) => (
							<motion.div
								className={'overflow-x-hidden'}
								key={product.id}
								layout
								exit={{ opacity: 0, height: 0, scale: 0.5, y: 10 }}
								transition={{ duration: 0.25, delay: 0.15, ease: 'easeOut' }}
							>
								<CartItem cartId={cartId} product={product} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>

			<div className={'flex flex-col gap-2 items-center bg-white'}>
				<div
					className={
						'flex justify-between w-full gap-2 items-start border-b border-gray-300 p-4'
					}
				>
					<ClearCart />
					<div className={'text-sm flex flex-col'}>
						<div className={'mt-2'}>
							{t('subtotal')}:
							<p
								className={`${user?.wholesale === true ? 'text-green-500' : 'text-[var(--main)]'}`}
							>
								{cart?.preSubtotal && (
									<span
										className={
											'over-lined text-gray-500 text-[1.1em] font-normal mr-2'
										}
									>
										<i>
											{cart.preSubtotal} {assets.currency}
										</i>
									</span>
								)}
								<span className={'text-[1.3em] mt-1 font-bold text-center'}>
									{cart?.subtotal} {assets.currency}
								</span>
							</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => {
						router.push('/checkout');
						hideModal();
					}}
					type={'button'}
					className={`w-[80%] mx-auto border border-black p-2 transition-colors hover:border-[var(--main)] 
                                hover:text-[var(--main)] cursor-pointer mt-4 mb-3`}
				>
					{t('checkout')}
				</button>
			</div>
		</div>
	);
}
