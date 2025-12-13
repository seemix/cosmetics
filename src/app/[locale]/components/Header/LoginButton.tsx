'use client';

import { LoginForm } from '@/app/[locale]/components';
import { PiUser } from 'react-icons/pi';
import { useModal } from '@/app/[locale]/hooks/useModal';

export default function LoginButton() {

    const { showModal } = useModal();

    return (
        <button
            type={'button'}
            aria-label={'search'}
            onClick={() =>
               showModal(<LoginForm/>, 'zoom' )
            }
            className={`flex items-center justify-center gap-4 transition-colors duration-300 
                                        hover:text-[var(--main)] cursor-pointer`}
        >
            <PiUser size={29}/>
        </button>
    );
}