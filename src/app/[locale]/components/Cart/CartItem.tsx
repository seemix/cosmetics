import Image from 'next/image';
import { GoTrash } from 'react-icons/go';
import Link from 'next/link';

import { assets } from '@/app/[locale]/assets/assets';
import { CartQuantity } from '@/app/[locale]/components';
import { useModal } from '@/app/[locale]/hooks/useModal';
import { useCartStore } from '@/app/[locale]/stores/cart.store';


interface ICartItem {
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    price: number;
    regularPrice?: number;
    quantity: number;
    thumbnail: string;
}

const { backendUrl, currency } = assets;

export default function CartItem({ cartId, product }: { cartId?: string, product: ICartItem }) {

    const { hideModal } = useModal();
    const { removeItem } = useCartStore();

    return (
        <div className={'grid grid-cols-[auto_1fr_auto_auto] m-2 gap-2 border-b border-gray-300'}>
            <Image src={`${backendUrl}${product.thumbnail}`} alt={product.title} width={80} height={80} quality={95}/>
            <Link href={`../product/${product.slug}`} onClick={hideModal}
                        className={'transition-colors duration-300 hover:text-[var(--main)]'}>
                <p>{product.title}</p>
                <p className={'text-xs hover:text-[var(--main)]'}> {product.subtitle}</p>
                <p className={'text-center text-xl font-medium'}>{product.regularPrice || product.price} {currency}</p>
            </Link>
            <div className={'flex flex-col items-center gap-4 sm:flex-row'}>
                <div className={'place-self-center'}>
                    <CartQuantity productId={product.id} quantity={product.quantity}/>
                </div>
                <button onClick={() => removeItem(cartId as string, product.id)}
                        className={`cursor-pointer transition-colors duration-300 hover:text-[var(--main)]`}
                        type={'button'}>
                    <GoTrash className={'w-5 h-auto mx-2'}/>
                </button>
            </div>
        </div>
    );
}