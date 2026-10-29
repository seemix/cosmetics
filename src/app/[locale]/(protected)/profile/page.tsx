import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import ProfileForm from '@/components/ProfileForm/ProfileForm';

export default async function ProfilePage() {
	const t = await getTranslations('Account');
	const breadCrumbs = [
		{ id: '0', title: t('account') },
		{ id: '1', title: t('profile') },
	];

	return (
		<div
			className={
				'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'
			}
		>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			<ProfileForm />
		</div>
	);
}
