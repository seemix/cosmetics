import type { IBreadcrumb } from '@/types/breadcrumb';
import type { ProductCategory } from '@/types/product';

export function buildCategoryChain(
	category: ProductCategory | null | undefined,
): IBreadcrumb[] {
	if (!category) return [];

	const toItem = ({ id, title, slug }: ProductCategory): IBreadcrumb => ({
		id,
		title,
		href: `/category/${slug}`,
	});

	return [
		category.parent ? toItem(category.parent) : null,
		toItem(category),
	].filter((item): item is IBreadcrumb => item !== null);
}
