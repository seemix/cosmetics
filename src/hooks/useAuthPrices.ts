import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import type { UserState } from '@/types/user-state';

export function useAuthPrices(user: UserState | null) {
	const router = useRouter();
	const pathname = usePathname();

	const prevUserRef = useRef<UserState | null>(null);

	useEffect(() => {
		const prevUser = prevUserRef.current;

		if (prevUser && !user) {
			router.replace(pathname);
		}

		if (!prevUser && user) {
			router.refresh();
		}

		prevUserRef.current = user;
	}, [user, router, pathname]);
}
