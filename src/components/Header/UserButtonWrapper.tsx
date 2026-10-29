'use client';

import AuthUserButton from '@/components/Header/AuthUserButton';
import UserButton from '@/components/Header/UserButton';
import { useAuthStore } from '@/stores/auth.store';

export default function UserButtonWrapper() {
	const { user } = useAuthStore();
	return <>{user?.name ? <AuthUserButton /> : <UserButton />}</>;
}
