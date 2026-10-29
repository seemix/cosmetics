import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import StaticPage from '@/components/StaticPage/StaticPage';
import { getPost } from '@/lib/api/queries';
import { pageMetadata } from '@/lib/seo/metadata';
import type { PageProps } from '@/types/page-props';

export async function generateMetadata(
	props: PageProps<{ slug: string }>,
): Promise<Metadata> {
	const { locale, slug } = await props.params;
	const post = await getPost(slug, locale);
	return pageMetadata({
		locale,
		path: `/news/${slug}`,
		title: post?.title ?? slug,
		noindex: !post,
	});
}

export default async function SinglePostPage(
	props: PageProps<{ slug: string }>,
) {
	const { locale, slug } = await props.params;
	const t = await getTranslations('StaticPages');
	const post = await getPost(slug, locale);

	const breadCrumbs = [
		{ id: '0', title: t('News'), href: '/news' },
		{ id: '1', title: post?.title ?? '' },
	];

	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			{!post?.title ? (
				<NoContent />
			) : (
				<StaticPage content={post.content} title={post.title} />
			)}
		</div>
	);
}
