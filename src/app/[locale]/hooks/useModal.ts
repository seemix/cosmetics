import { useModalStore } from "@/app/[locale]/stores/modal-store";

export const useModal = () => {
	const { open, appearance, content, showModal, hideModal } = useModalStore();
	return { open, appearance, content, showModal, hideModal };
};
