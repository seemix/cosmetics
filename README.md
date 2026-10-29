# Next Level Shop — frontend

Storefront of [nextlevelshop.md](https://nextlevelshop.md): Next.js 16 (App Router, Turbopack), React 19,
next-intl (ru/ro), Zustand, Tailwind CSS 4. Content, catalog, cart and orders come from the Payload CMS
backend (`cosmetics-backend`).

## Requirements

- Node.js ≥ 20.9 (`.nvmrc` pins 24)
- A running backend (local `http://localhost:3000` or the production API)

## Setup

```bash
npm install
cp .env.example .env    # adjust URLs
npm run dev             # http://localhost:3001
```

### Environment

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SERVER_URL` | build time, client + server | Backend origin; REST API at `<url>/api`, media URLs |
| `NEXT_PUBLIC_SITE_URL` | build time | Public origin of the site: canonical URLs, hreflang, sitemap |
| `API_URL` | runtime, server only, optional | API root for the menu request (e.g. an internal address); defaults to `<NEXT_PUBLIC_SERVER_URL>/api` |

Values are validated in `src/config/env.ts`. `NEXT_PUBLIC_*` are inlined at build time, so a change needs a rebuild.

## Scripts

| Script | |
|---|---|
| `npm run dev` | Dev server on port 3001 |
| `npm run build` / `npm start` | Production build / server |
| `npm run check` | Biome: lint, formatting, import order |
| `npm run lint` / `npm run format` | Biome lint only / format in place |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests (`tests/`) |
| `npm run test:e2e` | Playwright smoke and visual tests (`e2e/`) |

### End-to-end tests

The Playwright tests are read-only (no login, no orders), so they can run against the production API.
Build with the backend you want to test, then run the tests; Playwright starts `next start -p 3101` itself:

```bash
NEXT_PUBLIC_SERVER_URL=https://admin.nextlevelshop.md NEXT_PUBLIC_SITE_URL=http://localhost:3101 npm run build
NEXT_PUBLIC_SERVER_URL=https://admin.nextlevelshop.md npm run test:e2e
```

Visual snapshots live in `e2e/visual.spec.ts-snapshots/` (rendered on Windows). After an intended visual
change, refresh them with `npm run test:e2e -- e2e/visual.spec.ts --update-snapshots`. Sample slugs are in
`e2e/fixtures.ts` and can be overridden with `E2E_*` variables.

## Structure

```
src/
  app/[locale]/        routes only (pages, layouts, metadata); (protected) = account pages
  app/robots.ts, sitemap.ts
  components/          UI components, one folder per component
  config/              env validation, shop constants (currency, phone, links)
  hooks/               client hooks (modal actions, session refresh, click outside)
  i18n/                next-intl routing and locale-aware Link/router
  lib/api/             server data layer (serverFetch + cached queries) and browser client
  lib/cart/            guest (localStorage) and authenticated cart adapters
  lib/seo/             page metadata helpers
  stores/              Zustand stores
  types/               shared types, API response shapes
messages/              ru.json, ro.json
```

### Conventions

- Server data goes through `src/lib/api/queries.ts`. Queries are wrapped in React `cache()` and take
  primitive arguments, so `generateMetadata` and the page share one request.
- Editorial content (menu, posts, pages, brands) is cached for 5 minutes. Product data carries
  per-customer (wholesale) prices, so it's fetched with the visitor's cookies and never cached.
- Internal links and navigation use `@/i18n/navigation`, not `next/link` / `next/navigation`.
- Components read stores through selectors (`useCartStore((s) => s.cart)`), never the whole store.
