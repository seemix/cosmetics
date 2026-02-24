import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'admin.nextlevelshop.md',
				port: '',
				pathname: '/**',
			},
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
