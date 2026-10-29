import { describe, expect, it } from 'vitest';
import { buildCategoryChain } from '@/app/[locale]/services/buildCategoryChain';

describe('buildCategoryChain', () => {
	it('returns an empty chain without a category', () => {
		expect(buildCategoryChain(null)).toEqual([]);
	});

	it('puts the parent before the category', () => {
		const chain = buildCategoryChain({
			id: '2',
			title: 'Powder',
			slug: 'powder',
			parent: { id: '1', title: 'Hair', slug: 'hair' },
		});
		expect(chain.map((c) => c.title)).toEqual(['Hair', 'Powder']);
	});
});
