'use client';

import { useForm } from 'react-hook-form';
import { type CheckoutFormData, checkoutSchema } from '@/app/[locale]/components/CheckoutForm/checkoutSchema';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/app/[locale]/components';
import { useCheckoutStore } from '@/app/[locale]/stores/checkout.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useEffect } from 'react';

export default function CheckoutForm() {
    const t = useTranslations('RegisterForm');
    const t2 = useTranslations('Checkout');
    const { loading, error } = useCheckoutStore();
    const { user } = useAuthStore();

    const schema = checkoutSchema(t);
    const { register, handleSubmit, formState: { errors }, setValue} = useForm({
        defaultValues: {name: user?.name, surname: user?.surname, email: user?.email, phone: user?.phone, city: '', street: '', comment: ''},
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        setValue('name', user?.name || '');
        setValue('surname', user?.surname || '');
        setValue('email', user?.email || '');
        setValue('phone', user?.phone || '');
        setValue('city', user?.city || '');
        setValue('street', user?.street || '');
    }, [user, setValue]);

    const onSubmit = (data: CheckoutFormData) => {
        console.log(data);
    };

    return (
        <form className={'mt-3 mx-auto'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'space-y-3 max-w-md w-80'}>
                <div>
                    <label htmlFor={'name'} className={'block text-xs font-medium'}>
                        {t('name')}
                    </label>
                    <input id={'name'}
                           {...register('name')}
                           className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.email && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor={'surname'} className={'block text-xs font-medium'}>
                        {t('surname')}
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
                        {t('phone')}
                    </label>
                    <input
                        id={'phone'}
                        type={'tel'}
                        {...register('phone')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.phone && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>
                {/*City*/}
                <div>
                    <label htmlFor={'city'} className={'block text-xs font-medium'}>
                        {t2('city')}
                    </label>
                    <input
                        id={'city'}
                        {...register('city')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.city && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                </div>
                {/*Street*/}
                <div>
                    <label htmlFor={'street'} className={'block text-xs font-medium'}>
                        {t2('street')}
                    </label>
                    <input
                        id={'street'}
                        {...register('street')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.street ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    <div className={'h-5'}>
                        {errors.street && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.street.message}
                            </p>
                        )}
                    </div>
                </div>
                {/*Comment*/}
                <div>
                    <label htmlFor={'comment'} className={'block text-xs font-medium'}>
                        {t2('comment')}
                    </label>
                    <input
                        id={'comment'}
                        {...register('comment')}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.street ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                </div>
            </div>
            <button type={'submit'}
                    disabled={loading}
                    className={'mt-5 mx-auto my-4 border border-gray-800 w-full px-4 py-2 cursor-pointer'}
            >
                {loading ? <Loader/> : t2('checkout')}
            </button>
            {error && (
                <p className={'mt-4 text-sm text-red-600'}>
                    {error}
                </p>
            )}
        </form>
    );
}