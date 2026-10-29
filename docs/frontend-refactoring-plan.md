# Аудит фронтенду та план оновлення / рефакторингу

Дата аудиту: 2026-10-29. Гілка: `master` (`93779ec`).
Обмеження: **функціонал і зовнішній вигляд для користувача лишаються незмінними.** Пункти, виправлення яких
змінить видиму поведінку (навіть якщо це баг), винесено окремо в розділ 6 «Рішення, які потрібні від власника».

---

## 1. Резюме

| Напрям | Стан | Головне |
|---|---|---|
| Залежності | 🔴 | 34 вразливості (`npm audit`: 5 critical, 18 high). Усі прямі вразливі пакети (next, swiper, axios, zod, next-intl, richtext-lexical) закриваються оновленням **без мажорних змін**. |
| SEO | 🔴 | Canonical з layout успадковується всіма сторінками й указує на головну. Canonical товару веде на неіснуючий шлях `/products/…`. |
| Продуктивність | 🟠 | Повторний `router.refresh()` на кожному монтуванні сітки товарів для залогіненого користувача; zustand без селекторів (усі картки перерендерюються на кожну зміну кошика); `fill`-зображення без `sizes`; `priority` на всіх слайдах і новинах. |
| Надійність | 🟠 | Серверні `fetch` без перевірки `res.ok` → будь-яка помилка бекенду дає білий екран / error boundary; у сторах `loading` може «зависнути». |
| Архітектура | 🟡 | Увесь не-роутинговий код лежить у `src/app/[locale]/…`; barrel `components/index.ts` з циклічними імпортами; дублювання типів і логіки запитів. |
| Інструменти | 🟡 | Немає жодного тесту; ESLint-конфіг є, але не використовується (лінт — Biome); README шаблонний. |

`tsc --noEmit` — без помилок, `biome lint .` — без зауважень.

---

## 2. Поточний стек

| Пакет | Встановлено | Остання стабільна | Примітка |
|---|---|---|---|
| next | 16.1.5 | **16.4.3** | critical: request smuggling (діапазон ≤16.4.0) |
| react / react-dom | 19.2.0 | **19.3.1** | |
| next-intl | 4.4.0 | **4.14.9** | moderate: open redirect (≤4.9.1) |
| zustand | 5.0.9 | **5.0.16** | |
| zod | 4.3.4 | **4.6.7** | high: DoS (<4.6.6) |
| axios | 1.13.5 | **1.21.0** | high: SSRF / NO_PROXY (≤1.19.0) |
| react-hook-form | 7.69.0 | **7.91.0** | |
| @hookform/resolvers | 5.2.2 | 5.9.2 / **6.0.2** (major) | peer: zod ^4, RHF ^7.55 — сумісно |
| framer-motion | 12.23.24 | 12.43.0 / **14.7.1** (major) | 14.0.0 вийшла 2026-10-02 |
| swiper | 12.0.3 | 12.2.0 / **14.3.0** (major) | critical: prototype pollution (≤12.1.1), виправлено в 12.2.0 |
| @payloadcms/richtext-lexical | 3.68.4 | **3.92.1** | high; тягне `payload` і `@payloadcms/next` як peer — джерело більшості transitive-вразливостей |
| react-icons | 5.5.0 | **5.7.0** | |
| tailwind-merge | 3.4.0 | 3.7.0 | **не використовується в коді** |
| tailwindcss / @tailwindcss/postcss | 4.1.8 | **4.3.3** | |
| @biomejs/biome | 2.3.8 | **2.6.4** | |
| typescript | 5.8.3 | 5.9.3 / 6.0.3 / 7.0.2 | 7.x — нативний (Go) компілятор, див. 3.3 |
| @types/node | 20.19 | 24.x (під Node 24 LTS) | локально Node v24.21.0 |
| eslint-config-next, @eslint/eslintrc | 16.0.4 / 3.x | — | не використовуються (`lint` = biome) |
| baseline-browser-mapping | 2.9.0 | 2.11.34 | moderate DoS; потрібен лише щоб прибрати warning |

`node_modules` ≈ 1.2 GB — майже повністю через peer-залежності `payload` / `@payloadcms/next` / `monaco-editor`,
хоча фронтенд імпортує лише `@payloadcms/richtext-lexical/react` (рендер RichText).

