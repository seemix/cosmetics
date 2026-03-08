'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput, FormPhoneInput, Loader } from '@/app/[locale]/components';
import { type CheckoutFormData, checkoutSchema } from '@/app/[locale]/components/CheckoutForm/checkoutSchema';
import { useCheckoutStore } from '@/app/[locale]/stores/checkout.store';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useCartStore } from '@/app/[locale]/stores/cart.store';

export default function CheckoutForm() {
    const router = useRouter();
    const t = useTranslations();
    const t2 = useTranslations('Validation');
    const { user } = useAuthStore();
    const { success, orderNumber, loading, error, createNewOrder } = useCheckoutStore();
    const { clear, cart } = useCartStore();
    const locale = useLocale();

    const schema = checkoutSchema(t2);
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
    if (!cart?.items?.length) return <h2 className={'text-center text-2xl'}>{t('Checkout.addItemsToCart')}</h2>;
    return (
        <form className={'mt-3 mx-auto w-full max-w-lg px-3'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'space-y-2 md:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5'}>
                <FormInput label={t('RegisterForm.name')}
                           id={'name'}
                           register={register('name')}
                           error={errors.name}/>
                <FormInput label={t('RegisterForm.surname')}
                           id={'surname'}
                           register={register('surname')}
                           error={errors.surname}/>
                {/* Email */}
                <FormInput label={'Email'}
                           register={register('email')}
                           id={'email'} type={'email'}
                           error={errors.email}
                           readOnly={!!user?.email}/>

                {/* Phone */}
                <FormPhoneInput label={t('RegisterForm.phone')}
                                type={'tel'}
                                register={register('phone', {
                                    pattern: {
                                        value: /^[0-9]{8}$/,
                                        message: t2('phoneMustBe8Digits')
                                    },
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                        e.target.value = e.target.value.replace(/\D/g, '')
                                            .slice(0, 8);
                                    }
                                })}
                                id={'phone'}
                                error={errors.phone}/>
                {/*City*/}
                <FormInput label={t('Checkout.city')}
                           register={register('city')}
                           id={'city'}
                           error={errors.city}/>
                {/*Street*/}
                <FormInput label={t('Checkout.street')}
                           register={register('street')}
                           id={'street'}
                           error={errors.street}/>
                {/*Comment*/}
                <div className={'md:col-span-2'}>
                    <FormInput label={t('Checkout.comment')} register={register('comment')} id={'comment'}/>
                </div>

            </div>
            <div className={'w-full flex justify-center'}>
                <button type={'submit'}
                        disabled={loading}
                        className={`my-10 mx-auto border border-gray-800 w-[90%] md:w-[70%] px-4 py-2 cursor-pointer 
                                    hover:text-[var(--main)] transition-colors duration-300 hover:border-[var(--main)]`}
                >
                    {loading ? <Loader/> : t('Checkout.checkout')}
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