'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { UserState } from '@/app/[locale]/types/user-state';


export function useLogoutRefresh(user: UserState | null) {
    const router = useRouter()
    const prevUser = useRef<UserState>(user)

    useEffect(() => {
        if (prevUser.current && user === null) {
            router.refresh()
        }
        prevUser.current = user
    }, [user, router])
}