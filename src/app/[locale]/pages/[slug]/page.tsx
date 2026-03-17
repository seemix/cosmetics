import { getTranslations } from 'next-intl/server';

import type { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, NoContent, StaticPage } from '@/app/[locale]/components';

export default async function AboutUsPage(props: propsType) {
    const { slug, locale } = await props.params;
    const { backendUrl } = assets;
    const t = await getTranslations('StaticPages');

    const url = new URL(`${backendUrl}/api/pages/${slug}`);
    url.search = new URLSearchParams({
        locale,
    }).toString();
    const { title, content } = await fetch(url).then(res => res.json());
    const breadCrumbs = [
        { id: '0', title: t('Main'), slug: '/' },
        { id: '1', title: title, slug: '' }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            {!content ? <NoContent/> : <StaticPage content={content} title={title}/>}
        </div>
    );
}
