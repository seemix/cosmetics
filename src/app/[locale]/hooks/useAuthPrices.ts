import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { UserState } from '@/app/[locale]/types/user-state';

export function useAuthPrices(user: UserState | null) {
    const router = useRouter();
    const pathname = usePathname();

    // Зберігаємо попередній стан користувача
    const prevUserRef = useRef<UserState | null>(null);

    useEffect(() => {
        const prevUser = prevUserRef.current;

        if (prevUser && !user) {
            // Замінюємо шлях, щоб скинути параметри або захищені дані в URL
            router.replace(pathname);
        }

        if (!prevUser && user) {
            // Оновлюємо серверні дані (Server Components)
            router.refresh();
        }

        // Оновлюємо реф для наступного циклу
        prevUserRef.current = user;
    }, [user, router, pathname]);
}