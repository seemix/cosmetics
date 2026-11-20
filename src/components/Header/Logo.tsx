import Image from 'next/image';
import { Link } from '@/i18n/navigation';

import logo from './logo1.webp';

export default function Logo() {
	return (
		<Link href={'/'}>
			<div className={'flex gap-1 items-center'}>
				<Image
					className={'ml-5 sm:ml-0 w-13 sm:w-15 lg:w-[70px] h-auto'}
					src={logo}
					alt={'logo'}
				/>

				<div className={'flex flex-col items-center'}>
					<p
						className={`text-sm sm:text-lg text-center lg:text-xl
                                tracking-tight font-semibold sm:block`}
					>
						NEXT LEVEL
					</p>
					<p className={'text-xs sm:text-[13px] text-center flex-none sm:flex'}>
						Barber supply
					</p>
				</div>
			</div>
		</Link>
	);
}
