'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { guestCartAdapter } from '@/app/[locale]/services/cart/guestCart.adapter';
import { authCartAdapter } from '@/app/[locale]/services/cart/authCart.adapter';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function CheckAuth() {
    const { checkAuth, user, authChecked } = useAuthStore();
    const { init } = useCartStore();

    useEffect(() => {
        checkAuth().then();
    }, [checkAuth]);

    useEffect(() => {
      if (!authChecked) return;
        init(user ? authCartAdapter() : guestCartAdapter());
    }, [user, init, authChecked]);
    return null;
}
