'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRegisterSchema, type RegisterFormData } from './registerSchema';
import { useMemo, useState } from 'react';
import { Loader } from '@/app/[locale]/components';
import { useTranslations } from 'next-intl';


export default function RegisterForm() {
    const t = useTranslations('RegisterForm');
    const schema = useMemo(() => createRegisterSchema(t), [t])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });

    //const { loading, error, register: registerUser } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: RegisterFormData) => {
        // registerUser(data).then();
        setLoading(true);
        setTimeout(() => {
            console.log(data);
            setLoading(false);

        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
             className="mx-auto my-4 w-full max-w-md border border-gray-300 bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-800 text-center">
                {t('registration')}
            </h2>

            <div className="space-y-3">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-xs font-medium">
                        {t('name')}
                    </label>
                    <input id="name"
                        {...register('name')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                    {errors.name && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.name.message}
                        </p>
                    )}
                    </div>
                </div>
                {/* Surname */}
                <div>
                    <label htmlFor="surname" className="block text-xs font-medium">
                        {t('surname')}
                    </label>
                    <input
                        id="surname"
                        {...register('surname')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.surname ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.surname && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.surname.message}
                        </p>
                    )}
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-xs font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-xs font-medium">
                        {t('phone')}
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-xs font-medium">
                        {t('password')}
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {/* Confirm password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-xs font-medium">
                        {t('confirmPassword')}
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>
            <button
                disabled={loading}
                type="submit"
                className="mt-6 w-full border border-gray-800  px-4 py-2 cursor-pointer"
            >
                {loading ? <Loader/> : t('registration')}
            </button>
        </form>
    );
}