---

## 3. Цільові версії й порядок оновлення

### 3.1 Крок A — patch/minor, без зміни API (низький ризик)

```bash
npm i next@16.4.3 react@19.3.1 react-dom@19.3.1 next-intl@4.14.9 zustand@5.0.16 zod@4.6.7 \
      axios@1.21.0 react-hook-form@7.91.0 @hookform/resolvers@5.9.2 framer-motion@12.43.0 \
      swiper@12.2.0 @payloadcms/richtext-lexical@3.92.1 react-icons@5.7.0
npm i -D tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 @biomejs/biome@2.6.4 typescript@5.9.3 \
         @types/react@19.3.0 @types/react-dom@19.3.0 @types/node@24 baseline-browser-mapping@latest
npm uninstall tailwind-merge eslint-config-next @eslint/eslintrc   # + видалити eslint.config.mjs
```

- Оновити `$schema` у `biome.json` до 2.6.4 (`npx @biomejs/biome migrate --write`).
- Після кроку `npm audit --omit=dev` має показувати лише transitive-залишки від `payload` (серверний код адмінки,
  у бандл сайту не потрапляє) — зафіксувати перелік у PR.
- Додати `"engines": { "node": ">=20.9" }` (вимога Next 16) і `.nvmrc` з `24`.

### 3.2 Крок B — мажорні оновлення, кожне окремим PR

| Пакет | План | Що перевірити |
|---|---|---|
| framer-motion → **motion** | Замінити пакет на `motion` (той самий API, імпорт `motion/react`), спершу на лінії 12.x, потім 14.x після читання changelog. | Анімації модалки, меню, кошика, акордеону, `AnimatePresence mode="popLayout"` у сітці. |
| swiper 12 → 14 | Тільки після вивчення migration guide; вразливість уже закрита 12.2.0, тож це не терміново. | Головний слайдер, бренди, related products, галерея товару + fullscreen (Zoom/Thumbs/Keyboard/Mousewheel). |
| @hookform/resolvers 5 → 6 | Peer-сумісний; перевірити типи `zodResolver` та виведення типів форм. | Усі 7 форм (login, register, forgot, reset, profile, checkout, promo). |
| typescript | 5.9.3 → **6.0.3**. TS 7 (нативний) — лише коли Next офіційно підтримає його для type-check під час `next build`. | `tsc --noEmit`, `next build`. |

### 3.3 Крок C — розглянути (опційно)

- **React Compiler** (`reactCompiler: true` у Next 16 + `babel-plugin-react-compiler`): прибирає потребу в ручних
  `useMemo`/`useCallback`, але сповільнює збірку. Вмикати після фази 5, коли стори вже з селекторами.
- **Заміна `@payloadcms/richtext-lexical`** на легкий власний рендер Lexical JSON (або пакет лише з рендерером) —
  прибере ~1 GB peer-залежностей і майже весь шум `npm audit`. Ризик: розбіжність у рендері контенту; робити лише з
  візуальними snapshot-тестами сторінок `pages/*`, `news/*`, бренду й опису товару.
- **axios → нативний `fetch`**-клієнт: −~13 KB gzip у клієнтському бандлі й один стиль запитів на сервері та клієнті.
  Не обовʼязково; робити разом із фазою 4.

---

## 4. Знахідки аудиту

Позначення: 🔴 критично, 🟠 важливо, 🟡 бажано. «UX» — чи змінить виправлення те, що бачить користувач.

### 4.1 SEO

