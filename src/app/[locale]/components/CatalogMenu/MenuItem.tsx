'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

type catalogMenuItem = {
    name: string;
    link: string;
    children?: string[];
};

export default function MenuItem({
                                     item,
                                     openItem,
                                     setOpenItem,
                                 }: {
    item: catalogMenuItem;
    openItem: string | null;
    setOpenItem: (key: string | null) => void;
}) {
    const t = useTranslations('CatalogMenu');

    const isOpen = openItem === item.name;

    const toggle = () => {
        setOpenItem(isOpen ? null : item.name);
    };

    return (
        <div className="relative p-2">
            {/* MOBILE */}
            <div className="block md:hidden border-b">
                <button
                    type={'button'}
                    aria-label={'open-submenu'}
                    onClick={toggle}
                    className="flex cursor-pointer items-center justify-between py-3 w-full uppercase text-lg md:text-base font-semibold"
                >
                    <span>{t(item.name)}</span>

                    <motion.svg
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.35a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06-.02z"/>
                    </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: .35 }}
                            className="pl-4 pb-3 space-y-1 overflow-hidden"
                        >
                            {(item.children ?? []).map((child, i) => (
                                <div key={String(i)}>{child}</div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* DESKTOP */}
            <motion.div
                className={`hidden md:flex items-center gap-1 relative uppercase text-lg 
                            font-semibold tracking-[0.05em] cursor-pointer`}
                onHoverStart={() => setOpenItem(item.name)}
                onHoverEnd={() => setOpenItem(null)}
                animate={{
                    color: isOpen ? 'var(--main)' : 'black',
                }}
                whileHover={{
                    color: 'var(--main)',
                }}
                transition={{ duration: .25 }}
            >
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="submenu"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: .35 }}
                            className="absolute left-0 top-full bg-white shadow w-40 py-2 z-[100]"
                        >
                            {(item.children ?? []).map((child, i) => (
                                <div
                                    key={String(i)}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer 
                                                text-black hover:text-[var(--main)] transition-colors duration-300`}
                                >
                                    {child}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.span
                    animate={{
                        color: isOpen ? 'var(--main)' : 'black',
                    }}
                    whileHover={{
                        color: 'var(--main)',
                    }}
                    transition={{ duration: .25 }}
                >
                    {t(item.name)}
                </motion.span>

                {/* ICON */}
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: .25 }}
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"/>
                </motion.svg>
            </motion.div>
        </div>
    );
}
