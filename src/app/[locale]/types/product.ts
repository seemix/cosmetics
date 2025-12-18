export type ProductGallery = {
	image: {
		id: string;
		createdAt: string;
		updatedAt: string;
		alt: string;
		url: string;
		blurHash?: string;
		sizes: {
			thumbnail: {
				url: string;
			};
			medium: {
				url: string;
			};
		};
	};
};

export interface IProduct {
	id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	subtitle: string;
	slug: string;
	article: string;
	wholesale?: number;
	price: number;
	shortDescription: string;
	description?: any;
	brand: {
		logo: {
			url: string;
		};
		slug: string;
	};
	gallery: ProductGallery[];
}
