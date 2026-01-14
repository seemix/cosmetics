import Image from 'next/image';
import { Quantity } from '@/app/[locale]/components';
import { GoTrash } from 'react-icons/go';
import { assets } from '@/app/[locale]/assets/assets';
import Link from 'next/link';
import { useModal } from '@/app/[locale]/hooks/useModal';


interface ICartItem {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

const { backendUrl, currency } = assets;

export default function CartItem({ product }: { product: ICartItem }) {
    const { hideModal } = useModal();
    return (
        <div className={'grid grid-cols-[auto_1fr_auto_auto] m-6 gap-4 border-b border-gray-300'}>
            <Image src={`${backendUrl}${product.thumbnail}`} alt={product.title} width={80} height={80}/>
            <Link href={`../product/${product.slug}`} onClick={hideModal}
                        className={'transition-colors duration-300 hover:text-[var(--main)]'}>
                <p>{product.title}</p>
                <p className={'text-xs hover:text-[var(--main)]'}> {product.subtitle}</p>
                <p className={'text-center text-lg font-bold'}>{product.price} {currency}</p>
            </Link>
            <div className={'place-self-center'}><Quantity/></div>
            <button className={`cursor-pointer transition-colors duration-300 hover:text-[var(--main)]`}
                    type={'button'}>
                <GoTrash className={'w-6 h-auto mx-2'}/>
            </button>
        </div>
    );
}