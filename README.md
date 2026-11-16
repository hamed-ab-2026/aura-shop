# Aura Shop

An online store for ventilation, heating, cooling and special devices. Persian (RTL), dark glass theme with a light option, built with Next.js 16 as a static export.

The store has no cart or payments: each product page shows photos, video and a call / WhatsApp button for ordering.

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

- `data/store.ts`: store name, phone, categories.
- `data/products.ts`: products. Add an object and put its images in `public/images/products/<slug>/`.
