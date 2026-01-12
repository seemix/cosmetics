'use client';

import { useEffect } from 'react';
import { useModal } from '@/app/[locale]/hooks/useModal';

import { LoginForm, MainPage } from '@/app/[locale]/components';

export default function LoginPage() {

    const { showModal } = useModal();

    useEffect(() => {
     showModal(<LoginForm/>, 'zoom');
    }, [showModal]);

    return <MainPage/>
}