import type { SerializedEditorState } from 'lexical';

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

export type ProductCategory = {
    id: string;
    title: string;
    slug: string;
    parent?: ProductCategory;
}

export interface IProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    subtitle: string;
    slug: string;
    article: string;
    wholesalePrice?: number;
    retailPrice: number;
    shortDescription?: string;
    description?: SerializedEditorState;
    brand?: {
        logo: {
            url: string;
        };
        slug: string;
        title: string;
    };
    gallery: ProductGallery[];
    categories?: ProductCategory[];
    relatedProducts?: IProduct[];
}
