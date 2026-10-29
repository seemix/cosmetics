import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	images: {
		// Every image is served at quality 80 (decision D3); other values snap to it.
		qualities: [80],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'admin.nextlevelshop.md',
				port: '',
				pathname: '/**',
			},
			// Absolute image URLs inside rich-text content.
			{
				protocol: 'https',
				hostname: 'barbercompany.com',
				port: '',
				pathname: '/**',
			},
		],
		unoptimized: process.env.NODE_ENV === 'development',
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
