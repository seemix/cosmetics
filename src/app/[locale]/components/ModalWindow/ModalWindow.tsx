'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useModal } from '@/app/[locale]/hooks/useModal';

const PANEL_WIDTH = 500;

export default function ModalWindow() {
    const variants = {
        left: {
            hidden: { x: -PANEL_WIDTH },
            visible: { x: 0 },
        },
        right: {
            hidden: { x: PANEL_WIDTH },
            visible: { x: 0 },
        },
        zoom: {
            hidden: { scale: 0.8, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
        },
    };

    const { open, appearance, content, hideModal } = useModal();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        onClick={hideModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .25 }}
                        className={'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm'}
                    />

                    <div
                        className={`fixed inset-0 z-50 flex items-stretch pointer-events-none ${
                            appearance === 'left'
                                ? 'justify-start'
                                : appearance === 'right'
                                    ? 'justify-end'
                                    : 'justify-center'
                        }`}
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={'hidden'}
                            animate={'visible'}
                            exit={'hidden'}
                            variants={variants[appearance]}
                            transition={{
                                type: 'tween',
                                duration: .35,
                                ease: 'easeInOut',
                            }}
                            className={`pointer-events-auto flex flex-col overflow-hidden 
                                   ${appearance!== 'zoom' ? 'bg-background max-w-125' : 'items-center justify-center'}`}
                        >
                            {content}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
