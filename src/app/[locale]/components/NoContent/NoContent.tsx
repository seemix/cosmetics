'use client';

import { useTranslations } from 'next-intl';
import { CiImageOff } from 'react-icons/ci';

export default function NoContent() {

    const t = useTranslations('Catalog');

    return (
        <div className={`flex flex-col items-center justify-center w-full h-full min-h-[300px] p-6 bg-gray-50 
                        border-1 border-dashed border-gray-300`}>
                <CiImageOff size={70} className={'text-gray-400'}/>
            <h3 className={'text-gray-500 text-2xl'}>{t('noContent')}</h3>
        </div>
    );
}