# Lynn Luxe Event Studio

Marketing site for Lynn Luxe Event Studio — Next.js 16 (App Router, Cache Components), Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
npm run lint
```

## Structure

| Path | Purpose |
| --- | --- |
| `lib/site.ts` | Brand, contact details and navigation — the single place to change a phone number or handle |
| `content/` | Typed content: `services.ts`, `events.ts` |
| `lib/content.ts` | Data access layer (`use cache` + tags). Swap these bodies for a CMS/DB without touching pages |
| `components/ui` | Primitives: `Media` (optimized image with placeholder fallback), `Reveal`, `ButtonLink`, headings |
| `components/sections` | Page sections (hero, services, work, process, CTA, inquiry form) |
| `components/layout` | Header, footer, logo |
| `app/` | Routes, plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` |

## Photos

Put images in `public/images/` at the paths referenced in `content/events.ts`
(e.g. `public/images/events/velvet-grandeur/cover.jpg`), plus optional
`public/images/about.jpg`. Missing files show a branded placeholder instead of a broken image.

## Environment

- `NEXT_PUBLIC_SITE_URL` — canonical URL used for metadata, sitemap and JSON-LD
  (falls back to `VERCEL_PROJECT_PRODUCTION_URL` on Vercel).

## Publishing content changes without a redeploy

Content reads are cached with tags `events` / `services`. Once content lives in a CMS,
call `revalidateTag("events")` from a webhook route to publish updates instantly.
