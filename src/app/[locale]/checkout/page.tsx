import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, CheckoutForm, Invoice, PromoCodeForm } from '@/app/[locale]/components';
import { freeShippingThresholds } from '@/config/shipping';

export default async function CheckoutPage() {
    const t = await getTranslations();
    const breadCrumbs = [
        { id: '0', title: t('StaticPages.Main'), slug: 'main' },
        { id: '1', title: t('Cart.checkouting'), slug: 'checkout' }
    ];

    return (
        <div className={'max-w-[1100px] w-full mx-auto flex flex-col gap-4 px-4'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <Invoice
                retailFreeShippingThreshold={freeShippingThresholds.retail}
                wholesaleFreeShippingThreshold={freeShippingThresholds.wholesale}
            />
            <PromoCodeForm/>
            <CheckoutForm/>
        </div>
    );
}