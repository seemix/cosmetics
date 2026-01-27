import Image from 'next/image';
import Link from 'next/link';

import logo from './logo1.webp';

export default function Logo() {
    return (
        <Link href={'/'}>
            <div className={'flex gap-1 items-center'}>
                <Image
                    className={'ml-5 ml-5 w-18 lg:w-20 h-auto'}
                    src={logo}
                    alt={'logo'}
                />

                <div className={'flex flex-col items-center'}>
                    <h1 className={`hidden sm:block text-sm sm:text-xl text-center lg:text-2xl 
                                tracking-tight font-semibold sm:block`}>
                        NEXT LEVEL
                    </h1>
                    <h2 className={`hidden sm:block text-xs sm:text-sm text-center font-(family-name:--font-roboto) 
					            text-sm flex-none sm:flex`}>
                        Barber supply
                    </h2>
                </div>
            </div>
        </Link>
    );
}
