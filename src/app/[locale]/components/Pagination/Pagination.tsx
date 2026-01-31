'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';

import type { PaginationProps } from '@/app/[locale]/types/pagination';
import PaginationButton from '@/app/[locale]/components/Pagination/PaginationButton';

export default function Pagination({ pagination }: { pagination: PaginationProps }) {

    const { page, hasPrevPage, hasNextPage, totalPages } = pagination;

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.replace(`${pathname}?${params.toString()}`);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    let startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className={'flex justify-between items-center w-full max-w-120 mx-auto mt-auto'}>
            <div>
                {hasPrevPage &&
                    <PaginationButton border={false} page={page - 1} label={<GrFormPrevious size={27}/>}
                                      changePageAction={changePage}/>
                }
            </div>
            <div className={'flex gap-3'}>
                {pages.map(p =>
                (<PaginationButton  key={p} currentPage={page} border={true} label={p} page={p}
                                    changePageAction={changePage}/>))
            }
            </div>
            <div>
                {hasNextPage &&
                    <PaginationButton border={false} page={page + 1} label={<GrFormNext size={27}/>}
                                      changePageAction={changePage}/>
                }
            </div>
        </div>
    )
        ;
}