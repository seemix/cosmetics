import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { assets } from '@/app/[locale]/assets/assets';

export default async function ProtectedRoutes({ children }: { children: React.ReactNode }) {

    const { backendUrl } = assets;
    const cookieStore = await cookies();
    const res = await fetch(`${backendUrl}/api/users/me`, {
        headers: {
            Cookie: cookieStore.toString()
        },
        credentials: 'include',
        cache: 'no-store'
    });
    const body = await res.json();
    if (!body?.user) {
        redirect('/login');
    }

    return (
        <>
            {children}
        </>
    );
}