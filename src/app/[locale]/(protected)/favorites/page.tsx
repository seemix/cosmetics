import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, MyFavorites } from '@/app/[locale]/components';

export default async function FavoritesPage() {
    const t = await getTranslations();
    const breadCrumbs = [
        { id: '0', title: t('StaticPages.Main'), slug: '/' },
        { id: '1', title: t('Account.account'), slug: '' },
        { id: '2', title: t('Account.favorites'), slug: '' }
    ];
    return (
        <div className={'max-w-[1100px] w-full p-4'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <MyFavorites/>
        </div>);
}