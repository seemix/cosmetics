// Sample data that exists on the production backend. Override via env when testing another backend.
export const sample = {
	category: process.env.E2E_CATEGORY || 'powder',
	brand: process.env.E2E_BRAND || 'uppercut-deluxe',
	product:
		process.env.E2E_PRODUCT || 'uppercut-scull-dust-styling-powder-ltd-2026',
	post: process.env.E2E_POST || 'clay-spray',
	page: process.env.E2E_PAGE || 'about-us',
	query: process.env.E2E_QUERY || 'wax',
};

export const pages = [
	{ name: 'home', path: '/ru' },
	{ name: 'home-ro', path: '/ro' },
	{ name: 'catalog', path: '/ru/catalog' },
	{ name: 'category', path: `/ru/category/${sample.category}` },
	{ name: 'brand', path: `/ru/brand/${sample.brand}` },
	{ name: 'product', path: `/ru/product/${sample.product}` },
	{ name: 'search', path: `/ru/search?query=${sample.query}` },
	{ name: 'news', path: '/ru/news' },
	{ name: 'post', path: `/ru/news/${sample.post}` },
	{ name: 'static-page', path: `/ru/pages/${sample.page}` },
	{ name: 'checkout-empty', path: '/ru/checkout' },
	{ name: 'register', path: '/ru/register' },
];
