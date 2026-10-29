'use client';

import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';

import LoginForm from '@/components/LoginForm/LoginForm';

export default function LoginPage() {

    const { showModal } = useModal();

    useEffect(() => {
     showModal(<LoginForm/>, 'zoom');
    }, [showModal]);

    return null;
}