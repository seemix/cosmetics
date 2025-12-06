import Link from 'next/link';
import { FaInstagram, FaPhoneSquareAlt, FaTelegramPlane } from 'react-icons/fa';
import { assets } from '@/app/[locale]/assets/assets';

export default function SocialIcons() {
  return (
      <div className={'flex gap-8 sm:gap-4'}>
          <Link href={assets.telegramLink}
                className={'flex transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
              <FaTelegramPlane className={'w-9 sm:w-5 h-auto lg:w-4 mt-0'}/>
          </Link>
          <Link href={assets.instagramLink}
                className={'flex transition-colors duration-300 hover:text-[var(--main)] text-dark'}>
              <FaInstagram className={'w-9 sm:w-5 h-auto animate-fade-in'}/>
          </Link>
          <Link href={`tel:${assets.phone}`}
                className={`text-dark flex items-center text-sm transition-colors duration-300 
                                            hover:text-[var(--main)]`}>
              <FaPhoneSquareAlt className={'w-9 sm:w-5 h-auto'}/>
              <p className={'hidden sm:block'}>{assets.phone}</p>
          </Link>
      </div>
  );
}