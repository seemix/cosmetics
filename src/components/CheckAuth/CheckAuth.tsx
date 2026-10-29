'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { authCartAdapter } from '@/lib/cart/authCart.adapter';

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
