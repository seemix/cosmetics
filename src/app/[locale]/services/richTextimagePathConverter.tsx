import Image from 'next/image';
import { defaultJSXConverters } from '@payloadcms/richtext-lexical/react';

import { assets } from '@/app/[locale]/assets/assets';

const { backendUrl } = assets;

export const richTextImagePathConverter = {
    ...defaultJSXConverters,
    upload: ({ node }: any) => {
        const src = node.value?.url;
        if (!src) return null;

        const fullSrc = src.startsWith('http')
            ? src
            : `${backendUrl}${src}`;

        return (
            <div className={'my-6 flex justify-center'}>
                <Image
                    src={fullSrc}
                    alt={node.value?.alt || 'image'}
                    width={node.value?.width || 500}
                    height={node.value?.height || 400}
                    className={'rounded-lg object-cover'}
                />
            </div>
        );
    },
};