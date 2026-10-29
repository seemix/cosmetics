import { expect, test } from '@playwright/test';
import { pages, sample } from './fixtures';

for (const { name, path } of pages) {
	test(`${name} renders without errors`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBeLessThan(400);
		await expect(page.locator('header')).toBeVisible();
		await expect(page.locator('footer')).toBeVisible();
		await expect(page.getByText('Something went wrong')).toHaveCount(0);
	});
}

test('unknown product shows the empty state', async ({ page }) => {
	await page.goto('/ru/product/__does-not-exist__');
	await expect(page.getByText('Ничего не найдено')).toBeVisible();
	await expect(page.getByText('Something went wrong')).toHaveCount(0);
});

test('protected routes redirect a guest to the localized home page', async ({
	page,
}) => {
	await page.goto('/ro/orders');
	await expect(page).toHaveURL(/\/ro\/?$/);
});

test('language switch keeps the query string', async ({ page, isMobile }) => {
	test.skip(isMobile, 'switcher is in the desktop top bar');
	await page.goto(`/ru/search?query=${sample.query}`);
	await page
		.getByRole('button', { name: 'RU', exact: true })
		.filter({ visible: true })
		.click();
	await page.getByRole('button', { name: 'RO', exact: true }).click();
	await expect(page).toHaveURL(
		(url) =>
			url.pathname === '/ro/search' &&
			url.searchParams.get('query') === sample.query,
	);
});

test('search modal opens from the header', async ({ page }) => {
	await page.goto('/ru');
	await page
		.locator('header')
		.getByRole('button', { name: 'search' })
		.first()
		.click();
	await expect(page.locator('#search')).toBeVisible();
});

test('cart panel opens from the header', async ({ page }) => {
	await page.goto('/ru');
	await page.locator('header').getByRole('button', { name: 'Cart' }).click();
	await expect(
		page.getByRole('button', { name: 'Close', exact: true }),
	).toBeVisible();
});

test('product page head has a canonical pointing to itself', async ({
	page,
}) => {
	await page.goto(`/ru/product/${sample.product}`);
	const canonical = await page
		.locator('link[rel="canonical"]')
		.getAttribute('href');
	expect(canonical).toContain(`/ru/product/${sample.product}`);
});

test('category page canonical is not the home page', async ({ page }) => {
	await page.goto(`/ru/category/${sample.category}`);
	const canonical = await page
		.locator('link[rel="canonical"]')
		.getAttribute('href');
	expect(canonical).toContain(`/ru/category/${sample.category}`);
});

test('product gallery opens full screen and closes with Escape', async ({
	page,
}) => {
	await page.goto(`/ru/product/${sample.product}`);
	await page
		.getByRole('button', { name: 'product-gallery-image' })
		.first()
		.click();
	const close = page.locator('button[aria-label="close gallery"]');
	await expect(close).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(close).toBeHidden();
});

test('catalog menu shows brands on hover', async ({ page, isMobile }) => {
	test.skip(isMobile, 'desktop menu');
	await page.goto('/ru');
	await page
		.locator('header nav')
		.getByText('Бренды')
		.filter({ visible: true })
		.hover();
	await expect(
		page
			.locator('header nav a[href*="/brand/"]')
			.filter({ visible: true })
			.first(),
	).toBeVisible();
});

test('sorting updates the url', async ({ page }) => {
	await page.goto(`/ru/category/${sample.category}`);
	await page
		.locator('main button', { hasText: 'по умолчанию' })
		.first()
		.click();
	await page.getByRole('button', { name: 'по цене 0-9' }).click();
	await expect(page).toHaveURL(/sort=price-asc/);
});

test('unknown brand shows the empty state instead of crashing', async ({
	page,
}) => {
	await page.goto('/ru/brand/__does-not-exist__');
	await expect(page.getByText('Ничего не найдено')).toBeVisible();
	await expect(page.getByText('Something went wrong')).toHaveCount(0);
});

test('search passes the page number to the backend', async ({ page }) => {
	// The sample query fits on one page, so page 2 must be empty.
	await page.goto(`/ru/search?query=${sample.query}&page=2`);
	await expect(page.getByText('Ничего не найдено')).toBeVisible();
});

test('catalog menu opens from the keyboard', async ({ page, isMobile }) => {
	test.skip(isMobile, 'desktop menu');
	await page.goto('/ru');
	await page
		.locator('header nav [role="button"]', { hasText: 'Бренды' })
		.focus();
	await expect(
		page
			.locator('header nav a[href*="/brand/"]')
			.filter({ visible: true })
			.first(),
	).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(
		page.locator('header nav a[href*="/brand/"]').filter({ visible: true }),
	).toHaveCount(0);
});
