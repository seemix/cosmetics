import Image from 'next/image';

import type { PostCard } from '@/app/[locale]/types/post-card';
import { assets } from '@/app/[locale]/assets/assets';
import Link from 'next/link';

export default async function NewsCard({ post, locale }: { post: PostCard, locale: string }) {

    const { title, slide, slug, customLink } = post;
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
            <Link href={customLink ? `/${customLink}` : `/news/${slug}`}>
                <div className={'block sm:hidden'}>
                    <div className={'relative w-full aspect-square'}>
                        <Image
                            src={`${backendUrl}${post['square-slide'].url}`}
                            placeholder={'blur'}
                            blurDataURL={post['square-slide'].blurHash}
                            alt={slide.alt || 'Mobile slide'}
                            quality={100}
                            fill
                            priority
                            sizes={'100vw'}
                            className={'object-cover'}
                        />
                    </div>
                </div>
                <div className={'hidden sm:block'}>
                    <div className={'relative w-full aspect-[1920/620]'}>
                        <Image
                            src={`${backendUrl}${slide.url}`}
                            alt={slide.alt || 'Desktop slide'}
                            placeholder={'blur'}
                            blurDataURL={slide.blurHash}
                            loading={'eager'}
                            fill
                            priority
                            sizes={'100vw'}
                            className={'object-cover'}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
}