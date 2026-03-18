import Link from 'next/link';
import Image from 'next/image';

import type { IBrand } from '@/app/[locale]/types/brand';
import { assets } from '@/app/[locale]/assets/assets';

export default function BrandCard({ brand }: { brand: IBrand }) {

    const { title, logo, slug } = brand;
    const { backendUrl } = assets;

    return (
        <div className={`bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]
                         flex flex-col mx-auto min-w-[110px] max-w-[190px]`}>
            <Link href={`/brands/${slug}`}>
                <div className={'w-full aspect-[30/9] relative'}>
                    <Image src={`${backendUrl}${logo.url}`} alt={logo.alt} fill
                           className={'object-cover'}
                           quality={95}
                    />
                </div>
            </Link>
            <h4 className={'text-center text-base sm:text-md mt-5 mb-3'}>{title}</h4>
        </div>
    );
}