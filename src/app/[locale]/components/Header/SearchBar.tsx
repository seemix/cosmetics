'use client';

import { TfiSearch } from 'react-icons/tfi';

import { useModal } from '@/app/[locale]/hooks/useModal';
import { SearchComponent } from '@/app/[locale]/components/index';

const SearchBar = () => {
    const { showModal } = useModal();

    return (
        <button type={'button'} className={'cursor-pointer'}
                onClick={() => {
                    showModal(<SearchComponent/>, 'zoom');
                }}>
            <TfiSearch
                size={25}
                className={'text-black transition-colors duration-300 hover:text-[var(--main)]'}
            />
        </button>
    );
};

export default SearchBar;