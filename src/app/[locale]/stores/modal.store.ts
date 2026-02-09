import { create } from 'zustand';
import type { ModalAppearance } from '@/app/[locale]/types/modal';

interface IModalStore {
	open: boolean;
	appearance: ModalAppearance;
	content: React.ReactNode | null;

	showModal: (content: React.ReactNode, appearance?: ModalAppearance) => void;
	hideModal: () => void;
}

export const useModalStore = create<IModalStore>((set) => ({
	open: false,
	appearance: 'zoom',
	content: null,

	showModal: (content, appearance = 'zoom') =>
		set({ open: true, content, appearance }),
	hideModal: () => set({ open: false }),
}));
