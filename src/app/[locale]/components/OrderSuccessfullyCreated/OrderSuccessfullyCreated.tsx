'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { useCheckoutStore } from '@/app/[locale]/stores/checkout.store';
import { assets } from '@/app/[locale]/assets/assets';

export default function OrderSuccessfullyCreated() {
    const { orderNumber, clearOrder } = useCheckoutStore();
    // const router = useRouter();
    const t = useTranslations('Checkout');

    useEffect(() => {
        clearOrder();
    }, [clearOrder]);

    return (
        <div className={'bg-white shadow max-w-xl mx-auto p-5 my-3'}>
            <h2 className={'text-xl text-center font-semibold mb-5 mx-6'}>
                {t('yourOrder')} #{orderNumber} {t('completed')}
            </h2>
            <p className={'mb-3'}>
                📱 {t('weWillConnectYou')}
            </p>
            <p className={'mb-3'}>
                📧 {t('orderEmailSent')}
            </p>
            <p className={'mb-3 font-semibold'}>
                {t('anyQuestions')}
            </p>
            <p>
                👉 {t('contactUs')}
                <Link href={`tel:${assets.phone}`}>{assets.phone}</Link>
            </p>
        </div>
    );
}