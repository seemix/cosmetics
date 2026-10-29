'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import FormInput from '@/components/FormInput/FormInput';
import Loader from '@/components/Loader/Loader';
import PasswordResetSuccess from '@/components/PasswordResetSuccess/PasswordResetSuccess';
import { createNewPasswordSchema } from '@/components/SetNewPassword/newPasswordSchema';
import { useAuthStore } from '@/stores/auth.store';

export default function SetNewPassword({ token }: { token: string }) {
	const t = useTranslations('RegisterForm');
	const schema = createNewPasswordSchema(t);
	const { loading, resetPassword, error, passwordHasReset } = useAuthStore(
		useShallow((s) => ({
			loading: s.loading,
			resetPassword: s.resetPassword,
			error: s.error,
			passwordHasReset: s.passwordHasReset,
		})),
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		resolver: zodResolver(schema),
	});
	const submit = async (data: { password: string }) => {
		await resetPassword(token, data.password);
	};

	return (
		<>
			{!error && passwordHasReset && <PasswordResetSuccess />}
			{!error && (
				<form
					className={
						'mx-auto my-4 w-full h-85 max-w-md border border-gray-300 bg-white p-6 relative'
					}
					onSubmit={handleSubmit(submit)}
				>
					<h2
						className={'mb-6 text-xl font-semibold text-gray-800 text-center'}
					>
						{t('inputNewPassword')}
					</h2>
					<div className={'space-y-3'}>
						<FormInput
							label={t('password')}
							register={register('password')}
							id={'password'}
							type={'password'}
							error={errors.password}
						/>
						{/* Confirm password */}
						<FormInput
							label={t('confirmPassword')}
							register={register('confirmPassword')}
							id={'confirmPassword'}
							type={'password'}
							error={errors.confirmPassword}
						/>
						<button
							type={'submit'}
							disabled={loading}
							className={`cursor-pointer transition-colors duration-300 border-1 border-black  
                                    text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)]
                                    hover:text-[var(--main)] flex gap-2 justify-center w-full`}
						>
							{loading ? <Loader /> : t('setNewPassword')}
						</button>
					</div>
				</form>
			)}
			{error && (
				<div className={'w-100 h-100'}>
					<ErrorComponent error={error} />
				</div>
			)}
		</>
	);
}
