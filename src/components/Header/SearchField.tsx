'use client';

import { useLocale, useTranslations } from 'next-intl';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { useShallow } from 'zustand/react/shallow';
import Loader from '@/components/Loader/Loader';
import SingleSearchItem from '@/components/SearchComponent/SingleSearchItem';
import { useClickOutside } from '@/hooks/useClickOutside';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchStore } from '@/stores/search.store';

const MIN_QUERY = 3;

/** Inline header search (desktop) with a quick-results dropdown. */
export default function SearchField() {
	const [value, setValue] = useState('');
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLFormElement>(null);
	const t = useTranslations('Header');
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const { fastSearch, loading, products } = useSearchStore(
		useShallow((s) => ({
			fastSearch: s.fastSearch,
			loading: s.loading,
			products: s.items.products,
		})),
	);

	const query = value.trim();
	const close = () => setOpen(false);
	useClickOutside(ref, close, open);

	// Following a result (or any navigation) closes the dropdown.
	// biome-ignore lint/correctness/useExhaustiveDependencies: run on route change only
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (query.length < MIN_QUERY) return;
		const handler = setTimeout(() => fastSearch(query, locale), 500);
		return () => clearTimeout(handler);
	}, [query, fastSearch, locale]);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (query.length < MIN_QUERY) return;
		router.push(`/search?query=${encodeURIComponent(query)}`);
		setOpen(false);
	};

	const showDropdown = open && query.length >= MIN_QUERY;

	return (
		<form
			ref={ref}
			onSubmit={onSubmit}
			className={'relative w-full'}
			onKeyDown={(e) => {
				if (e.key === 'Escape') close();
			}}
		>
			<label htmlFor={'header-search'} className={'sr-only'}>
				{t('Search')}
			</label>
			<input
				id={'header-search'}
				type={'search'}
				autoComplete={'off'}
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					setOpen(true);
				}}
				onFocus={() => setOpen(true)}
				placeholder={t('search')}
				className={`w-full h-11 pl-4 pr-12 bg-white border border-transparent text-sm
				            placeholder:text-gray-400 focus:outline-none focus:border-[var(--main)]
				            transition-colors duration-300`}
			/>
			<button
				type={'submit'}
				aria-label={t('find')}
				className={`absolute right-0 top-0 h-11 w-11 flex items-center justify-center cursor-pointer
				            text-black hover:text-[var(--main)] transition-colors duration-300`}
			>
				<TfiSearch size={18} />
			</button>

			{showDropdown && (
				<div
					className={
						'absolute left-0 right-0 top-full mt-1 bg-white shadow-lg z-30 max-h-[60dvh] overflow-y-auto'
					}
				>
					{loading ? (
						<div className={'flex justify-center p-4'}>
							<Loader />
						</div>
					) : (
						products?.map((product) => (
							<SingleSearchItem key={product.id} product={product} />
						))
					)}
				</div>
			)}
		</form>
	);
}
