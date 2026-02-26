'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdArrowBack } from 'react-icons/io';

import { forgotPasswordSchema } from '@/app/[locale]/components/ForgotPasswordForm/forgotPasswordSchema';
import { useModal } from '@/app/[locale]/hooks/useModal';
import { CloseModalButton, ConfirmResetMessage, Loader, LoginForm } from '@/app/[locale]/components';
import { useAuthStore } from '@/app/[locale]/stores/auth.store';


export default function ForgotPasswordForm() {

    const { showModal } = useModal();
    const { forgotPassword, forgotPasswordEmailSent, loading } = useAuthStore();
    const t = useTranslations();
    const t2 = useTranslations('Validation')
    const schema = forgotPasswordSchema(t2);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema)
    });
    const submit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        await forgotPassword(data.email);
    };

    return (
        <> {forgotPasswordEmailSent ? <ConfirmResetMessage/> :
            <motion.div className={'flex items-center justify-center flex-col bg-gray-50 w-100'}
                        initial={{ opacity: 0, filter: 'blur(5px)', x: -15 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: .3 }}>
                <div className={'flex justify-between w-full'}>
                    <button type={'button'}
                            className={'cursor-pointer transition-colors duration-300 hover:text-[var(--main)] ml-1'}
                            onClick={() => showModal(<LoginForm/>, 'zoom')}>
                        <IoMdArrowBack size={30}/>
                    </button>
                    <CloseModalButton/>
                </div>
                <h2 className={'text-2xl font-semibold text-gray-800 text-center mb-2'}>
                    {t('RegisterForm.forgotPassword')}
                </h2>
                <h3 className={'mx-5 text-gray-500'}>{t('RegisterForm.inputEmailForReset')}</h3>
                <div className={'w-full bg-white p-5 shadow-lg border border-gray-100'}>
                    <form onSubmit={handleSubmit(submit)} className={'mx-auto bg-white'}>
                        <div className={'space-y-3 '}>
                            <div>
                                <label htmlFor={'email'} className={'block text-sm font-medium text-gray-700 mb-1'}>
                                    E-mail
                                </label>
                                <input
                                    id={'email'}
                                    type={'email'}
                                    {...register('email', { required: true })}
                                    className={`w-full px-4 py-2 border border-gray-300 text-sm text-black 
                                            focus:outline-none focus:ring-1 focus:ring-gray-800 
                                        ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder={'e-mail'}
                                />
                                <div className={'h-5'}>
                                    {errors.email && (
                                        <p className={'mt-1 text-xs text-red-600'}>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button
                            type={'submit'}
                            aria-label={'login-button'}
                            className={`cursor-pointer transition-colors duration-300 border-1 border-black p-2 mt-5
                                    hover:border-[var(--main)] hover:text-[var(--main)] flex gap-2 justify-center
                                    font-(family-name:--font-roboto) w-full`}
                        >
                            {loading ? <Loader/> : t('RegisterForm.resetPassword')}
                        </button>
                    </form>
                </div>
            </motion.div>
        }
        </>
    );
}