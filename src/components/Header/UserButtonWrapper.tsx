'use client';

import { useAuthStore } from '@/stores/auth.store';
import AuthUserButton from '@/components/Header/AuthUserButton';
import UserButton from '@/components/Header/UserButton';

export default function UserButtonWrapper() {
    const { user } = useAuthStore();
    return (
        <>
            {user?.name ? <AuthUserButton/> : <UserButton/>}
        </>
    );
}