import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/auth.store';

/**
 * Re-renders the server components after login or logout, so prices switch between
 * retail and wholesale and protected pages redirect a logged-out visitor.
 * The initial session check is not a transition: the server already rendered
 * the page with the visitor's cookies.
 */
export function useSessionRefresh() {
	const router = useRouter();
	const authChecked = useAuthStore((s) => s.authChecked);
	const userId = useAuthStore((s) => s.user?.id ?? null);
	// `undefined` until the session is known.
	const prevUserId = useRef<string | null | undefined>(undefined);

	useEffect(() => {
		if (!authChecked) return;
		if (prevUserId.current !== undefined && prevUserId.current !== userId) {
			router.refresh();
		}
		prevUserId.current = userId;
	}, [authChecked, userId, router]);
}
