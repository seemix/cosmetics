import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NewsCard from '@/components/NewsCard/NewsCard';
import Pagination from '@/components/Pagination/Pagination';
import { getPosts } from '@/lib/api/queries';
import { pageMetadata } from '@/lib/seo/metadata';
import { firstParam, type PageProps } from '@/types/page-props';
import type { PaginationProps } from '@/types/pagination';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
	const { locale } = await props.params;
	const t = await getTranslations('StaticPages');
	return pageMetadata({ locale, path: '/news', title: t('News') });
}

export default async function NewsPage(props: PageProps) {
	const t = await getTranslations('StaticPages');
	const { locale } = await props.params;
	const searchParams = await props.searchParams;
	const resp = await getPosts(locale, firstParam(searchParams.page));

	const pagination: PaginationProps = {
		page: resp?.page ?? 1,
		hasPrevPage: resp?.hasPrevPage ?? false,
		hasNextPage: resp?.hasNextPage ?? false,
		totalPages: resp?.totalPages ?? 0,
		limit: resp?.limit ?? 0,
		totalDocs: resp?.totalDocs ?? 0,
	};
	const breadCrumbs = [
		{ id: '0', title: t('Main'), href: '/' },
		{ id: '1', title: t('News') },
	];

	return (
		<div
			className={
				'max-w-[1000px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4 pb-5 px-3'
			}
		>
			<div className={'mt-3'}>
				<BreadCrumbs breadcrumbs={breadCrumbs} />
			</div>
			{resp?.docs.map((doc, index) => (
				<NewsCard key={doc.id} post={doc} locale={locale} eager={index === 0} />
			))}
			{pagination.totalPages > 1 && <Pagination pagination={pagination} />}
		</div>
	);
}
