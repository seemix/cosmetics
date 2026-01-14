'use client';

import { useState } from 'react';

export default function Quantity() {
	const [value, setValue] = useState(1);

	const decrease = () => {
		setValue((prev) => Math.max(1, prev - 1));
	};

	const increase = () => {
		setValue((prev) => prev + 1);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(/\D/g, '');
		setValue(val === '' ? 1 : Number(val));
	};

	return (
		<div className={'flex flex-col gap-2'}>
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
					value={value}
					onChange={onChange}
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
