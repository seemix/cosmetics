import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

const itemClass = `flex items-center gap-1 px-4 py-2 w-full text-left hover:bg-gray-100 text-[.95em]
                   hover:text-[var(--main)] transition-colors duration-300 cursor-pointer text-black`;

type DropdownItemProps = {
	icon: ReactNode;
	children: ReactNode;
	onClick?: () => void;
	/** Renders a link when set, otherwise an action button. */
	href?: string;
};

/** Row of the header user menus. */
export default function DropdownItem({
	icon,
	children,
	onClick,
	href,
}: DropdownItemProps) {
	if (href) {
		return (
			<Link href={href} onClick={onClick} className={itemClass}>
				{icon}
				{children}
			</Link>
		);
	}

	// `simple-button` opts out of the global pressed-button shift, like the links next to it.
	return (
		<button
			type={'button'}
			onClick={onClick}
			className={`simple-button ${itemClass}`}
		>
			{icon}
			{children}
		</button>
	);
}
