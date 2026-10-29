'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export default function VerifyEmail() {
	const { pendingName, pendingEmail } = useAuthStore();
	const t = useTranslations('RegisterForm');
	const router = useRouter();

	useEffect(() => {
		if (!pendingName || !pendingEmail) {
			router.replace('../'); // або router.push
		}
	}, [pendingName, pendingEmail, router]);

	if (!pendingName || !pendingEmail) {
		return null;
	}

	return (
		<div
			className={
				'mx-auto my-4 w-full max-w-md border border-gray-300 bg-white p-6'
			}
		>
			<h2 className={'text-2xl text-center my-4'}>{pendingName}!</h2>
			<p className={'text-sm my-1'}>
				{t('successfullyRegistered')} <b>Next Level Shop</b>
			</p>
			<p className={'text-sm mt-2'}>{t('checkEmail')} 👇</p>
			<p className={'text-center font-bold my-2'}>{pendingEmail}</p>
		</div>
	);
}
