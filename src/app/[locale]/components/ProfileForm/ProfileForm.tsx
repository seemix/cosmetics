'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormInput, FormPhoneInput, Loader } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { type ProfileFormData, profileSchema } from '@/app/[locale]/components/ProfileForm/profileSchema';
import { useAuthPrices } from '@/app/[locale]/hooks/useAuthPrices';

export default function ProfileForm() {
    const t = useTranslations();
    const t2 = useTranslations('Validation');
    const { user, loading, error, updateUserInfo } = useAuthStore();

    const schema = profileSchema(t2);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: user?.name || '',
            surname: user?.surname || '',
            phone: user?.phone || '',
            city: user?.city || '',
            street: user?.street || '',
        },
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        setValue('name', user?.name || '');
        setValue('surname', user?.surname || '');
        setValue('phone', user?.phone || '');
        setValue('city', user?.city || '');
        setValue('street', user?.street || '');
    }, [user, setValue]);


    const onSubmit = (data: ProfileFormData) => {
        updateUserInfo(data).then();
    };

    useAuthPrices(user);

    return (
        <form className={'mt-3 mx-auto w-full max-w-lg px-3'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'space-y-2 md:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5'}>
                <FormInput label={t('RegisterForm.name')}
                           register={register('name')}
                           id={'name'}
                           error={errors.name}/>
                <FormInput label={t('RegisterForm.surname')}
                           register={register('surname')}
                           id={'surname'}
                           error={errors.surname}/>
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
                <div className={'md:col-span-2'}>
                    <FormInput label={t('Checkout.street')}
                               register={register('street')}
                               id={'street'}
                               error={errors.street}/>
                </div>
            </div>
            <div className={'w-full flex justify-center'}>
                <button type={'submit'}
                        disabled={loading}
                        className={`my-10 mx-auto border border-gray-800 w-[90%] md:w-[70%] px-4 py-2 cursor-pointer 
                                    hover:text-[var(--main)] transition-colors duration-300 hover:border-[var(--main)]`}
                >
                    {loading ? <Loader/> : t('RegisterForm.saveChanges')}
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