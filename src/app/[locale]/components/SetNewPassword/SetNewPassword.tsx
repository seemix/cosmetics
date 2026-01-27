'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewPasswordSchema } from '@/app/[locale]/components/SetNewPassword/newPasswordSchema';
import { ErrorComponent, Loader, PasswordResetSuccess } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';

export default function SetNewPassword({ token }: { token: string }) {

    const t = useTranslations('RegisterForm');
    const schema = createNewPasswordSchema(t);
    const { loading, resetPassword, error, passwordHasReset } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
    });
    const submit = async (data: { password: string }) => {
        await resetPassword(token, data.password);
    };

    return (
        <>
            {passwordHasReset ? <PasswordResetSuccess/> :
                <form className={'mx-auto my-4 w-full h-85 max-w-md border border-gray-300 bg-white p-6 relative'}
                      onSubmit={handleSubmit(submit)}>
                    <h2 className={'mb-6 text-xl font-semibold text-gray-800 text-center'}>
                        {t('inputNewPassword')}
                    </h2>
                    <div className={'space-y-3'}>
                        <div>
                            <label htmlFor={'password'} className={'block text-xs font-medium'}>
                                {t('password')}
                            </label>
                            <input
                                id={'password'}
                                type={'password'}
                                {...register('password')}
                                className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            <div className={'h-5'}>
                                {errors.password && (
                                    <p className={'mt-1 text-xs text-red-600'}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Confirm password */}
                        <div>
                            <label htmlFor={'confirmPassword'} className={'block text-xs font-medium'}>
                                {t('confirmPassword')}
                            </label>
                            <input
                                id={'confirmPassword'}
                                type={'password'}
                                {...register('confirmPassword')}
                                className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm 
                                    ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                            />
                            <div className={'h-5'}>
                                {errors.confirmPassword && (
                                    <p className={'mt-1 text-xs text-red-600'}>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type={'submit'}
                                disabled={loading}
                                className={`cursor-pointer transition-colors duration-300 border-1 border-black  
                                    text-[.85em] md:text-[.95em] px-2 py-2 md:px-3 hover:border-[var(--main)]
                                    hover:text-[var(--main)] flex gap-2 justify-center w-full`}
                        >
                            {loading ? <Loader/> : t('setNewPassword')}
                        </button>
                    </div>
                    {error && <div className={'absolute top-0 w-full left-0'}><ErrorComponent error={error}/></div>}
                </form>}
        </>
    );
}