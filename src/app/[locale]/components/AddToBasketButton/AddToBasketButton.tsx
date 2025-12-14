'use client';

import { PiShoppingCartSimple } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

export default function AddToBasketButton() {

    const t =useTranslations('Catalog');

    return (
        <div>
            <button
                type={'button'}
                aria-label={'add-to-cart'}
                className={`cursor-pointer transition-colors duration-300 border-1 border-black py-2 px-4
                                 hover:border-[var(--main)] hover:text-[var(--main)] flex gap-2 justify-center
                                 font-(family-name:--font-roboto)`}
            >
                <PiShoppingCartSimple size={23}/>
                {t('addToCart')}
            </button>
        </div>
    );
}