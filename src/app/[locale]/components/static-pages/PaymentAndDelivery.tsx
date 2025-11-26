import React from 'react';
import { getTranslations } from 'next-intl/server';

const About = async () => {
    const t = await getTranslations('Header');

    return (
        <h2 className={'text-center text-xl text-black'}>
            {t('paymentAndDelivery')}
        </h2>
    );
};

export default About;