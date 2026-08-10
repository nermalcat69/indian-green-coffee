# Indian Green Coffee

An origin guide to India's green coffee — growing regions, processing methods, varietals, and a
catalogue of current lots. Published by [Gray Cup Enterprises](https://bulkgreencoffee.com), exporters
of Indian green coffee since 2019.

This is a content/reference site, not a storefront. For pricing, samples, and country-specific
shipping, see [bulkgreencoffee.com](https://bulkgreencoffee.com).

Built on the Astro theme originally published as "Maria" by Andrei Alba, repurposed for this content.

## Tech Stack

- Astro 7
- Tailwind CSS 4 via Vite plugin
- MDX
- `@fontsource-variable/manrope`

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Set your production domain with an environment variable before publishing:

- `SITE_URL=https://indiangreencoffee.com`
- or `PUBLIC_SITE_URL=https://indiangreencoffee.com`

This keeps canonical URLs, `robots.txt`, and the sitemap aligned without editing source for each environment.

## Content

- [src/config/site.ts](./src/config/site.ts) — site name, nav, socials, keywords
- [src/data/origins.ts](./src/data/origins.ts) — the four growing regions (Koraput, Halflong, Chirang/Tirap, Chikmagalur/Bababudangiri)
- [src/data/products.ts](./src/data/products.ts) — the coffee lot catalogue, keyed to an origin

Main pages:

- `/` — homepage
- `/origins`, `/origins/[slug]` — origin guides
- `/products`, `/products/[slug]` — coffee catalogue with Product JSON-LD
- `/wholesale` — how sourcing/ordering works (links out to bulkgreencoffee.com)
- `/about`, `/privacy`, `/cookies`, `/terms`, `/404`

## SEO

- canonical URLs, Open Graph, Twitter card tags
- sitemap generation, dynamic `robots.txt`
- JSON-LD: `WebSite`, `Organization`, `BreadcrumbList`, `Product`/`AggregateOffer`, `CollectionPage`/`ItemList`, `FAQPage`, `AboutPage`, `Place`
- Product prices are quoted in INR (FOB India) to match what's actually shown on the page — no currency conversion is fabricated

Main SEO files:

- [src/layouts/Layout.astro](./src/layouts/Layout.astro)
- [astro.config.mjs](./astro.config.mjs)
- [src/pages/robots.txt.ts](./src/pages/robots.txt.ts)

## Cookies and Consent

Client-side cookie consent system with a bottom banner, a preferences modal (essential/analytics/marketing),
saved consent in `localStorage`, and a footer "Cookie Preferences" button. See [src/pages/cookies.astro](./src/pages/cookies.astro).

## Deployment

Deploys to Cloudflare Workers via [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/), configured in [wrangler.jsonc](./wrangler.jsonc).

- `npm run dev` — local dev server (`astro dev`, reads `.env`)
- `npm run preview` — build and run in a local Workers runtime (`wrangler dev`, reads `.dev.vars`)
- `npm run deploy` — build and deploy (`wrangler deploy`)

Runtime secrets (`DATABASE_URL`, `CASHFREE_APP_ID`, `CASHFREE_SECRET_KEY`) must be set as Worker secrets
(`wrangler secret put <NAME>` or the Cloudflare dashboard) for production, and in `.dev.vars` for local
`wrangler dev` — see [.env.example](./.env.example) for the full list.

## License

This project is licensed under the [MIT License](./LICENSE).
