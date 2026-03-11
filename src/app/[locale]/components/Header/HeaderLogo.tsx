import Link from 'next/link';
import { FaPhoneSquareAlt } from 'react-icons/fa';

import { assets } from '@/app/[locale]/assets/assets';
import { Logo } from '@/app/[locale]/components';

export default function HeaderLogo() {
  return (
    <div className={'w-full flex sm:hidden p-2 bg-foreground justify-between items-center px-3'}>
      <Logo/>
        <Link href={`tel:${assets.phone}`}
              className={`text-dark flex items-center text-sm transition-colors duration-300 
                                            hover:text-[var(--main)]`}>
            <FaPhoneSquareAlt className={'w-6 h-auto mr-1'} />
            <p>{assets.phone}</p>
        </Link>
    </div>
  );
}