'use client';

export default function SortSelect() {

    return (
      <select
          aria-label={'sort-by-price'}
          className={`cursor-pointer transition-colors duration-300 border-1 border-black text-[.85em] md:text-[.85em] 
                       px-2 py-2 md:px-3 hover:border-[var(--main)] hover:text-[var(--main)] focus:outline-none 
                       focus:border-[var(--main)] bg-transparent`}
        //  onChange={(e) => setSort(e.target.value)}
      >
          <option value="price-asc">
              Від дешевих до дорогих
          </option>
          <option value="price-desc">
              Від дорогих до дешевих
          </option>
      </select>
  );
}