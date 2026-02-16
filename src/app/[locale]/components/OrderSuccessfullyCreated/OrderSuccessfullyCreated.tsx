'use client';

import { useCheckoutStore } from '@/app/[locale]/stores/checkout.store';

export default function OrderSuccessfullyCreated() {
    const { orderNumber } = useCheckoutStore();

    return (
        <h2 className={'text-2xl'}>
            Заказ №{orderNumber} успешно создан!
        </h2>
    );
}