import { defineConfig, devices } from '@playwright/test';

// Smoke and visual tests are read-only: they never log in, submit forms or create orders,
// so they can run against any backend set via NEXT_PUBLIC_SERVER_URL at build time.
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3101';

export default defineConfig({
	testDir: './e2e',
	timeout: 60_000,
	expect: {
		toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
	},
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	reporter: [['list']],
	use: {
		baseURL,
		trace: 'retain-on-failure',
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } },
	],
	webServer: process.env.E2E_BASE_URL
		? undefined
		: {
				command: 'npm run start -- -p 3101',
				url: baseURL,
				reuseExistingServer: true,
				timeout: 120_000,
			},
});
