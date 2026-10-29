'use client';

import { TfiSearch } from 'react-icons/tfi';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import { useModal } from '@/hooks/useModal';

const SearchBar = () => {
	const { showModal } = useModal();

	return (
		<button
			type={'button'}
			className={'cursor-pointer'}
			aria-label={'search'}
			onClick={() => {
				showModal(<SearchComponent />, 'zoom');
			}}
		>
			<TfiSearch
				size={25}
				className={
					'text-black transition-colors duration-300 hover:text-[var(--main)]'
				}
			/>
		</button>
	);
};

export default SearchBar;
