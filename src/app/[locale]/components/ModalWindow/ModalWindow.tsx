"use client";

import { AnimatePresence, motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { useModal } from "@/app/[locale]/hooks/useModal";

export default function ModalWindow() {
	const variants = {
		left: {
			hidden: { x: "-100%" },
			visible: { x: 0 },
		},
		right: {
			hidden: { x: "100%" },
			visible: { x: 0 },
		},
		zoom: {
			hidden: { scale: 0.8, opacity: 0 },
			visible: { scale: 1, opacity: 1 },
		},
	};
	const { open, appearance, content, hideModal } = useModal();

	return (
		<AnimatePresence>
			{open && [
				<motion.div
					key="overlay"
					onClick={hideModal}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
				/>,

				<motion.div
					key="wrapper"
					onClick={hideModal}
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={variants[appearance]}
					transition={{
						type: "tween",
						duration: 0.35,
						ease: "easeInOut",
					}}
					className={`fixed inset-0 z-50 flex items-center ${
						appearance === "left"
							? "justify-start"
							: appearance === "right"
								? "justify-end"
								: "justify-center"
					}`}
				>
					<motion.div
						className={`relative bg-white ${
							appearance !== "zoom" ? "h-dvh" : ""
						} min-w-70 max-w-120 shadow-lg`}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`flex w-full h-5 ${
								appearance === "right" ? "justify-start" : "justify-end"
							}`}
						>
							<button
								type="button"
								aria-label="Close"
								className="cursor-pointer m-3 transition-colors duration-300 hover:text-[var(--main)]"
								onClick={hideModal}
							>
								<IoCloseSharp size={33} />
							</button>
						</div>

						{content}
					</motion.div>
				</motion.div>,
			]}
		</AnimatePresence>
	);
}
