import { expect, type Page, test } from '@playwright/test';
import { pages } from './fixtures';

// Triggers `whileInView` animations so every card is in its final state before the screenshot.
async function settle(page: Page) {
	await page.waitForLoadState('networkidle');
	await page.evaluate(async () => {
		for (let y = 0; y < document.body.scrollHeight; y += 400) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 60));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(1200);
}

for (const { name, path } of pages) {
	test(`visual: ${name}`, async ({ page }) => {
		await page.goto(path);
		await settle(page);
		await expect(page).toHaveScreenshot(`${name}.png`, {
			fullPage: true,
			// The hero slider on the home page autoplays, so it is masked there.
			mask: name.startsWith('home')
				? [page.locator('main .swiper').first()]
				: [],
		});
	});
}
