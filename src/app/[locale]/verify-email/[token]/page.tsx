import { getTranslations } from 'next-intl/server';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import LoginLinkButton from '@/components/LoginLinkButton/LoginLinkButton';
import { assets } from '@/config/assets';

export default async function VerifyEmailTokenPage(props: {
	params: Promise<{ token: string }>;
}) {
	const { token } = await props.params;
	const t = await getTranslations();
	const res = await fetch(`${assets.backendUrl}/api/users/verify/${token}`, {
		method: 'POST',
	});
	if (!res.ok) {
		const data = await res.json();
		return (
			<ErrorComponent
				error={data.errors?.[0]?.message || 'Something went wrong'}
			/>
		);
	}

	return (
		<div
			className={
				'mx-auto my-4 w-full max-w-lg border border-gray-300 bg-white p-6 flex flex-col gap-5'
			}
		>
			<h2 className={'text-md font-bold text-green-500 mt-5'}>
				{t('RegisterForm.successfulActivation')}
			</h2>
			<p>{t('RegisterForm.loginWithCredentials')} </p>
			<LoginLinkButton />
		</div>
	);
}
