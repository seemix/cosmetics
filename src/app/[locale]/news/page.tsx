import { assets } from '@/app/[locale]/assets/assets';
import { getTranslations } from 'next-intl/server';

import type { PostCard } from '@/app/[locale]/types/post-card';
import type { propsType } from '@/app/[locale]/types/server-component-params';
import { BreadCrumbs, NewsCard } from '@/app/[locale]/components';

export default async function NewsPage(props: propsType) {
    const t = await getTranslations('StaticPages');
    const { locale } = await props.params;
    const { docs } = await fetch(`${assets.backendUrl}/api/posts`).then(res => res.json());
    const breadCrumbs = [
        { id: '0', title: t('Main'), slug: 'main' },
        { id: '1', title: t('News'), slug: 'news' }
    ];

    return (
        <div className={'max-w-[1000px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'}>
            <div className={'p-4 mt-3'}><BreadCrumbs breadcrumbs={breadCrumbs}/></div>
            {docs.map((doc: PostCard) => <NewsCard key={doc.id} post={doc} locale={locale}/>)}
        </div>
    );
}