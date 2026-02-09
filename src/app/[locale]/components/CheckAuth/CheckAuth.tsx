'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { guestCartAdapter } from '@/app/[locale]/services/cart/guestCart.adapter';
import { authCartAdapter } from '@/app/[locale]/services/cart/authCart.adapter';

export default function CheckAuth() {
    const { checkAuth, user, authChecked } = useAuthStore();
    const { init } = useCartStore();
    const locale = useLocale();

    useEffect(() => {
        checkAuth().then();
    }, [checkAuth]);

    useEffect(() => {
        if (!authChecked) return;
        init(user ? authCartAdapter() : guestCartAdapter(), locale);
    }, [user, init, authChecked, locale]);

    return null;
}
