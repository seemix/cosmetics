import { getTranslations } from 'next-intl/server';
import type { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, NoContent, StaticPage } from '@/app/[locale]/components';

export default async function SinglePostPage(props: propsType) {
    const { locale, slug } = await props.params;
    const t = await getTranslations('StaticPages');

    const { title, content } = await fetch(`${assets.backendUrl}/api/posts/${slug}?locale=${locale}`)
        .then(res => res.json());

    const breadCrumbs = [
        { id: '0', title: t('News'), slug: 'news' },
        { id: '1', title: title, slug: slug }
    ];

    return (
        <div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
            <BreadCrumbs breadcrumbs={breadCrumbs}/>
            {!title ? <NoContent/> : <StaticPage content={content} title={title}/>}
        </div>
    );
}