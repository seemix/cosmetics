import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';
import Invoice from '@/components/Invoice/Invoice';
import PromoCodeForm from '@/components/PromoCodeForm/PromoCodeForm';
import { pageMetadata } from '@/lib/seo/metadata';
import type { PageProps } from '@/types/page-props';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { locale } = await props.params;
	const t = await getTranslations('Cart');
	return pageMetadata({
		locale,
		path: '/checkout',
		title: t('checkouting'),
		noindex: true,
	});
}

export default async function CheckoutPage() {
	const t = await getTranslations();
	const breadCrumbs = [
		{ id: '0', title: t('StaticPages.Main'), href: '/' },
		{ id: '1', title: t('Cart.checkouting') },
	];

	return (
		<div className={'max-w-[1100px] w-full mx-auto flex flex-col gap-4 px-4'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			<Invoice />
			<PromoCodeForm />
			<CheckoutForm />
		</div>
	);
}
