'use client';

interface QuantityProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function Quantity({ value, setValue }: QuantityProps) {
    const setSafeValue = (updater: number | ((v: number) => number)) => {
        setValue(prev => {
            const next =
                typeof updater === 'function' ? updater(prev) : updater

            return Math.max(1, next)
        })
    }

    const decrease = () => setSafeValue(v => v - 1)
    const increase = () => setSafeValue(v => v + 1)

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSafeValue(Number(e.target.value))
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '')
        setSafeValue(val === '' ? 1 : Number(val))
    }
    return (
        <div className={'flex flex-col gap-2 w-30'}>
            <div className={'flex items-center border border-black h-10'}>
                <button
                    onClick={decrease}
                    className={`w-9 h-8 flex items-center justify-center text-lg text-gray-600
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer`}
                    type={'button'}
                    aria-label={'decrease-quantity'}
                >
                    −
                </button>
                <input
                    type={'text'}
                    inputMode={'numeric'}
                    aria-label={'quantity'}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-11 h-10 text-center text-sm border-x border-black focus:outline-none focus:ring-0`}
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
