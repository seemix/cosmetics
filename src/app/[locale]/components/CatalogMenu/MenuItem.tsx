'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';

type catalogMenuItem = {
    name: string;
    link: string;
    children?: string[];
};

export default function MenuItem({ item }: { item: catalogMenuItem }) {
    const t = useTranslations('CatalogMenu');
    // const router = useRouter();

    // Аккордеон стан (тільки для мобільної версії)
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Анімація: встановлюємо inline maxHeight при відкриванні/закриванні
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        if (open) {
            // вимірюємо повну висоту контенту і ставимо maxHeight для плавного розкриття
            const full = el.scrollHeight;
            el.style.maxHeight = full + 'px';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            // сховаємо
            el.style.maxHeight = '0px';
            el.style.opacity = '0';
            el.style.transform = 'translateY(-6px)';
        }
    }, [open]);

    // Щоб після transition при відкритті не було обрізання через маленький maxHeight,
    // можна прибрати maxHeight після transition, але це не обов'язково.
    // Додаємо listener щоб прибрати maxHeight коли анімація завершена (щоб контент міг рости)
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const onTransitionEnd = (e: TransitionEvent) => {
            if (open && e.propertyName === 'max-height') {
                // дозволити реальну висоту (щоб внутрішні елементи не обрізались при зміні контенту)
                el.style.maxHeight = 'none';
            }
        };
        el.addEventListener('transitionend', onTransitionEnd);
        return () => el.removeEventListener('transitionend', onTransitionEnd);
    }, [open]);

    // Клік по заголовку: якщо клікнули по <a> — дозволяємо навігацію,
    // інакше просто перемикаємо аккордеон.
    const onHeaderClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor) {
            // Якщо користувач натиснув посилання всередині заголовка,
            // дозволимо стандартну навігацію (Next.js Link) — нічого не робимо.
            // Але якщо ви хочете, щоб при кліку по заголовку також відкривалось меню,
            // можна дописати router.push(item.link) тут.
            return;
        }
        e.preventDefault();
        setOpen((v) => !v);
    };

    return (
        <div className="relative">
            {/* MOBILE — custom accordion */}
            <div className="block sm:hidden border-b" ref={wrapperRef}>
                <button
                    onClick={onHeaderClick}
                    className="w-full flex items-center justify-between py-3 cursor-pointer uppercase text-lg font-semibold tracking-[0.05em] bg-transparent"
                    aria-expanded={open}
                >
                    {/* Текст — звичайний спан (щоб клік по тексту теж тригерив відкриття).
              Якщо ви хочете, щоб клік по назві переходив на сторінку,
              натисніть маленьку іконку або додайте окрему кнопку-посилання. */}
                    <span className="menu_item">{t(item.name)}</span>

                    {/* Якщо бажаєте, зробимо саму іконку лінкою — залишу її як індикатор */}
                    <div className="flex items-center ml-2">
                        <Link href={item.link} >
                            <svg
                                className={`w-5 h-5 transition-transform ${open ? 'rotate-90' : 'rotate-0'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.35a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </button>

                {/* Контент з анімацією */}
                <div
                    ref={contentRef}
                    className="pl-4 pb-3 space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
                    // початкові inline-стилі щоб приховати
                    style={{
                        maxHeight: '0px',
                        opacity: 0,
                        transform: 'translateY(-6px)',
                    }}
                >
                    {(item.children ?? []).map((child, i) => (
                        <div
                            key={i}
                            className="py-1 hover:text-[var(--main)] cursor-pointer"
                            // якщо дочірній елемент має посилання — можна зробити так:
                            // onClick={() => router.push(...)}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* DESKTOP — Hover (без змін) */}
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
                                absolute left-0 top-full z-10 bg-white text-black shadow-md w-40 py-2
                                opacity-0 scale-95 pointer-events-none
                                transition-all duration-300 ease-out
                                 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                                "
                >

                    {(item.children ?? []).map((child, i) => (
                        <div key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
