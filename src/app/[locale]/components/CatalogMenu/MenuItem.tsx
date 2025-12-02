"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type catalogMenuItem = {
    name: string;
    link: string;
};

export default function MenuItem({ item }: { item: catalogMenuItem }) {
    const t = useTranslations('CatalogMenu');

    const [isOpen, setIsOpen] = useState(false);

    const toggleMobile = () => {
        // Мобільний режим лише до 640px
        if (window.innerWidth < 640) {
            setIsOpen(prev => !prev);
        }
    };

    return (
        <div className="relative group">
            <button
                onClick={toggleMobile}
                className="
                    text-lg uppercase flex items-center cursor-pointer transition-colors duration-300
                    sm:group-hover:text-[var(--main)]
                "
            >
                <Link href={item.link} className="text-lg font-semibold tracking-[0.05em]">
                    <span className="menu_item">{t(item.name)}</span>
                </Link>

                {/* Стрілка */}
                <svg
                    className={`w-5 h-5 transition-transform duration-300
                        sm:group-hover:rotate-180
                        ${isOpen ? "rotate-180 sm:rotate-0" : ""}
                    `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            <div
                className={`
                    relative sm:absolute left-0 bg-white text-black shadow-md transition-all duration-300 ease-in-out

                    /* DESKTOP (>=640px) — hover */
                    sm:opacity-0 sm:invisible sm:h-0 sm:translate-y-2
                    sm:group-hover:opacity-100 sm:group-hover:visible sm:group-hover:h-auto sm:group-hover:translate-y-0

                    /* MOBILE (<640px) — accordion */
                    ${isOpen ? "opacity-100 visible h-auto mt-2" : "opacity-0 invisible h-0"}
                `}
            >
                <ul className="w-40">
                    <li className="px-4 py-2 hover:bg-gray-100">Submenu 1</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Submenu 2</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Submenu 3</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Submenu 4</li>
                    <li className="px-4 py-2 hover:bg-gray-100">Submenu 5</li>
                </ul>
            </div>
        </div>
    );
}
