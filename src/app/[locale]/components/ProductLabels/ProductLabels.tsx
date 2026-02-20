'use client';

import { useTranslations } from 'next-intl';

export default function ProductLabels({ action, bestSeller }: { action: boolean, bestSeller: boolean }) {
    const t = useTranslations('Catalog');
    return (
        <div className={'flex gap-1 absolute top-2 left-2 text-sm font-semibold z-5'}>
            {action && <div className={'bg-green-500 p-[.45em] text-white rounded-xs'}>
                {t('action')}
            </div>}
            {bestSeller && <div className={'bg-[var(--main)] p-[.45em] text-white rounded-xs'}>
                {t('bestSeller')}
            </div>}
        </div>
    );
}