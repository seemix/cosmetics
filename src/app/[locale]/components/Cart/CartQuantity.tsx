'use client';

import { useState } from 'react';

import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function CartQuantity({ productId, quantity = 1 }: { productId: string, quantity: number }) {
    const [value, setValue] = useState(quantity);
    const { updateQty } = useCartStore();

    const decrease = () => {
        const next = Math.max(1, value - 1);
        setValue(next);
        updateQty({ productId, quantity: next }).then();
    };

    const increase = () => {
        const next = value + 1;
        setValue(next);
        updateQty({ productId, quantity: next }).then();
    };

    const onBlur = () => {
        updateQty({ productId, quantity: value }).then();
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        setValue(val === '' ? 1 : Number(val));
    };

    return (
        <div className={'flex flex-col gap-1'}>
            <div className={'flex items-center border border-black h-9'}>
                <button
                    onClick={decrease}
                    className={`w-8 h-7 flex items-center justify-center text-lg text-gray-600
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer`}
                    type={'button'}
                    aria-label={'decrease-quantity'}
                >
                    −
                </button>
                <input
                    type={'text'}
                    inputMode={'numeric'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-10 h-9 text-center text-sm border-x border-black focus:outline-none focus:ring-0`}
                />

                <button
                    onClick={increase}
                    className={`w-9 h-8 flex items-center justify-center text-lg text-gray-600
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer`}
                    type={'button'}
                    aria-label={'increase-quantity'}
                >
                    +
                </button>
            </div>
        </div>
    );
}
