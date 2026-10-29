import type { SerializedEditorState } from 'lexical';

export interface IBrand {
    id: string;
    title: string;
    slug: string;
    logo: {
        alt: string;
        sizes: {
            thumbnail: { url?: string }
        },
        url: string;

    },
    description?: SerializedEditorState;
}