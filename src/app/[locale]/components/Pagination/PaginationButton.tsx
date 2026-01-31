'use client';

type ButtonProps = {
    label: string | React.ReactNode;
    page: number;
    currentPage?: number;
    border: boolean;
    changePageAction: (page: number) => void;
}


export default function PaginationButton({ label, page, changePageAction, border, currentPage }: ButtonProps) {
    return (
        <button
            onClick={() => changePageAction(page)}
            className={`w-9 h-8 flex items-center justify-center text-gray-600
                                hover:bg-gray-100 hover:text-[var(--main)] cursor-pointer
                                ${border ? 'border-1 border-gray-500 p-5' : 'border-0'}
                                ${currentPage === page && 'text-xl simple-button border-none hover:cursor-default ' +
            '                                               hover:text-gray-600 hover:bg-transparent'}
                               `}
            type={'button'}
            disabled={page === currentPage}
            aria-label={'decrease-quantity'}
        >
            {label}
        </button>
    );
}