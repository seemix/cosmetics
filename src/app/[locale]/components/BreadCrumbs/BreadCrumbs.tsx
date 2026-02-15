import type { IBreadcrumb } from '@/app/[locale]/types/breadcrumb';

export default async function BreadCrumbs({ breadcrumbs }: { breadcrumbs: IBreadcrumb[] }) {

    return (
        <div className={`flex gap-1 md:gap-2 text-[.8em] text-dark font-(family-name:--font-roboto) tracking-normal
                        items-center`}>
            {breadcrumbs.length && breadcrumbs.map((item, index, array) =>
                <p key={item.id} className={'flex items-center gap-2'}>
                    {item.title}
                    {index !== array.length - 1 &&
                        <svg className={'w-3 h-3 rtl:rotate-180 text-body'} aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m9 5 7 7-7 7"/>
                        </svg>}
                </p>)}
        </div>
    );
}