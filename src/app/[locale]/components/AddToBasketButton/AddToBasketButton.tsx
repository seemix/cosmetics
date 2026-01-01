'use client';

import { useTranslations } from 'next-intl';
import { PiShoppingCartSimple } from 'react-icons/pi';

export default function AddToBasketButton() {
    const t = useTranslations('Catalog');

    return (
        <div>
            <button
                type={'button'}
                aria-label={'add-to-cart'}
                className={`cursor-pointer transition-colors duration-300 border-1 border-black  
				             text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)] 
				             hover:text-[var(--main)] flex gap-2 justify-center`}
            >
                <PiShoppingCartSimple size={23}/>
                {t('addToCart')}
            </button>
        </div>
    );
}
