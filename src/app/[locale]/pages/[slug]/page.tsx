import { getTranslations } from 'next-intl/server';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import NoContent from '@/components/NoContent/NoContent';
import StaticPage from '@/components/StaticPage/StaticPage';
import { getPage } from '@/lib/api/queries';
import type { PageProps } from '@/types/page-props';

export default async function ContentPage(props: PageProps<{ slug: string }>) {
	const { slug, locale } = await props.params;
	const t = await getTranslations('StaticPages');
	const page = await getPage(slug, locale);

	const breadCrumbs = [
		{ id: '0', title: t('Main'), slug: '/' },
		{ id: '1', title: page?.title ?? '', slug: '' },
	];

	return (
		<div className={'w-full flex max-w-[1100px] p-4 flex-col gap-3'}>
			<BreadCrumbs breadcrumbs={breadCrumbs} />
			{!page?.content ? (
				<NoContent />
			) : (
				<StaticPage content={page.content} title={page.title} />
			)}
		</div>
	);
}
