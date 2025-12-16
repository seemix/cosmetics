import { IoCloseSharp } from 'react-icons/io5';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function CloseModalButton() {
    const { appearance, hideModal } = useModal();

    return (
        <div
            className={`flex w-full relative  ${
                appearance === 'right' ? 'justify-start' : 'justify-end '
            }`}
        >
            <button
                type="button"
                aria-label="Close"
                className="cursor-pointer m-1 transition-colors duration-300 hover:text-[var(--main)]"
                onClick={hideModal}
            >
                <IoCloseSharp size={33}/>
            </button>
        </div>
    );
}