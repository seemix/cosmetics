'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

type catalogMenuItem = {
    name: string;
    link: string;
    children?: string[];
};

export default function MenuItem({ item }: { item: catalogMenuItem }) {
    const t = useTranslations('CatalogMenu');

    return (
        <div className="relative">

            {/* MOBILE — Accordion */}
            <details className="group block sm:hidden border-b">
                <summary
                    className="flex items-center justify-between py-3 cursor-pointer uppercase text-lg font-semibold tracking-[0.05em]">
                    <Link href={item.link} className="menu_item">
                        {t(item.name)}
                    </Link>

                    {/* ✔ Стрілка вправо → (початкова)
                        ✔ При відкритті вниз ↓ (rotate-90)
                    */}
                    <svg
                        className="w-5 h-5 transition-transform rotate-0 group-open:rotate-90"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.35a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06-.02z"
                            clipRule="evenodd"
                        />
                    </svg>
                </summary>

                <div className="pl-4 pb-3 space-y-1">
                    {(item.children ?? []).map((child, i) => (
                        <div key={i} className="py-1 hover:text-[var(--main)] cursor-pointer">
                            {child}
                        </div>
                    ))}
                </div>
            </details>

            {/* DESKTOP — Hover */}
            <div className="hidden sm:block group relative">
                <button
                    className="uppercase text-lg flex items-center font-semibold tracking-[0.05em] group-hover:text-[var(--main)]">
                    <Link href={item.link}>{t(item.name)}</Link>

                    <svg
                        className="w-5 h-5 ml-1 transition-transform group-hover:rotate-180"
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

                <div
                    className="
                        absolute left-0 top-full
                        hidden group-hover:block
                        bg-white text-black shadow-md
                        w-40 py-2
                    "
                >
                    {(item.children ?? []).map((child, i) => (
                        <div
                            key={i}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
