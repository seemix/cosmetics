import React from 'react';
import { TfiSearch } from 'react-icons/tfi';


const SearchBar = () => {
    // const t = await getTranslations('Header');
    return (
        <>
            <TfiSearch size={25}
                       className={'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer'}/>
        </>
    );
};

export default SearchBar;