'use client';

import { useTranslations } from 'next-intl';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { assets } from '@/app/[locale]/assets/assets';

export default function Invoice() {
    const { cart } = useCartStore();
    const t = useTranslations('Checkout');
    if (!cart || !cart.items) return;

    return (
        <div className={'max-w-md mx-auto p-3 bg-white border border-gray-300 shadow my-5'}>
            <h2 className={'text-lg text-center font-bold mb-4 uppercase tracking-wider text-black'}>
                {t('yourOrder')}
            </h2>

            <table className={'w-full text-left border-collapse text-sm'} cellSpacing={1}>
                <thead>
                <tr className={'border-b-1 border-black'}>
                    <th className={'py-2 pr-2 w-8'}>№</th>
                    <th className={'py-2'}>{t('product')}</th>
                    <th className={'py-2 text-center w-15'}>{t('qty')}</th>
                    <th className={'py-2 text-right w-10'}>{t('price')}</th>
                    <th className={'py-2 text-right w-15'}>{t('sum')}</th>
                </tr>
                </thead>
                <tbody>
                {cart.items.map((item, index) => (
                    <tr key={item.id} className={'border-b border-gray-100 hover:bg-gray-50'}>
                        <td className={'py-3 pr-2 text-gray-500'}>{index + 1}</td>
                        <td className={'py-3'}>
                            <div className={'font-medium text-black'}>{item.title}</div>
                            <div className={'text-xs text-gray-500 leading-tight'}>{item.subtitle}</div>
                        </td>
                        <td className={'py-3 text-center'}>{item.quantity}</td>
                        <td className={'py-3 text-right'}>{item.price}</td>
                        <td className={'py-3 text-right font-medium'}>
                            {item.price * item.quantity}
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr className={'border-t-2 border-black font-bold text-base'}>
                    <td colSpan={2} className={'py-4 text-right uppercase pt-6'}>{t('total')}</td>
                    <td colSpan={3}
                        className={'py-4 text-right pt-6 text-center'}>{cart.subtotal} {assets.currency}
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};
