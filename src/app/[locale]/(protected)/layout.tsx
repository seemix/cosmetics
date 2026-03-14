import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { assets } from '@/app/[locale]/assets/assets';

export default async function ProtectedRoutes({ children }: { children: React.ReactNode }) {

    const { backendUrl } = assets;
    const cookieStore = await cookies();
    const token = cookieStore.get('payload-token')?.value;

    const res = await fetch(`${backendUrl}/api/users/me`, {
        headers: {
            'Cookie': `payload-token=${token}`,
            'Content-Type': 'application/json',
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