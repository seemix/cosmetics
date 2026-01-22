'use client';

import { useTranslations } from 'next-intl';
import { VscError } from 'react-icons/vsc';

export default function ErrorComponent({ error }: { error: string }) {

    const t = useTranslations('Catalog');

    return <div className={`w-full h-full flex flex-col items-center justify-center min-h-[300px] p-6 bg-gray-50 
                            border-1 border-dashed border-gray-300 gap-4 max-w-[1100px] mt-4 mb-4`}>
        <VscError size={70} className={'text-red-300'}/>
        <h3 className={'text-gray-500 text-2xl'}>{t('Error')}</h3>
        <h4>Something went wrong 😢</h4>
        <p>{error}</p>
    </div>;
}