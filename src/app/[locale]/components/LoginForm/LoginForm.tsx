'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { CloseModalButton, ForgotPasswordForm, FormInput, Loader } from '@/app/[locale]/components';
import { createLoginSchema, type LoginFormData } from '@/app/[locale]/components/LoginForm/loginSchema';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function LoginForm() {

    const t = useTranslations('RegisterForm');
    const t2 = useTranslations('Validation');
    const schema = createLoginSchema(t2);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        mode: 'onSubmit'
    });
    const { login, loading, user, error } = useAuthStore();
    const { hideModal, showModal } = useModal();

    const submit = async (data: LoginFormData) => {
        await login(data.email, data.password);
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                hideModal();
            }, 800);
        }
    }, [hideModal, user]);

    return (
        <motion.div className={'flex items-center justify-center flex-col bg-gray-50 w-100'}
                    initial={{ opacity: 0, filter: 'blur(5px)', x: 15 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: .3 }}>
            <CloseModalButton/>
            <h2 className={'text-2xl font-semibold text-gray-800 text-center mb-2'}>
                {t('authorization')}
            </h2>
            <div className={'w-full bg-white p-5 shadow-lg border border-gray-100'}>
                <form onSubmit={handleSubmit(submit)} className={'mx-auto bg-white'}>
                    <div className={'space-y-3 '}>
                        <FormInput label={'Email'}
                                   register={register('email')}
                                   id={'email'} type={'email'}
                                   error={errors.email}/>

                        <FormInput label={t('password')}
                                   register={register('password')}
                                   id={'password'}
                                   type={'password'}
                                   error={errors.password}/>

                        <button
                            type={'submit'}
                            aria-label={'login-button'}
                            className={`cursor-pointer transition-colors duration-300 border-1 border-black p-2 
                                    hover:border-[var(--main)] hover:text-[var(--main)] flex gap-2 justify-center
                                    font-(family-name:--font-roboto) w-full`}
                        >
                            {loading ? <Loader/> : t('login')}
                        </button>
                    </div>
                </form>
                <div className={'h-10'}>
                    {error && <p className={'text-red-500 text-center mt-3 font-bold text-sm'}>{error}</p>}
                </div>
                <div className={'flex justify-between w-full mt-5'}>
                    <Link href={'/register'}
                          onClick={() => hideModal()}
                          className={'text-gray-900 text-sm ml-1 hover:underline'}>
                        {t('registration')}
                    </Link>
                    <button onClick={() => showModal(<ForgotPasswordForm/>, 'zoom')}
                            type={'button'} className={'text-gray-900 text-sm mr-1 hover:underline cursor-pointer'}>
                        {t('forgotPassword')}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
