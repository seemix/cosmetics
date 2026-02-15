import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import type { PostCard } from '@/app/[locale]/types/post-card';
import { assets } from '@/app/[locale]/assets/assets';
import Link from 'next/link';

export default async function NewsCard({ post, locale }: { post: PostCard, locale: string }) {

    const t = await getTranslations('StaticPages');
    const { title, slide, excerpt, slug } = post;
    const { backendUrl } = assets;
    const date = new Date(post.createdAt);
    const formattedDate = new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'long', day: 'numeric'
    }).format(date);

    return (
        <div className={'w-full my-2 p-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]'}>
            <div>
                <p className={'text-gray-500 text-right text-sm'}>{formattedDate}</p>
                <h3 className={'text-xl text-center mb-4 font-semibold'}>{title}</h3>
            </div>
            <div className={'grid md:grid-cols-[auto_1fr] gap-4'}>
                <div className={'w-full aspect-video md:w-70 relative my-1'}>
                    <Image src={`${backendUrl}${slide.sizes.medium.url}`} alt={`${slide.alt} || postImage`}
                           fill/>
                </div>
                <p>{excerpt}</p>
            </div>
            <div className={'w-full flex justify-end -mt-3'}>
                <Link href={`news//${slug}`}>
                <button type={'button'}
                        className={`border border-black p-2 transition-colors hover:border-[var(--main)] 
                                        hover:text-[var(--main)] cursor-pointer mt-4 mb-3`}>
                    {t('readMore')}
                </button>
                </Link>
            </div>
        </div>
    );
}