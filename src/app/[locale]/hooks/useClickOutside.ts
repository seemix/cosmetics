import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T | null>,
	onOutsideClick: () => void,
	enabled: boolean = true,
) {
	useEffect(() => {
		if (!enabled) return;

		const handler = (event: MouseEvent | TouchEvent) => {
			if (!ref.current) return;

			if (!ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener("mousedown", handler);
		document.addEventListener("touchstart", handler);

		return () => {
			document.removeEventListener("mousedown", handler);
			document.removeEventListener("touchstart", handler);
		};
	}, [ref, onOutsideClick, enabled]);
}
