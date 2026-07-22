'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdOutlineCheckBox } from 'react-icons/md';

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
    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
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
    const selectedPayment = watch('paymentType');

    const onSubmit = (data: CheckoutFormData) => {
            createNewOrder({
                name: `${data.name} ${data.surname}`,
                email: data.email,
                phone: data.phone,
                city: data.city,
                address: data.street,
            }, locale, data.paymentType, data.SRL, data.comment).then();
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
                {/*Payment Selector*/}
                <div className={'md:col-span-2'}>
                    <label htmlFor={'paymentType'} className={'block text-xs font-medium'}>
                        {t('Checkout.paymentMethod')}
                    </label>

                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                        {['cash', 'transfer'].map((method) => {
                            const isChecked = selectedPayment === method;

                            return (
                                <label key={method} className={'w-full cursor-pointer'}>
                                    <input
                                        type={'radio'}
                                        value={method}
                                        {...register('paymentType')}
                                        className={'sr-only'}
                                    />

                                    <div className={`w-full border p-3 text-sm transition-all duration-300 flex 
                                                    items-center justify-center text-center relative 
                                        ${errors.paymentType
                                        ? 'border-red-500 bg-red-50'
                                        : isChecked
                                            ? 'border-black text-black'
                                            : 'bg-transparent border-gray-300 text-gray-600 hover:text-[var(--main)] ' +
                                            'hover:border-[var(--main)]'
                                    }`}
                                    >
                                        <span className={'text-xs'}>
                                            {method === 'cash' ? t('Checkout.cashCourier') : t('Checkout.transfer')}
                                        </span>
                                        {isChecked && <MdOutlineCheckBox size={20}
                                                                         className={'ml-2 absolute top-1 right-0 w-8'}/>}
                                    </div>
                                </label>
                            );
                        })}
                    </div>

                    <div className={'h-4'}>
                        {errors.paymentType && (
                            <p className={'mt-1 text-xs text-red-600'}>
                                {errors.paymentType.message}
                            </p>
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {selectedPayment === 'transfer' && (
                        <motion.div
                            key={'srl-field-container'}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.05 } }
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: { height: { duration: 0.2 }, opacity: { duration: 0.15 } }
                            }}
                            className={'md:col-span-2 overflow-hidden'}
                        >
                            <div className={'pb-2 px-1 mx-0'}>
                                <FormInput
                                    label={'SRL'}
                                    register={register('SRL')}
                                    id={'SRL'}
                                    error={errors.SRL}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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