| # | | Де | Проблема | UX |
|---|---|---|---|---|
| S1 | 🔴 | `[locale]/layout.tsx` → `getHomeMetadata` | `alternates.canonical = /{locale}` і title/description головної задаються в **layout**, тому їх успадковують усі сторінки без власного `generateMetadata` (каталог, категорії, бренди, новини, статичні сторінки, пошук). Google бачить їх як дублі головної. | ні (тільки `<head>`) |
| S2 | 🔴 | `meta/getProductMetadata.ts` | canonical і `og:url` будуються як `/{locale}/products/{slug}`, а роут — `/product/{slug}` → canonical на 404. Також `${backendUrl}/${url}` дає подвійний `/`, а `|| '/logo1.webp'` ніколи не спрацьовує; опис береться з `shortDescription`, але умова перевіряє `description`. | ні |
| S3 | 🟠 | `product/[slug]/page.tsx` | `generateMetadata` і сторінка ходять у **різні** ендпоінти (`/api/products?where[slug]…` та `/api/products/:slug`) → 2 запити й можливі розбіжності. | ні |
| S4 | 🟠 | `robots.ts` | `disallow: ['/cart', '/checkout']` без префікса локалі — реальні шляхи `/ru/checkout`, `/ro/checkout`, тож правило не працює. URL sitemap захардкоджено замість `assets.frontendUrl`. | ні |
| S5 | 🟡 | `sitemap.ts` | Лише 4 статичні сторінки; немає `/pages/partnership`, `/news`, товарів, категорій, брендів. Локалі дубльовано замість `routing.locales`. | ні |
| S6 | 🟡 | `Header/Logo.tsx` | `<h1>NEXT LEVEL</h1>` на кожній сторінці → кілька/неправильних h1. Заміна тегу на `<span>`/`<p>` з тими ж класами виглядає так само. | ні |

### 4.2 Продуктивність

| # | | Де | Проблема | UX |
|---|---|---|---|---|
| P1 | 🔴 | `hooks/useAuthPrices.ts` (+ `ProductCardsGrid`, `ProductDetails`, `RelatedProducts`) | `prevUserRef` стартує з `null`, тому при **кожному монтуванні** сітки, деталей товару чи слайдера для вже залогіненого користувача спрацьовує `!prevUser && user` → `router.refresh()`. На сторінці товару хук викликається двічі. Кожна клієнтська навігація каталогом = повторний RSC-запит до бекенду. Виправлення: ініціалізувати ref поточним `user` і викликати хук один раз глобально (у `CheckAuth`). | ні |
| P2 | 🟠 | усі компоненти, що використовують `useCartStore()`, `useAuthStore()`, `useModal()` | Підписка на **весь** стор без селекторів. Кожна зміна `itemLoading`/`cart` перерендерює всі `ProductCard` на сторінці; кожне відкриття модалки — усі компоненти, яким потрібен лише `hideModal`. Перейти на `useStore(s => s.x)` / `useShallow`. | ні |
| P3 | 🟠 | `ProductCard`, `ProductGallerySlider`, `FullScreenProductGallery`, `BrandCard`, `brand logo` у `ProductDetails` | `<Image fill>` без `sizes` → браузер завантажує варіант під `100vw`. Додати реальні `sizes` (напр. картка: `(min-width:640px) 255px, 50vw`). | ні |
| P4 | 🟠 | `PostsSlider`, `NewsCard` | `priority` (+ `loading="eager"`) на **кожному** слайді й **кожній** новині, і мобільна й десктопна версії обидві з `priority` (обидві завантажуються, хоч одна `display:none`). Зробити art direction через `getImageProps` + `<picture>`, `preload` лише для першого слайда (у Next 16 `priority` → `preload`). | ні |
| P5 | 🟠 | всюди `quality={95}`, слайдер `quality={100}` | Великі файли без видимої різниці. Пропоную 75–85; **візуально може трохи відрізнятись** → див. розділ 6. | так (мінімально) |
| P6 | 🟠 | `[locale]/layout.tsx` | Меню завантажується з `cache: 'no-cache'` на кожен запит **кожної** сторінки, без обробки помилок (`… .then(res => res.json()) \|\| []` — `\|\| []` ніколи не спрацює). Падіння бекенду меню = падіння всього сайту. | ні (обробка помилок) |
| P7 | 🟡 | `page.tsx` (головна), `brand/[slug]` | Пости й бренди запитуються з `Cookie` (не потрібна) → неможливо кешувати; на сторінці бренду два запити йдуть **послідовно** — обʼєднати в `Promise.all`. | ні |
| P8 | 🟡 | `components/index.ts` | Barrel із серверними й клієнтськими компонентами + циклічні імпорти (`Cart` → index → `Cart`). Погіршує HMR і tree-shaking. Імпортувати напряму. | ні |
| P9 | 🟡 | `ProductCard` | Анімація `filter: blur()` на кожній картці при скролі (дорого на мобільних). Можна лишити ефект, але через `LazyMotion` + `m` зменшити бандл motion (~30 KB → ~5 KB). | ні |
| P10 | 🟡 | `[locale]/layout.tsx` | Завантажуються два шрифти, обидва `className` на `body` — перший перекривається другим (Roboto фактично не застосовується, але завантажується). Див. також D2. | див. D2 |

