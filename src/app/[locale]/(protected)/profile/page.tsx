import { getTranslations } from 'next-intl/server';
import { BreadCrumbs, ProfileForm } from '@/app/[locale]/components';

export default async function ProfilePage() {

    const t = await getTranslations('Account');
    const breadCrumbs = [
        { id: '0', title: t('account'), slug: 'main' },
        { id: '1', title: t('profile'), slug: 'orders' }
    ];

    return (
        <div className={'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <ProfileForm/>
        </div>
    );
}