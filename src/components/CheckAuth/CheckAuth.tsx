'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useSessionRefresh } from '@/hooks/useSessionRefresh';
import { authCartAdapter } from '@/lib/cart/authCart.adapter';
import { guestCartAdapter } from '@/lib/cart/guestCart.adapter';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';

/** Restores the session on load and keeps the cart in sync with it. */
export default function CheckAuth() {
	const checkAuth = useAuthStore((s) => s.checkAuth);
	const authChecked = useAuthStore((s) => s.authChecked);
	const userId = useAuthStore((s) => s.user?.id ?? null);
	const init = useCartStore((s) => s.init);
	const locale = useLocale();

	useSessionRefresh();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// Keyed by user id, so a profile update doesn't reload the cart.
	useEffect(() => {
		if (!authChecked) return;
		init(userId ? authCartAdapter() : guestCartAdapter(), locale);
	}, [userId, init, authChecked, locale]);

	return null;
}
