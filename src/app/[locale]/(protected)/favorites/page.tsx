import { getTranslations } from 'next-intl/server';

import { BreadCrumbs, MyFavorites } from '@/app/[locale]/components';

export default async function FavoritesPage() {
    const t = await getTranslations('Account');
    const breadCrumbs = [
        { id: '0', title: t('account'), slug: 'main' },
        { id: '1', title: t('favorites'), slug: 'favorites' }
    ];
    return (
        <div className={'max-w-[1100px] w-full p-4'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <MyFavorites/>
        </div>);
}