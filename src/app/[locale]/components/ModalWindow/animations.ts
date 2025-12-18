import type { ModalAppearance } from '@/app/[locale]/types/modal';

export function getAnimation(type: ModalAppearance) {
	switch (type) {
		case 'left':
			return {
				initial: { x: '-100%', opacity: 0 },
				animate: { x: 0, opacity: 1 },
				exit: { x: '-100%', opacity: 0 },
			};
		case 'right':
			return {
				initial: { x: '100%', opacity: 0 },
				animate: { x: 0, opacity: 1 },
				exit: { x: '100%', opacity: 0 },
			};
		default:
			return {
				initial: { scale: 0.7, opacity: 0 },
				animate: { scale: 1, opacity: 1 },
				exit: { scale: 0.7, opacity: 0 },
			};
	}
}
