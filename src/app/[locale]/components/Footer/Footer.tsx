import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FaInstagram, FaPhoneSquareAlt, FaTelegramPlane } from 'react-icons/fa';

import { assets } from '@/app/[locale]/assets/assets';

export default async function Footer() {

    const t = await getTranslations();

    return (
        <footer className={'w-full bg-foreground pb-25 sm:pb-0'}>
            <div className={`p-5 text-sm flex flex-wrap gap-3 max-w-[1100px] text-gray-500 
                            justify-evenly mx-auto`}>
                <div className={'flex flex-col gap-2 p-2'}>
                    <p className={'tracking-normal uppercase mb-3'}>{t('Footer.info')}</p>
                    <Link href={'/pages/about-us'} className={`hover:text-[var(--main)] transition-colors duration-300`}>
                        {t('StaticPages.About')}
                    </Link>
                    <Link href={'/pages/payment-and-delivery'}
                          className={`hover:text-[var(--main)] transition-colors duration-300`}>
                        {t('StaticPages.PaymentAndDelivery')}
                    </Link>
                    <Link href={'/pages/partnership'} className={`hover:text-[var(--main)] transition-colors duration-300`}>
                        {t('StaticPages.Partnership')}
                    </Link>
                </div>
                <div className={'flex flex-col gap-2 p-2'}>
                    <p className={'tracking-normal uppercase mb-3'}>{t('Footer.more')}</p>
                    <Link href={'/news'} className={`hover:text-[var(--main)] transition-colors duration-300`}>
                        {t('StaticPages.News')}
                    </Link>
                    <Link href={'/orders'} className={`hover:text-[var(--main)] transition-colors duration-300`}>
                        {t('Footer.ordersHistory')}
                    </Link>
                </div>
                <div className={'flex flex-col gap-2 p-2'}>
                    <p className={'tracking-normal uppercase mb-3'}>{t('Header.contacts')}</p>
                    <Link href={`tel:${assets.phone}`}
                          className={`text-dark flex items-center text-sm transition-colors duration-300 
                                            hover:text-[var(--main)]`}>
                        <FaPhoneSquareAlt className={'w-9 sm:w-5 h-auto mr-1'} />
                        <p>{assets.phone}</p>
                    </Link>
                    <Link href={assets.telegramLink}
                          className={'flex transition-colors duration-300 hover:text-[var(--main)] text-dark items-center'}>
                        <FaTelegramPlane className={'w-9 sm:w-5 h-auto lg:w-4 mt-0 mr-2'} />Telegram
                    </Link>
                    <Link href={assets.instagramLink}
                          className={`flex transition-colors duration-300 hover:text-[var(--main)] text-dark items-center`}>
                        <FaInstagram className={'w-9 sm:w-5 h-auto animate-fade-in mr-1'} /> Instagram
                    </Link>

                </div>
            </div>
            <div className={'p-1 bg-foreground flex justify-center text-gray-400 text-xs'}>Next Level Shop © 2026</div>
        </footer>
    );
};