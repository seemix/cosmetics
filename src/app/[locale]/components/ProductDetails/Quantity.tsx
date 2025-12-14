'use client';

import { useTranslations } from 'next-intl';

export default function Quantity() {

    const t = useTranslations('Catalog');

    return (
        <div className="flex flex-col gap-2">
        <span className="text-xs tracking-[0.2em] text-gray-600 uppercase">{t('quantity')}</span>

            <div className="flex items-center border border-black">
                <div className={'w-10 h-10 flex items-center justify-center'}>
                    <button
                        className={`w-9 h-9 flex items-center justify-center text-lg text-gray-600 
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer`}
                        type="button">
                        −
                    </button>
                </div>

                <div className={`w-12 h-10 flex items-center justify-center text-sm border-x border-black`}>
                    1
                </div>

                <div className={'w-10 h-10 flex items-center justify-center'}>
                    <button
                        className={`w-9 h-9 flex items-center justify-center text-lg text-gray-600 
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer`}
                        type="button">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}