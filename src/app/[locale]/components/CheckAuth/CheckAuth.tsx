'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/[locale]/stores/auth-store';

export default function CheckAuth() {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth().then();
    }, [checkAuth]);

    return null;
}