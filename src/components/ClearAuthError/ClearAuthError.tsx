'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

export default function ClearAuthError() {
    const pathname = usePathname();
    const { clearError } = useAuthStore();

    // `pathname` is listed on purpose: the stale auth error is cleared on every navigation.
    // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value used inside.
    useEffect(() => {
        clearError();
    }, [clearError, pathname]);

    return null;
}