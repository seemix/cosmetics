import Link from 'next/link';
import Image from 'next/image';

import { IBrand } from '@/app/[locale]/types/brand';
import { assets } from '@/app/[locale]/assets/assets';

export default function BrandCard({ brand }: { brand: IBrand }) {

    const { title, logo, slug } = brand;
    const { backendUrl } = assets;

    return (
        <div className={`bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)] w-full max-w-[320px] mx-auto 
                         flex flex-col`}>
            <div className={'w-full aspect-[30/9] relative'}>
                <Link href={`/brands/${slug}`}>
                    <Image src={`${backendUrl}${logo.url}`} alt={logo.alt} fill
                           className={'object-cover relative'}
                    />
                </Link>
            </div>
            <h4 className={'text-center text-lg'}>{title}</h4>
        </div>
    );
}