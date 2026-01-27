'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';

export default function ClearAuthError() {
    const pathname = usePathname();
    const { clearError } = useAuthStore();

    useEffect(() => {
        clearError();
    }, [clearError, pathname]);

    return null;
}