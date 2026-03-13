export type PostCard = {
    createdAt: string;
    updatedAt: string;
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    slide: {
        alt: string;
        blurHash: string;
        sizes: {
            thumbnail: {
                url: string;
            },
            medium: {
                url: string;
            },
        },
        url: string;
    },
    "square-slide": {
        alt: string;
        blurHash: string;
        sizes: {
            thumbnail: {
                url: string;
            },
            medium: {
                url: string;
            },
        },
        url: string;
    },
}