'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from '@/app/[locale]/components';
import { type CheckoutFormData, checkoutSchema } from '@/app/[locale]/components/CheckoutForm/checkoutSchema';
import { useCheckoutStore } from '@/app/[locale]/stores/checkout.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useCartStore } from '@/app/[locale]/stores/cart.store';
import { assets } from '@/app/[locale]/assets/assets';

export default function CheckoutForm() {
    const router = useRouter();
    const t = useTranslations('RegisterForm');
    const t2 = useTranslations('Checkout');
    const t3 = useTranslations('Validation');
    const { user } = useAuthStore();
    const { success, orderNumber, loading, error, createNewOrder } = useCheckoutStore();
    const { clear } = useCartStore();
    const locale = useLocale();
    const { phoneCode } = assets;


    const schema = checkoutSchema(t3);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            email: user?.email,
            phone: user?.phone,
            city: '',
            street: '',
            comment: ''
        },
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

    useEffect(() => {
        if (success && orderNumber) {
            setTimeout(() => {
                reset();
                clear().then();
                router.push('/checkout/success');
            }, 200);
        }
    }, [success, reset, router.push, orderNumber, clear]);

    const onSubmit = (data: CheckoutFormData) => {
        createNewOrder({
            name: `${data.name} ${data.surname}`,
            email: data.email,
            phone: data.phone,
            city: data.city,
            address: data.street
        }, locale, data.comment).then();
    };

    return (
        <form className={'mt-3 mx-auto w-full max-w-lg px-3'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'space-y-2 md:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5'}>
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
                        readOnly={!!user?.email}
                        className={`mt-1 w-full border border-gray-300 px-3 py-2 text-sm transition-all
                                    focus:outline-none 
                ${user?.email
                            ? 'bg-gray-100 cursor-default focus:ring-0'
                            : 'focus:ring-1 focus:ring-black'
                        }
                ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
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
                    <div className={`flex items-center border border-gray-300 focus:outline-none focus:ring-1 
                                    focus:outline-none focus:ring-black text-sm 
                                    ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}>
                        <span className={'ml-2'}>{phoneCode}</span>
                        <input type={'tel'} {...register('phone',{
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: 'Enter 8 digits'
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
                <div className={'md:col-span-2'}>
                    <label htmlFor={'comment'} className={'block text-xs font-medium'}>
                        {t2('comment')}
                    </label>
                    <input
                        id={'comment'}
                        {...register('comment')}
                        className={`w-full border border-gray-300 px-1 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm`}
                    />
                </div>
            </div>
            <div className={'w-full flex justify-center'}>
                <button type={'submit'}
                        disabled={loading}
                        className={`my-10 mx-auto border border-gray-800 w-[90%] md:w-[70%] px-4 py-2 cursor-pointer 
                                    hover:text-[var(--main)] transition-colors duration-300 hover:border-[var(--main)]`}
                >
                    {loading ? <Loader/> : t2('checkout')}
                </button>
            </div>
            {error && (
                <p className={'mt-4 text-sm text-red-600'}>
                    {error}
                </p>
            )}
        </form>
    );
}