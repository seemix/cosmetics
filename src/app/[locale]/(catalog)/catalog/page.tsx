import { getTranslations } from 'next-intl/server';
import { BreadCrumbs, CatalogMenu } from '@/app/[locale]/components';

export default async function CatalogPage() {
    const t = await getTranslations();

    const breadCrumbs = [
        { id: '0', title: t('StaticPages.Main'), slug: '/' },
        { id: '1', title: t('Catalog.catalog'), slug: '' },
    ];
    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            <CatalogMenu/>
        </div>
    );
}