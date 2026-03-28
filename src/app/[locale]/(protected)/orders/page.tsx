import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';


import { BreadCrumbs, MyOrders } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';
import type { propsType } from '@/app/[locale]/types/server-component-params';

export default async function OrdersPage(props: propsType) {
    const { locale } = await props.params;
    const t = await getTranslations('Account');
    const breadCrumbs = [
        { id: '0', title: t('account'), slug: 'main' },
        { id: '1', title: t('orders'), slug: 'orders' }
    ];
    const cookieStore = await cookies();
    const { docs } = await fetch(`${assets.backendUrl}/api/orders/my?locale=${locale}`,{
        headers: {
            Cookie: cookieStore.toString()
        },
    }).then(res => res.json());

    return (
        <div className={'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <MyOrders orders={docs}/>
        </div>
    );
}