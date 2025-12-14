type ProductGallery = {
    image: {
        id: string;
        createdAt: string;
        updatedAt: string;
        alt: string;
        url: string;
        thumbnail: string | null;
    }
}

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
        },
        slug: string;
    };
    gallery: ProductGallery[];
}