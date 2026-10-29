'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type { UserState } from '@/types/user-state';

export function useLogoutRefresh(user: UserState | null) {
	const router = useRouter();
	const prevUser = useRef<UserState>(user);

	useEffect(() => {
		if (prevUser.current && user === null) {
			router.refresh();
		}
		prevUser.current = user;
	}, [user, router]);
}
