import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
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
