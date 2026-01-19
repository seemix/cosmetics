'use client';

import { PiShoppingCartSimple } from 'react-icons/pi';
import { Cart } from '@/app/[locale]/components';
import { useModal } from '@/app/[locale]/hooks/useModal';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function CartButton() {
    const { showModal } = useModal();
    const { cart } = useCartStore();


    return (
        <button
            type={'button'}
            aria-label={'Cart'}
            className={'cursor-pointer z-6 relative'}
            onClick={() => showModal(<Cart/>, 'right')}
        >
            <PiShoppingCartSimple
                size={29}
                className={`text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer`}
            />
            {cart?.items?.length ?
                <div className={'absolute -top-3 -right-2'}>
                    <div className={`relative bg-[var(--main)] text-black rounded-full 
                                  text-xs w-[19px] aspect-square`}>
                            <span className={`ml-[1px] absolute top-1/2 left-1/2 transform 
                                              -translate-x-1/2 -translate-y-1/2`}>
                            {cart.items.length >= 9 ? '9+' : cart.items.length}
                            </span>
                    </div>
                </div>
                : null}
        </button>
    );
}
