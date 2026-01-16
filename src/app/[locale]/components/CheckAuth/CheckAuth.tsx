'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { guestCartAdapter } from '@/app/[locale]/services/cart/guestCart.adapter';
import { authCartAdapter } from '@/app/[locale]/services/cart/authCart.adapter';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function CheckAuth() {
    const { checkAuth, user } = useAuthStore();
    const { init } = useCartStore();

    useEffect(() => {

        checkAuth().then();

    }, [checkAuth]);

    useEffect(() => {
        if(user){
            init(authCartAdapter());
        } else {
            init(guestCartAdapter());
        }
    }, [user, init]);

    return null;
}