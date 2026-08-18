'use client';

import { useTranslations } from 'next-intl';

import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { assets } from '@/app/[locale]/assets/assets';
import { Cart, Loader, PromoBage } from '@/app/[locale]/components';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function Invoice() {
    const { cart, loading, promoCode } = useCartStore();
    const { showModal } = useModal();
    const t = useTranslations();
    if (!cart || !cart?.items?.length) return null;

    return (
        <div className={'w-[95%] md:max-w-[600px] border-red border-1 mx-auto p-3 bg-white border border-gray-300 shadow my-2'}>
            {loading && <Loader/>}
            <div className={'flex gap-4 justify-center items-center mb-4'}>
                <h2 className={'text-lg text-center font-bold uppercase tracking-wider text-black'}>
                    {t('Checkout.yourOrder')}
                </h2>
                <button onClick={() => showModal(<Cart/>, 'right')}
                        type={'button'}
                        className={`border border-gray-800 px-3 py-1 cursor-pointer hover:text-[var(--main)] 
                                    transition-colors duration-300 hover:border-[var(--main)]`}>
                    {t('Checkout.editOrder')}
                </button>
            </div>

            {/* table-fixed гарантує дотримання заданої ширини колонок */}
            <table className={'w-full table-fixed text-left border-collapse text-sm text-black'}>
                <thead>
                <tr className={'border-b border-gray-500'}>
                    {/* Використовуємо коректні класи Tailwind для ширини */}
                    <th className={'py-2 pr-2 w-[8%]'}>№</th>
                    <th className={'py-2 w-[42%]'}>{t('Checkout.product')}</th>
                    <th className={'py-2 text-center w-[15%]'}>{t('Checkout.qty')}</th>
                    <th className={'py-2 text-right w-[17%]'}>{t('Checkout.price')}</th>
                    <th className={'py-2 text-right w-[18%]'}>{t('Checkout.sum')}</th>
                </tr>
                </thead>
                <tbody>
                {cart.items.map((item, index) => (
                    <tr key={item.id} className={'border-b border-gray-100 hover:bg-gray-50'}>
                        <td className={'py-3 pr-2 text-gray-500'}>{index + 1}</td>
                        <td className={'py-3 pr-2 break-words'}>
                            <div className={'font-medium text-black truncate'}>{item.title}</div>
                            <div className={'text-xs text-gray-500 leading-tight truncate'}>{item.subtitle}</div>
                        </td>
                        <td className={'py-3 text-center'}>{item.quantity}</td>
                        <td className={'py-3 text-right whitespace-nowrap'}>{item.regularPrice || item.price}</td>
                        <td className={'py-3 text-right font-medium whitespace-nowrap'}>
                            {item.regularPrice ? item.regularPrice * item.quantity : item.price * item.quantity}
                        </td>
                    </tr>
                ))}

                {promoCode && (
                    <tr className={'text-base'}>
                        <td colSpan={3} className={'text-gray-500 border-t text-center pt-4 pb-2'}>
                            <span className={'mr-2'}>{t('PromoCodeForm.promoCode')}:</span>
                            <PromoBage/>
                        </td>
                        <td className={'border-t text-gray-500 text-center'}>
                            {!!cart.promoDiscount && cart.promoDiscount > 0 && t('Checkout.sum')}
                            <br/> {t('Checkout.discount')}
                        </td>
                        <td colSpan={2} className={'text-right border-t text-gray-500'}>
                            {!!cart.promoDiscount && cart.promoDiscount > 0 && (
                                <span className={'over-lined'}>
                                    {cart.preSubtotal} {assets.currency}
                                </span>)} <br/>
                                    {cart.promoDiscount} {assets.currency}

                        </td>
                    </tr>
                )}

                {promoCode && cart.promoDiscount === 0 && (
                    <tr>
                        <td colSpan={5} className={'py-3 text-center break-words'}>
                            <p className={'text-sm text-gray-700'} style={{ maxWidth: '480px' }}>
                                {t('PromoCodeForm.noDiscount')}
                            </p>
                        </td>
                    </tr>
                )}

                <tr className={'font-bold text-base'}>
                    <td colSpan={4} className={'py-4 text-right uppercase pt-4 border-t'}>
                        {t('Checkout.total')}
                    </td>
                    <td colSpan={2} className={'py-4 text-right pt-4 border-t'}>
                        {cart.subtotal} {assets.currency}
                    </td>
                </tr>

                <tr>
                    <td colSpan={5} className={'py-3 text-center border-t'}>
                        <b>{t('Checkout.shipping')} : </b>
                        {cart.subtotal < assets.freeShippingThreshold ? (
                            t('Checkout.companyTariff')
                        ) : (
                            <>
                                <span className={'font-bold text-green-500'}>{t('Checkout.freeShipping')}</span>
                                <small><i> ({t('Checkout.freeShippingThreshold')})</i></small>
                            </>
                        )}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}