### 4.3 Надійність / баги без зміни UX

| # | | Де | Проблема |
|---|---|---|---|
| R1 | 🔴 | усі серверні сторінки | `fetch(...).then(res => res.json())` без `res.ok`. 404 бренду → `brand.logo.url` TypeError; 404 товару → обʼєкт помилки truthy, тож `NoContent` ніколи не показується. Потрібна обгортка `serverFetch` з обробкою помилок і `notFound()` там, де зараз падає в error boundary (поведінка «показати NoContent» лишається). |
| R2 | 🟠 | `stores/auth.store.ts` | `forgotPassword`, `updateUserInfo` не скидають `loading` у `catch` → вічний спінер. `checkAuth` для гостя записує в `error` повідомлення 401, і воно показується у формі логіну до першої спроби входу (поки не зміниться pathname). |
| R3 | 🟠 | `stores/auth.store.ts` → `logout` | Локаль захардкоджена `'ru'`; `init()` уже викликає `load`, а потім `adapter.load('ru')` ще раз (результат відкидається); далі `CheckAuth` знову робить `init` → 3 запити кошика. |
| R4 | 🟠 | `stores/cart.store.ts` | `init`/`loadCart`/`addItem`/`updateQty` без `try/finally`: при помилці `itemLoading` лишається, кнопка «в кошик» крутиться вічно; unhandled rejections. `clear()` для авторизованого кошика записує в `cart` **обʼєкт AxiosResponse** (працює випадково, бо в нього немає `items`). Поле `loading` ніде не встановлюється. `loadCart` оголошено async, але не чекає. |
| R5 | 🟠 | `services/cart/guestCart.adapter.ts` | `load` йде з `?locale=`, а `addItem/updateQty/removeItem` — без → після дії назви в гостьовому кошику перемикаються на мову за замовчуванням. `updateQty` падає, якщо товару немає в localStorage (`index = -1`). Повертає `null` при типі `Promise<Cart>`. |
| R6 | 🟠 | `search/page.tsx`, `news/page.tsx` | Компонент `Pagination` пише `?page=`, але сторінки **не передають** `page` у запит до бекенду → пагінація пошуку й новин завжди показує першу сторінку. |
| R7 | 🟠 | `stores/search.store.ts` | Немає обробки помилок (`loading` зависає) і захисту від гонки: пізня відповідь на старий запит перезаписує новішу. Додати `AbortController`. |
| R8 | 🟡 | `CheckoutForm`, `LoginForm` | `setTimeout` без очищення в `useEffect`; `error` у `checkout.store` не скидається перед новою спробою. |
| R9 | 🟡 | `ProductGallerySlider` | `onSwiper` **обох** Swiper-ів пише в `mainSwiper` (останній перемагає); `zoom` задано на swiper-і без модуля Zoom; модуль `Thumbs` підключено, але не звʼязано. Працює випадково — переписати з `thumbs={{ swiper }}` без зміни вигляду. |
| R10 | 🟡 | `BreadCrumbs`, `MenuItem` | `array.length && …` рендерить `0` при порожньому масиві. Ключі `item.id` можуть бути `undefined` (бренд не знайдено). |
| R11 | 🟡 | `PaginationButton` | `${currentPage === page && '…'}` додає клас `"false"`; `aria-label="decrease-quantity"` на кнопці сторінки. |
| R12 | 🟡 | `FavoriteButton` | Дублює похідний стан (`useState` + `useEffect` + `mounted`), без обробки помилок запиту. Достатньо `favorites.includes(id)` через селектор. |
| R13 | 🟡 | `proxy.ts` | Блок «захищені роути» — мертвий код: `intlMiddleware` завжди повертає відповідь, тож до перевірки cookie виконання не доходить. Реальний захист — `(protected)/layout.tsx` (редірект на `/`). Див. D4. |

### 4.4 Архітектура та якість коду

