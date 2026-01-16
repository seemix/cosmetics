'use client';

import { PiShoppingCartSimple } from 'react-icons/pi';
import { useTranslations } from 'next-intl';

export default function EmptyCart() {
    const t = useTranslations('Cart');
    return (
        <div className={'flex w-full flex-col gap-5 h-full items-center justify-center'}>
            <PiShoppingCartSimple size={150} className={'text-gray-300'}/>
            <h2 className={'text-2xl'}>{t('cartIsEmpty')}</h2>
        </div>
    );
}