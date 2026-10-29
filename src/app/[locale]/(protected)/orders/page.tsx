import { getTranslations } from 'next-intl/server';

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import MyOrders from '@/components/MyOrders/MyOrders';
import { getMyOrders } from '@/lib/api/queries';
import type { PageProps } from '@/types/page-props';

export default async function OrdersPage(props: PageProps) {
	const { locale } = await props.params;
	const t = await getTranslations('Account');
	const breadCrumbs = [
		{ id: '0', title: t('account'), href: '/profile' },
		{ id: '1', title: t('orders') },
	];
	const orders = await getMyOrders(locale);

	return (
		<div
			className={
				'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'
			}
		>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			<MyOrders orders={orders} />
		</div>
	);
}
