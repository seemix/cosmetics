'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { createRegisterSchema, type RegisterFormData } from './registerSchema';
import { Loader } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { assets } from '@/app/[locale]/assets/assets';


export default function RegisterForm() {
    const t = useTranslations('Validation');
    const t2 = useTranslations('RegisterForm');
    const schema = useMemo(() => createRegisterSchema(t), [t]);
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });

    const { loading, error, register: registerUser } = useAuthStore();
    const router = useRouter();
    const { phoneCode } = assets;

    const onSubmit = async (data: RegisterFormData) => {
        const res = await registerUser(data).then();
        if (res.success) {
            router.push('/verify-email');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={'mx-auto my-2 w-full max-w-md border border-gray-300 bg-white p-6'}>
            <h2 className={'mb-6 text-xl font-semibold text-gray-800 text-center'}>
                {t2('newUserRegistration')}
            </h2>

            <div className={'space-y-3'}>
                <input type={'hidden'} {...register('locale')} value={params?.locale as string}/>
                {/* Name */}
                <div>
                    <label htmlFor={'name'} className={'block text-xs font-medium'}>
                        {t2('name')}
                    </label>
                    <input id={'name'}
                           {...register('name')}
                           className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.name && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* Surname */}
                <div>
                    <label htmlFor={'surname'} className={'block text-xs font-medium'}>
                        {t2('surname')}
                    </label>
                    <input
                        id={'surname'}
                        {...register('surname')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.surname ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.surname && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.surname.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* Email */}
                <div>
                    <label htmlFor={'email'} className={'block text-xs font-medium'}>
                        Email
                    </label>
                    <input
                        id={'email'}
                        type={'email'}
                        {...register('email')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.email && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* Phone */}
                <div>
                    <label htmlFor={'phone'} className={'block text-xs font-medium'}>
                        {t2('phone')}
                    </label>
                    <div className={`flex items-center border border-gray-300 focus:outline-none focus:ring-1 
                                    focus:outline-none focus:ring-black text-sm 
                                    ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}>
                        <span className={'ml-2'}>{phoneCode}</span>
                        <input type={'tel'} {...register('phone',{
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: t('phoneMustBe8Digits')
                            },
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8);
                            }
                        })} id={'phone'}
                               inputMode={'numeric'} maxLength={8}
                               className={`w-full flex px-1 py-2 focus:outline-none text-sm`}/>
                    </div>
                    <div className={'h-5'}>
                        {errors.phone && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>
                {/* Password */}
                <div>
                    <label htmlFor={'password'} className={'block text-xs font-medium'}>
                        {t2('password')}
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
                        {t2('confirmPassword')}
                    </label>
                    <input
                        id={'confirmPassword'}
                        type="password"
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
            </div>
            <button type={'submit'}
                    disabled={loading}
                    className={'mt-2 w-full border border-gray-800  px-4 py-2 cursor-pointer'}
            >
                {loading ? <Loader/> : t2('registration')}
            </button>
            {error && (
                <p className={'mt-4 text-sm text-red-600'}>
                    {error}
                </p>
            )}
        </form>
    );
}
