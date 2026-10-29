'use client';

import AuthUserButton from '@/components/Header/AuthUserButton';
import UserButton from '@/components/Header/UserButton';
import { useAuthStore } from '@/stores/auth.store';

export default function UserButtonWrapper() {
	const isLoggedIn = useAuthStore((s) => Boolean(s.user?.name));
	return <>{isLoggedIn ? <AuthUserButton /> : <UserButton />}</>;
}
