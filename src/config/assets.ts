// Both URLs are read from the environment so that production builds never point at localhost.
// They must stay `NEXT_PUBLIC_*` because `assets` is imported by client components too.
export const assets = {
	currency: 'MDL',
	phoneCode: '+373',
	freeShippingThreshold: 2000,
	backendUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://admin.nextlevelshop.md',
	frontendUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://nextlevelshop.md',
	phone: '+37361033551',
	instagramLink: 'https://instagram.com/nextlvlbarber.md',
	telegramLink: 'https://t.me/nextlvlbarber',
};
