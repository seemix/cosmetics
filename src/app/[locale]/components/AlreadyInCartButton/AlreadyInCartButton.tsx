'use client';

import { TbShoppingCartCopy } from 'react-icons/tb';
import { useTranslations } from 'next-intl';
import { Cart } from '@/app/[locale]/components';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function AlreadyInCartButton() {
    const t = useTranslations('Catalog');
    const { showModal } = useModal();

    return (
        <button
            onClick={() => showModal(<Cart/>, 'right')}
            type={'button'}
            aria-label={'add-to-cart'}
            className={`group cursor-pointer transition-colors duration-300 border-1 border-green-500 text-green-500  
         text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)] 
         hover:text-[var(--main)] flex gap-2 justify-center`}
        >
            <TbShoppingCartCopy
                size={23}
                className={`text-green-500 transition-colors duration-300 group-hover:text-[var(--main)]`}
            />
            {t('alreadyInCart')}
        </button>
    );
}