| # | | Проблема | Пропозиція |
|---|---|---|---|
| A1 | 🟠 | `components/`, `stores/`, `services/`, `hooks/`, `types/`, `assets/`, `meta/` лежать у сегменті роуту `src/app/[locale]/` → імпорти `@/app/[locale]/…`, змішування роутингу й бібліотечного коду. | Перенести в `src/components`, `src/stores`, `src/lib` (api, cart, seo), `src/hooks`, `src/types`, `src/config`. Механічний PR без змін логіки. |
| A2 | 🟠 | Дві змінні бази бекенду: `process.env.API_URL` (меню в layout) і `NEXT_PUBLIC_SERVER_URL` (усе інше). У `.env` ще `BACKEND_URL`, `BACKEND_URL2`, `API_URL2`, `PORT` — не використовуються. | Один модуль `src/config/env.ts` з валідацією через zod (падати на старті, а не в рантаймі); `.env.example` у репозиторії. |
| A3 | 🟠 | Логіка серверних запитів скопійована в кожну сторінку (URL, `cookies()`, `credentials: 'include'` — на сервері не має сенсу). | `src/lib/api/server.ts`: `serverFetch<T>(path, { locale, withCookies, revalidate })` + функції `getProduct`, `getBrand`, `getCategoryProducts`… обгорнуті в React `cache()` (спільні для `generateMetadata` і сторінки). |
| A4 | 🟠 | Навігація через `next/link` і `next/navigation`, хоча `src/i18n/navigation.ts` уже експортує локалізовані `Link/useRouter/usePathname`. Посилання на кшталт `/product/x` працюють лише через редірект middleware (+1 запит), відносні `../product/…`, `../brand/…` крихкі. | Замінити на `@/i18n/navigation` — ті самі адреси, без редіректу. `tel:` і зовнішні посилання — звичайний `<a>`. |
| A5 | 🟡 | Дублі типів: `UserState` (у `auth.store.ts` і `types/user-state.ts`, різні поля), `ICartItem` = `CartItem`, два різні `LoginFormData`, `IShippingAddress` vs інлайн-тип у `createNewOrder`. Відповіді API — `any`. | Єдині типи в `src/types/api.ts`; `ProductImage` замість копій `{url, alt, sizes…}`. |
| A6 | 🟡 | Мертвий код: `ModalWindow/animations.ts`, `types/modal.ts → ModalProps`, `components/style.css`, `Menu/CatalogMenu/catalogMenuData.ts`, `Menu/MenuProviderWrapper.tsx`, порожній `hooks/useInitCart.ts`, `assets/uppercut_.webp` (100 KB), `assets/supply_logo.webp`, `public/logo0.webp`(перевірити), remotePattern `barbercompany.com`, закоментовані `pathnames` у `routing.ts`. | Видалити. |
| A7 | 🟡 | Зайві `'use client'` (`HeadMenu`, `ProductLabels`, `NoContent`, `ErrorComponent`, `LoginLinkButton`-обгортки) та `async` без `await` (`Header`, `BreadCrumbs`, `NewsCard`). | Прибрати; `useTranslations` працює і в серверних компонентах. |
| A8 | 🟡 | Модалка зберігає `ReactNode` у zustand-сторі. | Лишити механізм, але типізувати реєстр модалок (`'cart' \| 'login' \| …`) — опційно, наприкінці. |
| A9 | 🟡 | Однакові класи кнопок/меню скопійовані в десятках місць; дрібні помилки класів (`border-gray-300]`, `ml-5 ml-5`, `border-red border-1 … border`, клас `h`). | Винести 3–4 базові компоненти (`Button`, `DropdownItem`) з **тими самими** класами; виправити опечатки, що не мають ефекту. |
| A10 | 🟡 | `LanguageSwitcher` вручну ріже pathname і **втрачає query** (`?query=`, `?sort=`, `?page=`). | `router.replace({ pathname, query }, { locale })` з next-intl. Див. D5. |
| A11 | 🟡 | `UserButton`/`AuthUserButton`: `<Link href="">` з `type="button"` у ролі кнопок «Вхід»/«Вихід» (soft-навігація на поточний URL). | Справжні `<button>` з тими самими класами. |
| A12 | 🟡 | Хардкод: `MyOrders` — `'uk-UA'` і `'MDL'`, `ErrorComponent` — «Something went wrong», `getProductMetadata` — «Product Not Found», рік у футері. | Перенести в `messages/*.json` / `assets.currency` / `new Date().getFullYear()`. Тексти лишаються тими самими. |
| A13 | 🟡 | `tsconfig.json`: `target: ES2017`, `allowJs`, дубльовані `.next\\dev/types` у `include`. | `ES2022`, прибрати `allowJs`, дублікати. Опційно `noUncheckedIndexedAccess`. |
| A14 | 🟡 | `dev`: `next dev --turbopack` — у Next 16 Turbopack за замовчуванням. | `next dev -p 3001`. Додати скрипти `typecheck`, `check` (`biome check`), `test`, `test:e2e`. |

