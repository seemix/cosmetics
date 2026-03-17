import type { IBreadcrumb } from '@/app/[locale]/types/breadcrumb';
import type { ProductCategory } from '@/app/[locale]/types/product';

export function buildCategoryChain(
    category: ProductCategory | null | undefined,
): IBreadcrumb[] {
    if (!category) return [];

    const toItem = ({ id, title }: ProductCategory): IBreadcrumb => ({
        id,
        title,
        slug: '',
    });

    return [
        category.parent ? toItem(category.parent) : null,
        toItem(category),
    ].filter((item): item is IBreadcrumb => item !== null);
}