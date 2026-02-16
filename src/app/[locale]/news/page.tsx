import { getTranslations } from 'next-intl/server';

import { assets } from '@/app/[locale]/assets/assets';
import { BreadCrumbs, NewsCard, Pagination } from '@/app/[locale]/components';
import type { propsType } from '@/app/[locale]/types/server-component-params';
import type { PostCard } from '@/app/[locale]/types/post-card';
import type { PaginationProps } from '@/app/[locale]/types/pagination';

export default async function NewsPage(props: propsType) {
    const t = await getTranslations('StaticPages');
    const { locale } = await props.params;
    const resp = await fetch(`${assets.backendUrl}/api/posts`).then(res => res.json());

    const pagination: PaginationProps = {
        page: resp.page,
        hasPrevPage: resp.hasPrevPage,
        hasNextPage: resp.hasNextPage,
        totalPages: resp.totalPages,
        limit: resp.limit,
        totalDocs: resp.totalDocs
    }
    const breadCrumbs = [
        { id: '0', title: t('Main'), slug: 'main' },
        { id: '1', title: t('News'), slug: 'news' }
    ];

    return (
        <div className={'max-w-[1000px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4 pb-5 px-3'}>
            <div className={'p-4 mt-3'}>
                <BreadCrumbs breadcrumbs={breadCrumbs}/>
            </div>
            {resp.docs.map((doc: PostCard) => <NewsCard key={doc.id} post={doc} locale={locale}/>)}
            {pagination.totalPages > 1 && <Pagination pagination={pagination}/>}
        </div>
    );
}