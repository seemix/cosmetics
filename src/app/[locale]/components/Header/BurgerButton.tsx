"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { BurgerMenu } from "@/app/[locale]/components";
import { useModal } from "@/app/[locale]/hooks/useModal";

export default function BurgerButton() {
	const { showModal } = useModal();

	return (
		<button
			type={"button"}
			aria-label="Open-close Menu"
			className={"flex gap-6 md:hidden"}
			onClick={() => {
				showModal(<BurgerMenu />, "left");
			}}
		>
			<RxHamburgerMenu
				size={35}
				className={"block md:hidden cursor-pointer items-center h-full"}
			/>
		</button>
	);
}