### 4.5 Доступність (без зміни вигляду)

- Модалка: немає `role="dialog"`, `aria-modal`, закриття по `Esc` (є лише у fullscreen-галереї), повернення фокусу.
- `FullScreenProductGallery`: `aria-hidden="true"` на кореневому контейнері ховає всю галерею від скрінрідерів.
- Невірні `aria-label` (`"search"` на кнопці користувача, `"add-to-cart"` на «вже в кошику», `"decrease-quantity"` у пагінації).
- Десктопне меню каталогу відкривається тільки hover — недоступне з клавіатури (`onFocus`/`onBlur` без зміни вигляду).
- Інпути кількості без `aria-label`; кнопки-іконки (видалити з кошика) без підпису.

---

## 5. План робіт по фазах

Кожна фаза — окремий PR (або кілька), після кожної: `npm run typecheck && npm run check && npm run build` + e2e smoke.

### Фаза 0. Страховка (перед будь-якими змінами) — ~1–1.5 дня
1. Додати **Playwright** зі smoke-сценаріями (на staging-бекенді):
   головна (слайдер, бренди, бестселери) · категорія + сортування + пагінація · бренд + акордеон · товар + галерея +
   fullscreen · пошук (модалка + сторінка) · гостьовий кошик (додати / змінити кількість / видалити / очистити) ·
   промокод · логін → злиття кошика → оптові ціни · checkout (cash і transfer + SRL) · обране · профіль · замовлення ·
   перемикання мови · реєстрація / forgot password (до відправки).
2. Візуальні snapshot-и ключових сторінок у ru/ro, mobile/desktop (`toHaveScreenshot`) — критерій «вигляд не змінився».
3. **Vitest** для чистої логіки: `guestCart.adapter`, `localStorage.service`, `buildCategoryChain`, zod-схеми, сторів.
4. Зняти baseline: розмір First Load JS з `next build`, Lighthouse (mobile) для головної, категорії, товару.

### Фаза 1. Оновлення залежностей, крок A — ~0.5 дня
- Виконати 3.1, прибрати ESLint і `tailwind-merge`, оновити `biome.json`, `engines`, `.nvmrc`, скрипти (A14).
- Перевірити: `next build`, e2e, `npm audit --omit=dev`.

### Фаза 2. Мажорні оновлення, крок B — ~1–2 дні
- Окремими PR: `framer-motion` → `motion`; `@hookform/resolvers@6`; `typescript@6`; `swiper@14` (останнім, лише якщо
  migration guide не вимагає змін у розмітці слайдерів — інакше лишити 12.2.x).

### Фаза 3. Чистка без зміни логіки — ~0.5–1 день
- A6 (мертвий код), A7, A9 (опечатки класів), A12, A13, R10, R11, a11y-атрибути з 4.5.
- Відмовитися від barrel `components/index.ts` на користь прямих імпортів (P8) — codemod.

### Фаза 4. Шар даних — ~2 дні
1. `src/config/env.ts` (A2) і `.env.example`.
2. `src/lib/api/server.ts` + доменні функції з `cache()` (A3); перевірка `res.ok`, `notFound()` / `NoContent` (R1).
3. `Promise.all` замість послідовних запитів (P7); обробка помилок меню з fallback на порожнє меню (P6).
4. Передати `page` у пошук і новини (R6).
5. Клієнтський `apiClient` (axios або fetch, див. 3.3) з єдиним `getErrorMessage`; прибрати `?locale=` зі строк
   на користь `params`.
6. Типи відповідей API (A5).

### Фаза 5. Стан (zustand) — ~1.5 дня
1. Селектори / `useShallow` у всіх споживачах (P2); `useModal` → окремі хуки `useModalActions()`.
2. `cart.store`: `try/finally` для всіх дій, коректний `clear`, видалити невикористаний `loading` або почати його
   ставити, `loadCart` → один шлях через `init` (R4).
