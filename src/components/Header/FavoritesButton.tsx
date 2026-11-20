'use client';

import { useTranslations } from 'next-intl';
import { IoMdHeartEmpty } from 'react-icons/io';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useModal } from '@/hooks/useModal';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { useFavoritesStore } from '@/stores/favorites.store';

const iconClass =
	'text-black transition-colors duration-300 hover:text-[var(--main)] cursor-pointer';

/** Header link to the favorites page; guests get the login form instead (the page is private). */
export default function FavoritesButton() {
	const t = useTranslations('Account');
	const { showModal } = useModal();
	const isLoggedIn = useAuthStore((s) => Boolean(s.user?.id));
	const count = useFavoritesStore((s) => s.favorites.length);

	if (!isLoggedIn) {
		return (
			<button
				type={'button'}
				aria-label={t('favorites')}
				className={'cursor-pointer'}
				onClick={() => showModal(<LoginForm />, 'zoom')}
			>
				<IoMdHeartEmpty size={30} className={iconClass} />
			</button>
		);
	}

	return (
		<Link
			href={'/favorites'}
			aria-label={t('favorites')}
			className={'relative'}
		>
			<IoMdHeartEmpty size={30} className={iconClass} />
			{count > 0 && (
				<span
					className={`absolute -top-2 -right-2 flex items-center justify-center bg-[var(--main)]
					            text-black rounded-full text-xs w-[19px] aspect-square`}
				>
					{count > 9 ? '9+' : count}
				</span>
			)}
		</Link>
	);
}
