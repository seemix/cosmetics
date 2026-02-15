import { getTranslations } from 'next-intl/server';

import { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, StaticPage } from '@/app/[locale]/components';

export default async function BrandPage(props: propsType) {
    const t = await getTranslations('CatalogMenu');
    const { slug, locale } = await props.params;
    const { backendUrl } = assets;
    const brand = await fetch(`${backendUrl}/api/brands/${slug}?locale=${locale}`).then(res => res.json());
    const breadCrumbs =
        [{ id: '1', title: t('brands'), slug: 'brands' },
            { id: brand?.id, title: brand?.title, slug: brand?.slug }];

    return (<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <div className={'p-4'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
            </div>
            <StaticPage content={brand?.description} title={brand?.title}/>
        </div>
    );
}