3. `guestCartAdapter`: локаль у всіх викликах, захист від `index = -1`, коректні типи (R5).
4. `auth.store`: скидати `loading` у всіх гілках, не писати 401 від `checkAuth` у `error`, `logout(locale)` без
   дублюючих завантажень, паралельний запит обраного (R2, R3).
5. `search.store`: abort попереднього запиту, обробка помилок (R7).
6. `useAuthPrices`/`useLogoutRefresh` → один хук у `CheckAuth`, ref ініціалізується поточним user (P1).
7. Vitest-тести на кожен стор.

### Фаза 6. Компоненти й продуктивність — ~2 дні
1. Локалізована навігація `@/i18n/navigation` (A4), `<a>` для `tel:`/зовнішніх, `<button>` замість `Link href=""` (A11).
2. `next/image`: `sizes` (P3), art direction через `getImageProps`, `preload` лише для першого слайда (P4).
3. `ProductGallerySlider` / `FullScreenProductGallery` — коректне звʼязування Thumbs (R9), без зміни вигляду.
4. `FavoriteButton`, `SortSelect` — похідний стан замість `useEffect`-синхронізації (R12).
5. `LazyMotion` + `m` (P9); `CheckoutForm`/`LoginForm` — очищення таймерів (R8).
6. Базові `Button`/`DropdownItem` (A9); a11y модалки (4.5).
7. Порівняти First Load JS і Lighthouse з baseline фази 0.

### Фаза 7. SEO — ~1 день
1. Метадані головної перенести з layout у `[locale]/page.tsx`; у layout — лише `metadataBase`, `title.template`,
   іконки (S1).
2. `generateMetadata` для категорій, брендів, новин, статичних сторінок, пошуку (`robots: noindex`).
3. Виправити `getProductMetadata` (S2) і використати спільний `getProduct` (S3).
4. `robots.ts` з префіксами локалей і `frontendUrl` (S4); `sitemap.ts` з `routing.locales` і динамічними
   сторінками (S5); `h1` у логотипі (S6).

### Фаза 8. Структура проєкту — ~0.5–1 день
- Перенесення каталогів з `src/app/[locale]/` (A1) одним механічним PR (лише `git mv` + оновлення імпортів), щоб не
  змішувати з логічними змінами. Може виконуватися відразу після фази 3, якщо зручніше.
- Оновити README: запуск, змінні оточення, скрипти, структура.

Орієнтовно всього: **10–13 робочих днів**.

---

## 6. Рішення, які потрібні від власника

Ці пункти — справжні проблеми, але їх виправлення **змінить** те, що бачить користувач. За замовчуванням у плані
вони **не виконуються**.

| # | Питання | Деталі |
|---|---|---|
| D1 | Плагін `@tailwindcss/typography` | `StaticPage` і `ContentAccordion` використовують класи `prose …`, але плагін не підключено — вони не діють. Підключення змінить типографіку статичних сторінок і описів брендів. |
| D2 | Шрифти | Обидва шрифти підключено лише з `subsets: ['latin']` → **кирилиця для `ru` рендериться системним шрифтом**. `font-(family-name:--font-roboto)` не працює, бо класи `.variable` не додано до `<html>`. Виправлення (cyrillic + змінні) помітно змінить вигляд російської версії. |
| D3 | Якість зображень | Зниження `quality` з 95/100 до 75–85 (P5). |
| D4 | Захищені роути | Зараз гість на `/orders`, `/profile`, `/favorites` отримує редірект на `/`. Задумано (судячи з мертвого коду в `proxy.ts`) — редірект на `/login?redirect=…`. Обрати поведінку; мертвий код видаляється в будь-якому разі. |
| D5 | Збереження query при зміні мови | Після виправлення A10 пошук/сортування/сторінка зберігатимуться при перемиканні мови. |
| D6 | Кешування меню, брендів, постів | `revalidate` (напр. 5 хв) прискорить усі сторінки, але зміни в адмінці зʼявлятимуться із затримкою (або потрібен webhook `revalidateTag` з Payload). |
| D7 | Хлібні крихти | Посилання в `BreadCrumbs` закоментовані, slug-и в сторінках задані непослідовно (`'main'`, `'orders'` для профілю тощо). Увімкнути посилання? |

