import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['ru', 'ro'],

    // Used when no locale matches
    defaultLocale: 'ru',
    pathnames: {
        '/': '/',
        '/o-nas': {
            ro: '/despre-noi'
        },
        '/oplata-i-dostavka': {
            ro: '/plata-si-livrare'
        },
        '/kontakty': {
            ro: '/contacte'
        }
    }
});