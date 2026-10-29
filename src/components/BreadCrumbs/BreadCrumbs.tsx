import { Link } from '@/i18n/navigation';
import type { IBreadcrumb } from '@/types/breadcrumb';

export default function BreadCrumbs({
	breadcrumbs,
}: {
	breadcrumbs: IBreadcrumb[];
}) {
	return (
		<nav
			aria-label={'breadcrumbs'}
			className={`flex gap-1 md:gap-2 text-[.8em] text-dark font-(family-name:--font-roboto) tracking-normal
                        items-center p-4`}
		>
			{breadcrumbs.map((item, index, array) => {
				const isLast = index === array.length - 1;
				return (
					<p
						key={`${item.id}-${item.title}`}
						className={'flex items-center gap-2'}
					>
						{item.href && !isLast ? (
							<Link
								href={item.href}
								className={'hover:text-gray-900 hover:underline'}
							>
								{item.title}
							</Link>
						) : (
							<span aria-current={isLast ? 'page' : undefined}>
								{item.title}
							</span>
						)}
						{!isLast && (
							<svg
								className={'w-3 h-3 rtl:rotate-180 text-body'}
								aria-hidden={'true'}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m9 5 7 7-7 7"
								/>
							</svg>
						)}
					</p>
				);
			})}
		</nav>
	);
}
