'use client';

import { TfiSearch } from 'react-icons/tfi';

import { useModal } from '@/hooks/useModal';
import SearchComponent from '@/components/SearchComponent/SearchComponent';

const SearchBar = () => {
    const { showModal } = useModal();

    return (
        <button type={'button'} className={'cursor-pointer'} aria-label={'search'}
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