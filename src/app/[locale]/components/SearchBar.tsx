import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

const SearchBar = () => {
    // const t = await getTranslations('Header');
    return (
        <>
            <IoSearchSharp size={28} className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>
        </>
    );
};

export default SearchBar;