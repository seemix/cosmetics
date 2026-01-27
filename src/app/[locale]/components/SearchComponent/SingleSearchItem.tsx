import Image from 'next/image';

import type { IProduct } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';
import Link from 'next/link';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function SingleSearchItem({ product }: { product: IProduct }) {
    const { title, subtitle, retailPrice, wholesalePrice, gallery, slug } = product;
    const { backendUrl, currency } = assets;

    const { hideModal } = useModal();

    return (
        <div className={'w-full items-center justify-between max-w-95 flex gap-3 border-b border-gray-300 p-2'}>
            <Image src={`${backendUrl}${gallery[0].image.sizes.thumbnail.url}`} width={80} height={80} alt={title}/>
            <Link href={`/product/${slug}`} onClick={hideModal}>
                <div className={'hover:underline'}>
                    <p className={'text-md font-bold'}>{title}</p>
                    <p className={'text-xs'}>{subtitle}</p>
                </div>
            </Link>
            <p className={`text-md font-bold whitespace-nowrap 
                          ${wholesalePrice ? 'text-green-500' : 'text-[var(--main)]'}`}>
                {wholesalePrice || retailPrice} {currency}
            </p>
        </div>


    );
}