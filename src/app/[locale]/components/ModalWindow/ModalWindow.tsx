'use client';

import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onCloseAction: () => void;
    children: React.ReactNode;
    variant?: 'center' | 'right';
}

export default function Modal({ isOpen, onCloseAction, children, variant = 'center' }: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCloseAction();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onCloseAction]);

    if (!isOpen) return null;
    let classText = 'm-auto rounded-lg shadow-lg max-w-lg w-full mx-4 transform transition-all duration-300 scale-95 animate-fade-in';
    if (variant === 'right') {
        classText = 'ml-auto h-full shadow-lg transition-transform duration-300 translate-x-0 animate-slide-in-right';
    }
    return (
        <div
            className={'fixed inset-0 z-50 bg-black/50 flex'}
            onClick={onCloseAction}
        >
            <div
                className={classText}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>

        </div>
    );
}