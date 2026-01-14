'use client';

import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { AuthUserButton, UserButton } from '@/app/[locale]/components';

export default function UserButtonWrapper() {
    const { user } = useAuthStore();
    return (
        <>
            {user?.name ? <AuthUserButton/> : <UserButton/>}
        </>
    );
}