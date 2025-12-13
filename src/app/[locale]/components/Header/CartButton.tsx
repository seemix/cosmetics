'use client';

import { Cart, LoginForm } from '@/app/[locale]/components';
import { PiShoppingCartSimple, PiUser } from 'react-icons/pi';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function CartButton() {

    const { showModal } = useModal();

    return (
        <button
            type={'button'}
            aria-label={'Cart'}
            className={'cursor-pointer z-6'}
            onClick={() => showModal(<Cart/>, 'right' )}
        >
            <PiShoppingCartSimple
                size={29}
                className={`text-black transition-colors duration-300 
                                                      hover:text-[var(--main)] cursor-pointer`}
            />
        </button>
  );
}