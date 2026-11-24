/**
 * Minimum order total for free shipping, in MDL.
 * Server-only: `RETAIL_FREE_SHIPPING` / `WHOLESALE_FREE_SHIPPING` are read from
 * the environment and must be passed to client components as props.
 */
const DEFAULT_FREE_SHIPPING_THRESHOLD = 2000;

function parseThreshold(value: string | undefined): number {
	if (!value?.trim()) return DEFAULT_FREE_SHIPPING_THRESHOLD;

	const threshold = Number(value);
	return Number.isFinite(threshold) && threshold >= 0
		? threshold
		: DEFAULT_FREE_SHIPPING_THRESHOLD;
}

export const freeShippingThresholds = {
	retail: parseThreshold(process.env.RETAIL_FREE_SHIPPING),
	wholesale: parseThreshold(process.env.WHOLESALE_FREE_SHIPPING),
};
