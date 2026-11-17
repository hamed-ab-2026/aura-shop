# Aura Shop

An online store built around one product, the Aura Vent keratin ventilation device. Persian (RTL), dark glass theme with a light option, built with Next.js 16 as a static export.

The landing page opens with the product's Aparat video filling the first screen, followed by an intro, features, photos and an order section. There is no cart or payments: ordering is by phone or WhatsApp.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

Set `NEXT_PUBLIC_SITE_URL` to the real domain before building so the sitemap, canonical links and structured data use it.

## Deploy (GitHub Pages)

`npm run build:docs` builds the site for `https://hamed-ab-2026.github.io/aura-shop/` and copies it into `docs/`. Commit `docs/`, then in the repository open Settings, Pages and choose branch `main`, folder `/docs`. Rebuild and commit `docs/` after every change.

## Edit

- `data/store.ts`: store name, phone, landing page sections.
- `data/products.ts`: the product (name, intro text, features, Aparat video hash, images). Its images live in `public/images/products/<slug>/`. The landing page shows the first product in the list.
