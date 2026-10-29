'use client';

import { useEffect } from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useModal } from '@/hooks/useModal';

export default function LoginPage() {
	const { showModal } = useModal();

	useEffect(() => {
		showModal(<LoginForm />, 'zoom');
	}, [showModal]);

	return null;
}
