'use client';

import { AnimatePresence, motion } from 'motion/react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useAuthPrices } from '@/hooks/useAuthPrices';
import { useAuthStore } from '@/stores/auth.store';
import type { IProduct } from '@/types/product';

export default function ProductCardsGrid({
	products,
}: {
	products: IProduct[];
}) {
	const { user } = useAuthStore();
	useAuthPrices(user);
	return (
		<div
			className={`grid w-full  justify-items-center grid-cols-2 gap-3 
                        sm:grid-cols-[repeat(auto-fit,255px)] sm:justify-items-center sm:gap-4`}
		>
			<AnimatePresence initial={false} mode={'popLayout'}>
				{products.map((product, i) => (
					<motion.div
						key={product.id}
						layout
						exit={{ opacity: 0, height: 0, scale: 0.5, y: 10 }}
						className={'overflow-hidden w-full'}
					>
						<ProductCard product={product} index={i} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
