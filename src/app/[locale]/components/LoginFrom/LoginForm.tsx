'use client';

import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // handle login
    };

    return (
        <div className={'flex items-center justify-center bg-gray-50 p-6 mt-2 w-100'}>
            <div className={'w-full bg-white p-8 shadow-lg border border-gray-100'}>
                <h2 className={'text-2xl font-semibold text-gray-800 text-center mb-6'}>
                   Войти в аккаунт
                </h2>
                <form onSubmit={handleSubmit} className={'space-y-5'}>
                    {/* Email */}
                    <div>
                        <label className={'block text-sm font-medium text-gray-700 mb-1'}>
                            Email
                        </label>
                        <input
                            type={'email'}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={'w-full px-4 py-2 border border-gray-300 text-sm text-black focus:outline-none focus:ring-1 focus:ring-gray-800'}
                            placeholder={'you@example.com'}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className={'block text-sm font-medium text-gray-700 mb-1'}>
                            Пароль
                        </label>
                        <input
                            type={'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={'w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-800'}
                            placeholder={'•••••••'}
                        />
                    </div>

                    <button
                        type={'submit'}
                        className={'w-full bg-gray-900 text-white py-2.5 font-medium hover:bg-gray-800 transition cursor-pointer'}
                    >
                       Вход
                    </button>
                </form>
                {/*<p className="text-center text-sm text-gray-600 mt-4">*/}
                {/*    Немає акаунта?*/}
                {/*    <a href="/register" className="text-gray-900 font-medium ml-1 hover:underline">*/}
                {/*        Зареєструватися*/}
                {/*    </a>*/}
                {/*</p>*/}
            </div>
        </div>
    );
}