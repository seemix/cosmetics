import Image from 'next/image';
import Link from 'next/link';

import type { OrderItemType } from '@/app/[locale]/types/order';
import { assets } from '@/app/[locale]/assets/assets';

export default function SingleOrderItem({ item, index }: { item: OrderItemType, index: number }) {
    const { backendUrl } = assets;

    return (
        <tr className={'border-b-1 border-gray-500'}>
            <td className={'py-3 pr-2 text-gray-500'}>{index + 1}</td>
            <td>
                <Link href={`/product/${item.slug}`}
                      className={'flex gap-2 items-center  group'}>
                    <Image src={`${backendUrl}${item.thumbnail}`} width={70} height={70} alt={item.title}/>
                    <div>
                        <p className={'transition-colors duration-300 group-hover:text-[var(--main)]'}>{item.title}</p>
                        <p className={`transition-colors duration-300 text-sm text-gray-400 
                                        group-hover:text-[var(--main)]`}>
                            {item.subtitle}
                        </p>
                    </div>
                </Link>
            </td>
            <td className={'py-3 text-center'}>{item.quantity}</td>
            <td className={'py-3 text-right'}>{item.price}</td>
            <td className={'py-3 text-right font-medium'}>
                {item.price * item.quantity}
            </td>
        </tr>
    );
}