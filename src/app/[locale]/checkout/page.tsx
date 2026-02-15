import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, CheckoutForm, Invoice } from '@/app/[locale]/components';

export default async function CheckoutPage() {
    const t = await getTranslations();
    const breadCrumbs = [
        { id: '0', title: t('StaticPages.Main'), slug: 'main' },
        { id: '1', title: t('Cart.checkouting'), slug: 'checkout' }
    ];

    return (
        <div className={'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'}>
            <div className={'p-4'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
            </div>
            <Invoice/>
            <CheckoutForm/>
        </div>
    );
}