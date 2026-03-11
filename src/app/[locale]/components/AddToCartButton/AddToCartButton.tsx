'use client';

import { useTranslations } from 'next-intl';
import { PiShoppingCartSimple } from 'react-icons/pi';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { Loader } from '@/app/[locale]/components';

export default function AddToCartButton({ productId, quantity = 1 }: { productId: string, quantity: number }) {
    const t = useTranslations('Catalog');
    const { addItem, itemLoading } = useCartStore();

    return (
        <button
            onClick={() => addItem({ productId, quantity })}
            type={'button'}
            aria-label={'add-to-cart'}
            className={`cursor-pointer transition-colors duration-300 border-1 border-black  
				         text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)] 
				         hover:text-[var(--main)] flex gap-2 justify-center w-full sm:min-w-[180px]`}
        >
             <PiShoppingCartSimple className={'text-lg sm:text-[1.3em]'}/>
            {itemLoading === productId ? <Loader/> : t('addToCart')}
        </button>
    );
}
