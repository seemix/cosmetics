import { TfiSearch } from "react-icons/tfi";

const SearchBar = () => {
	// const t = await getTranslations('Header');
	return (
		<button type={'button'} className={"cursor-pointer"}>
			<TfiSearch
				size={25}
				className={
					"text-black transition-colors duration-300 hover:text-[var(--main)]"
				}
			/>
		</button>
	);
};

export default SearchBar;
