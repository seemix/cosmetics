import { ReactNode } from 'react';

export interface IModalProps {
    open: boolean;
    appearance?: 'left' | 'right' | 'zoom' | null
    modalChildren: ReactNode | null;
}