import { getTranslations } from 'next-intl/server';

export default async function PartnershipPage() {

    const t = await getTranslations('StaticPages');

    return (
        <div>
            <h2 className={'text-2xl'}>{t('Partnership')}</h2>
        </div>
    );
}