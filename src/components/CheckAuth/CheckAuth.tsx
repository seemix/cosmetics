'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { authCartAdapter } from '@/lib/cart/authCart.adapter';
import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';

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
