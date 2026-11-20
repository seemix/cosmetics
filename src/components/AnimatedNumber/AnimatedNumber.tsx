'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

interface AnimatedNumberProps {
	value: number;
	/** What to render instead of the raw number (e.g. "9+"). */
	format?: (value: number) => string;
	className?: string;
}

/**
 * A number that rolls to its new value: up when it grows, down when it shrinks.
 */
export default function AnimatedNumber({
	value,
	format = String,
	className = '',
}: AnimatedNumberProps) {
	const reduceMotion = useReducedMotion();
	const [prev, setPrev] = useState(value);
	const [direction, setDirection] = useState(1);
	if (value !== prev) {
		setDirection(value > prev ? 1 : -1);
		setPrev(value);
	}

	const offset = reduceMotion ? 0 : 14;

	return (
		<span className={`inline-flex overflow-hidden ${className}`}>
			<AnimatePresence mode={'popLayout'} initial={false} custom={direction}>
				<motion.span
					key={value}
					custom={direction}
					variants={{
						enter: (d: number) => ({
							y: d * offset,
							opacity: 0,
							filter: 'blur(2px)',
						}),
						center: { y: 0, opacity: 1, filter: 'blur(0px)' },
						exit: (d: number) => ({
							y: -d * offset,
							opacity: 0,
							filter: 'blur(2px)',
						}),
					}}
					initial={'enter'}
					animate={'center'}
					exit={'exit'}
					transition={{ type: 'spring', stiffness: 500, damping: 32 }}
					className={'inline-block tabular-nums'}
				>
					{format(value)}
				</motion.span>
			</AnimatePresence>
		</span>
	);
}
