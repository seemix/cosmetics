'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { createRegisterSchema, type RegisterFormData } from './registerSchema';
import { FormInput, FormPhoneInput, Loader } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';

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
                <FormInput register={register('name')}
                           id={'name'}
                           label={t2('name')}
                           readOnly={false}
                           error={errors.name}/>
                {/* Surname */}
                <FormInput register={register('surname')}
                           id={'surname'}
                           label={t2('surname')}
                           readOnly={false}
                           error={errors.surname}/>
                {/* Email */}
                <FormInput register={register('email')}
                           id={'email'}
                           label={'Email'}
                           readOnly={false}
                           error={errors.email}/>
                {/* Phone */}
                <FormPhoneInput label={t2('phone')} register={register('phone', {
                    pattern: {
                        value: /^[0-9]{8}$/,
                        message: t('phoneMustBe8Digits')
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8);
                    }
                })} id={'phone'} error={errors.phone}/>

                {/* Password */}
                <FormInput label={t2('password')}
                           register={register('password')}
                           id={'password'}
                           type={'password'}
                           error={errors.password}/>
                {/* Confirm password */}
                <FormInput label={t2('confirmPassword')}
                           register={register('confirmPassword')}
                           id={'confirmPassword'}
                           type={'password'}
                           error={errors.confirmPassword}/>
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
