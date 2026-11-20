'use client';

import { useTranslations } from 'next-intl';
import { useModal } from '@/hooks/useModal';
import { Link } from '@/i18n/navigation';
import { headMenuData } from './headMenuData';

/**
 * Info pages menu. `bar` is the inline row in the header top strip,
 * `drawer` the vertical list in the mobile burger menu.
 */
export default function HeadMenu({
	variant = 'bar',
}: {
	variant?: 'bar' | 'drawer';
}) {
	const t = useTranslations('StaticPages');
	const { hideModal } = useModal();

	if (variant === 'drawer') {
		return (
			<nav>
				<ul className={'flex flex-col'}>
					{headMenuData.map((item) => (
						<li key={item.name}>
							<Link
								onClick={hideModal}
								href={`${item.link}`}
								className={`block py-2.5 text-sm text-gray-600 transition-colors duration-300 
                                            hover:text-[var(--main)]`}
							>
								{t(item.name)}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		);
	}

	return (
		<nav
			className={`flex gap-10 w-full max-w-130 justify-end items-center self-center text-md text-dark`}
		>
			<ul className={'flex flex-wrap w-full justify-evenly gap-x-1 gap-y-4'}>
				{headMenuData.map((item) => (
					<li key={item.name}>
						<Link
							onClick={hideModal}
							data-bubble={'true'}
							href={`${item.link}`}
							className={`whitespace-nowrap text-md sm:text-sm text-dark transition-colors py-2 sm:py-1
            							duration-300 tracking-normal hover:text-[var(--main)] inline-block`}
						>
							{t(item.name)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
