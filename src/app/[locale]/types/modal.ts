import type { ReactNode } from 'react';

export type ModalAppearance = 'left' | 'right' | 'zoom';

export interface ModalProps {
	open: boolean;
	children: ReactNode | null;
	appearance: ModalAppearance;
	onClose: () => void;
	onExitComplete?: () => void;
}
