'use client';

import { useTranslations } from 'next-intl';
import type React from 'react';
import { useEffect, useState } from 'react';
import { TfiSearch } from 'react-icons/tfi';

import { CloseModalButton, Loader, SingleSearchItem } from '@/app/[locale]/components';
import { useSearchStore } from '@/app/[locale]/stores/search.store';
import { useRouter } from 'next/navigation';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function SearchComponent() {
    const [inputValue, setInputValue] = useState('');
    const { fastSearch, loading, items } = useSearchStore();
    const t = useTranslations('Header');
    const router = useRouter();
    const { hideModal } = useModal();

    const searchSubmit = () => {
        router.push(`/search?query=${inputValue}`);
        hideModal();
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (inputValue.length > 2) {
                router.push(`/search?query=${inputValue}`);
                hideModal();
            }
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.length > 2) {
                fastSearch(inputValue).then();
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [inputValue, fastSearch]);

    return (
        <div className={'flex flex-col bg-gray-50 w-100 min-h-50'}>
            <CloseModalButton/>
            <h2 className={'text-2xl -mt-5 py-2 mx-2 text-center font-medium'}>
                {t('Search')}
            </h2>
            <div className={'w-full bg-white p-5 shadow-lg border border-gray-100'}>
                <form className={'max-w-md mx-auto'}>
                    <label htmlFor={'search'}
                           className={'block mb-2.5 text-sm font-medium text-heading sr-only'}>
                        {t('search')}
                    </label>
                    <div className={'relative'}>
                        <div className={'absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'}>
                            <TfiSearch size={20}/>
                        </div>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            id={'search'}
                            className={`block w-full p-3 ps-9 border border-default-medium text-heading text-sm  
                                             placeholder:text-body rounded-none focus:outline-none`}
                            placeholder={t('search')}
                            required/>
                        <span
                            className={`border-l-1 absolute end-0 bottom-0 cursor-pointer shadow-xs font-medium
                                            leading-5 rounded text-sm rounded-none h-[45px]`}>
                            <button onClick={searchSubmit}
                                    type={'button'}
                                    className={`cursor-pointer transition-colors duration-300 w-full h-full px-2
                                                hover:text-[var(--main)] text-[1.1em]`}>
                           {t('find')}
                            </button>
                        </span>
                    </div>
                </form>
            </div>
            <div>
                {loading && <Loader/>}
                {inputValue.length > 2 && <div className={'overflow-y-auto h-50'}>
                    {items.products?.map(product =>
                        <SingleSearchItem key={product.id} product={product}/>)}
                </div>}
            </div>
        </div>
    );
}