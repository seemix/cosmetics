import Link from 'next/link';
import { useTranslations } from 'next-intl';

type catalogMenuItem = {
    name: string,
    link: string,
}
export default function MenuItem({ item }: { item: catalogMenuItem }) {
    const t = useTranslations('CatalogMenu');

    return (
        <div className={'relative group p-2'}>
            <button
                className={'text-xl uppercase flex items-center cursor-pointer transition-colors duration-300 group-hover:text-[var(--main)]'}
            >
                <Link href={item.link} className={'text-xl font-semibold tracking-[0.05em]'}>
                    <span className={'menu_item'}>{t(`${item.name}`)}</span>
                </Link>
                <svg
                    className={'w-5 h-5 transition-transform duration-400 group-hover:rotate-180'}
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
                className="absolute left-0 mt-0 bg-white text-black shadow-md
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transition-all duration-500 ease-in-out transform translate-y-2 group-hover:translate-y-0"
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