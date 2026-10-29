import { useShallow } from 'zustand/react/shallow';
import { useModalStore } from '@/stores/modal.store';

/**
 * Modal actions only. They are stable, so components that just open or close
 * a modal don't re-render whenever the modal state changes.
 */
export const useModal = () =>
	useModalStore(
		useShallow((s) => ({ showModal: s.showModal, hideModal: s.hideModal })),
	);
