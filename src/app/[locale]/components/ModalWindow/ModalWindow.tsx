'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';

interface ModalProps {
    open: boolean;
    children: ReactNode | null;
    appearance: 'left' | 'right' | 'zoom';
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
            hidden: { x: '-100%' },
            visible: { x: 0 },
        },
        right: {
            hidden: { x: '100%' },
            visible: { x: 0 },
        },
        zoom: {
            hidden: { scale: .8, opacity: 0 },
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
                        transition={{ duration: .3 }}
                        className={'fixed inset-0 bg-black/40 backdrop-blur-sm z-10'}
                    />
                    <motion.div
                        onClick={onClose}
                        initial={'hidden'}
                        animate={'visible'}
                        exit={'hidden'}
                        variants={variants[appearance]}
                        transition={{ type: 'tween', duration: .35, ease: 'easeInOut' }}
                        className={`fixed inset-0 z-50 flex items-center ${
                            appearance === 'left'
                                ? 'justify-start'
                                : appearance === 'right'
                                    ? 'justify-end'
                                    : 'justify-center'
                        }`}
                    >
                        <motion.div
                            className={'z-6 top-0 p-6 bg-background relative min-w-70'}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`flex mt-10 justify-between relative w-full 
                                             ${appearance === 'left' ? 'justify-end' : 'justify-start'}`}>
                                <button
                                    className={`hover:bg-background cursor-pointer mt-5`}
                                    onClick={onClose}
                                >
                                    <IoCloseSharp size={33} color={'black'}/>
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