import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from 'lexical';

import { richTextImagePathConverter } from '@/app/[locale]/services/richTextimagePathConverter';

export default function StaticPage({ title, content }: { title: string, content: SerializedEditorState }) {
    return (
        <div className={'w-full max-w-[1100px] mx-auto'}>
            <h2 className={'text-2xl mt-4 text-center font-semibold'}>{title}</h2>
            <div>
                <RichText
                    data={content}
                    converters={richTextImagePathConverter}
                />
            </div>
        </div>
    );
}