---

## 7. Поза рамками цього плану (новий функціонал)

- Підтримка поля `inStock` і помилки `409 INSUFFICIENT_STOCK` при створенні замовлення — описано в
  `docs/frontend-stock-notes.md`. Зараз фронтенд не читає `inventory`, тож нічого не зламано, але показ «немає в
  наявності» для `inStock === false` і обробка 409 у `checkout.store` — окрема задача. Після фази 4 (типи API, єдиний
  клієнт) її реалізація стане значно простішою.
- Персистентна сторінка успішного замовлення (зараз номер тримається лише в памʼяті — після перезавантаження `#`).
- Перехід на Cache Components / PPR (Next 16).

---

## 8. Чекліст регресії (ручний, на додаток до e2e)

- [ ] ru/ro: головна, каталог, категорія (сортування, пагінація), бренд (акордеон), товар (галерея, zoom, fullscreen, related)
- [ ] Пошук: модалка (debounce, ≥3 символи, Enter), сторінка результатів
- [ ] Гість: додати в кошик, кількість, видалення, очищення, промокод (успіх/помилка/без знижки), checkout cash/transfer
- [ ] Логін: злиття гостьового кошика, оптові ціни після входу, обране, вихід → гостьовий кошик і роздрібні ціни
- [ ] Реєстрація → verify-email, forgot password, reset password, verify token
- [ ] Профіль (збереження), історія замовлень, обране (видалення з анімацією)
- [ ] Мобільна версія: нижня панель хедера, бургер-меню, кошик справа, модалки
- [ ] `<head>`: title/description/canonical/hreflang на головній, товарі, категорії

---

## 9. Статус виконання (2026-10-29, гілка `refactor/frontend-modernization`)

Рішення власника взято з `docs/responses.md`: D1 — прибрати `prose`; D2 — виправити шрифти окремим комітом;
D3 — якість 80; D4 — лишити редірект на головну з локаллю, прибрати мертвий код; D5 — зберігати query;
D6 — кеш 5 хв; D7 — хлібні крихти з посиланнями.

| Фаза | Коміт | Стан |
|---|---|---|
| 0–1. Тести + оновлення minor/patch | `8d1f8c3` | ✅ `npm audit`: 34 → 11 (усі транзитивні від `payload`) |
| 2. Мажорні оновлення | `da46887` | ✅ motion 14, swiper 14, resolvers 6, TS 6.0.3 |
| 3. Чистка | `3d62769` | ✅ |
| 8a. Перенесення структури | `0a911d1`, `ee67f89` (форматування) | ✅ |
| 4. Шар даних | `2d0af25` | ✅ R1, R6, P6, P7, A2, A3, A5 |
| 5. Стан | `8736919` | ✅ P1, P2, R2–R5, R7, R12 |
| 6. Компоненти / продуктивність | `3915d2d` | ✅ A4, A10, A11, P3, P4, R8, R9, D3, D5, D7 |
| 7. SEO | `ec64db5` | ✅ S1–S6 |
| D2. Шрифти | `f5332af` | ✅ |
| 8b. proxy, клавіатурне меню, README | `c5b02ad` | ✅ R13, D4 |

Свідомо не зроблено:
- **P9 / LazyMotion** — кошик і сітка використовують layout-анімації (потрібен `domMax`), виграш ~4 KB.
- **A8** (типізований реєстр модалок) і повний набір базових UI-компонентів (A9) — винесено лише `DropdownItem`.
- **Крок C** (React Compiler, заміна `@payloadcms/richtext-lexical`, axios → fetch) — опційно, окремими задачами.
- TypeScript 7 — чекає офіційної підтримки в Next.js.

Перевірка: `npm run typecheck`, `npm run check`, `npm test` (19), `npm run test:e2e` (71 + 3 skipped для мобільного),
усі зелені. Заміри (локально, production-бекенд): зображення на головній 1223 → 594 KB (desktop) і 916 → 334 KB (mobile),
новини 788 → 250 KB (mobile), JS на сторінку 348 → 295–334 KB.

Не покрито автотестами (потребує ручної перевірки на staging з авторизацією): логін і злиття кошика, оптові ціни,
промокод, оформлення замовлення, обране, профіль, скидання пароля — див. чекліст у розділі 8.
