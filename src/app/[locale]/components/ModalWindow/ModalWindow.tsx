"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
	open: boolean;
	children: ReactNode | null;
	appearance: "left" | "right" | "zoom";
	onClose: () => void;
}

export default function ModalWindow({
	open,
	children,
	appearance,
	onClose,
}: ModalProps) {
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

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						onClick={onClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className={"fixed inset-0 bg-black/40 backdrop-blur-sm z-10"}
					/>
					<motion.div
						onClick={onClose}
						initial={"hidden"}
						animate={"visible"}
						exit={"hidden"}
						variants={variants[appearance]}
						transition={{
							type: "tween",
							duration: 0.35,
							ease: "easeInOut",
							delay: 0.1,
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
							className={`z-6 ${appearance !== "zoom" ? "h-dvh" : ""} bg-background relative min-w-70 max-w-120`}
							onClick={(e: React.MouseEvent<HTMLDivElement>) => {
								if ((e.target as HTMLElement).dataset.bubble === "true") return;
								e.stopPropagation();
							}}
						>
							<div
								className={`flex justify-between relative w-full h-5
                                             ${appearance === "right" ? "justify-start" : "justify-end"}`}
							>
								<button
                                    type={'button'}
                                    aria-label={'Close'}
									className={`cursor-pointer m-3 transition-colors duration-300 
                                                 hover:text-[var(--main)]`}
									onClick={onClose}
								>
									<IoCloseSharp size={33} />
								</button>
							</div>
							{children}
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
