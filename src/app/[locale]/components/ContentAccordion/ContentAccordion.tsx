'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { useTranslations } from 'next-intl';
import type { SerializedEditorState } from 'lexical';
import { motion, AnimatePresence } from 'framer-motion';

import { richTextImagePathConverter } from '@/app/[locale]/services/richTextimagePathConverter';
import { assets } from '@/app/[locale]/assets/assets';

export default function ContentAccordion({ content, logo }: {
    content: SerializedEditorState,
    logo: string
}) {
    const t = useTranslations('Catalog');
    const [isOpen, setIsOpen] = useState(false);
    const childrenNodes = content?.root?.children || [];
    const hasMoreContent = childrenNodes.length > 1;

    const previewContent: SerializedEditorState = {
        root: {
            ...content.root,
            children: childrenNodes.slice(0, 1),
        },
    };

    const remainingContent: SerializedEditorState = {
        root: {
            ...content.root,
            children: childrenNodes.slice(1),
        },
    };

    return (
        <div className={'w-full mx-auto max-w-full border-1 border-gray-300 p-4 bg-white'}>
            <div className={'flex justify-center'}>
                <Image alt={'brand-logo'} src={`${assets.backendUrl}${logo}`} width={180} height={101}
                       className={'aspect-16/9 mb-4'}/>
            </div>

            <div
                className={`prose max-w-none prose-img:max-w-full prose-img:h-auto prose-table:block
                            prose-table:overflow-x-auto break-words`}
            >
                {!hasMoreContent ? (
                    <RichText data={content} converters={richTextImagePathConverter}/>
                ) : (
                    <div>
                        <RichText data={previewContent} converters={richTextImagePathConverter}/>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key={'accordion-content'}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: 'auto',
                                        opacity: 1,
                                        transition: {
                                            height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                                            opacity: { duration: 0.25, delay: 0.2 }
                                        }
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: {
                                            height: { duration: 0.4, delay: 0.15, ease: [0.04, 0.62, 0.23, 0.98] },
                                            opacity: { duration: 0.2 },
                                        }
                                    }}
                                    className={'overflow-hidden'}
                                >
                                    <div className={'pt-4'}>
                                        <RichText data={remainingContent} converters={richTextImagePathConverter}/>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={'flex w-full justify-center'}>
                            <button
                                type={'button'}
                                onClick={() => setIsOpen(!isOpen)}
                                className={`mt-3 text-blue-600 hover:text-blue-800 font-medium transition-colors 
                                            cursor-pointer inline-flex items-center gap-1 focus:outline-none`}
                            >
                                {isOpen ? t('collapse') : t('readMore')}

                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    style={{ display: 'inline-block', originX: 0.5, originY: 0.5 }}
                                    transition={{ duration: .4, ease: 'easeInOut' }}
                                    className="inline-block text-xs"
                                >
                                    ▼
                                </motion.span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}