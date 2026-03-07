'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { type ProfileFormData, profileSchema } from '@/app/[locale]/components/ProfileForm/profileSchema';
import { assets } from '@/app/[locale]/assets/assets';

export default function ProfileForm() {
    const t = useTranslations();
    const t2 = useTranslations('Validation');
    const { user, loading, error, updateUserInfo } = useAuthStore();
    const { phoneCode } = assets;

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

    return (
        <form className={'mt-3 mx-auto w-full max-w-lg px-3'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'space-y-2 md:w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5'}>
                <div>
                    <label htmlFor={'name'} className={'block text-xs font-medium'}>
                        {t('RegisterForm.name')}
                    </label>
                    <input id={'name'}
                           {...register('name')}
                           className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                                    focus:ring-black text-sm ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                </div>
                <div>
                    <label htmlFor={'surname'} className={'block text-xs font-medium'}>
                        {t('RegisterForm.surname')}
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

                {/* Phone */}
                <div>
                    <label htmlFor={'phone'} className={'block text-xs font-medium'}>
                        {t('RegisterForm.phone')}
                    </label>
                    <div className={`flex items-center border border-gray-300 focus:outline-none focus:ring-1 
                                    focus:outline-none focus:ring-black text-sm 
                                    ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}>
                        <span className={'ml-2'}>{phoneCode}</span>
                        <input type={'tel'} {...register('phone', {
                            pattern: {
                                value: /^[0-9]{8}$/,
                                message: t('Validation.phoneMustBe8Digits')
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
                        {t('Checkout.city')}
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
                <div className={'md:col-span-2'}>
                    <label htmlFor={'street'} className={'block text-xs font-medium'}>
                        {t('Checkout.street')}
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