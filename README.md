# Claimstone website

The public website. Static, built with [Astro](https://astro.build), two languages (English at `/`, Italian at `/it/`).
It lives in its own repository, apart from the engine ([Jonbj/claimstone](https://github.com/Jonbj/claimstone)). The engine's documentation is linked to, never copied; the few facts the site states (project status, verdict states) are in `src/i18n/` and need updating by hand when the engine changes.

```bash
npm install
npm run dev        # http://localhost:4321/
npm run verify     # type check, build, then check links and language twins
```

## Where things are

| Path | What it holds |
|---|---|
| `src/i18n/en.ts`, `it.ts` | **All the text.** `it.ts` is typed against `en.ts`, so a missing or extra key fails `npm run check`. |
| `src/config.ts` | Repository, licence and documentation links, used on several pages. |
| `src/views/` | One file per page body, shared by both languages. |
| `src/pages/`, `src/pages/it/` | One-line routes that render a view with a locale. |
| `src/components/` | Header, footer, language switch, and the home sections. |
| `src/layouts/Base.astro` | `<head>`: title, canonical, hreflang, Open Graph, JSON-LD. |
| `src/styles/global.css` | Design tokens and shared styles. Amber is the one accent. |
| `public/` | Favicon, `og.png` (made by `scripts/make_og.py`), `robots.txt`. |

## Adding a page

1. Add its text to `en.ts` and `it.ts`.
2. Add `src/views/Name.astro` using `Base` and `PageHero`.
3. Add `src/pages/name.astro` and `src/pages/it/name.astro` (one line each).
4. Add it to the `nav` list in `Header.astro` if it belongs in the menu.

## Adding a language

Add the locale to `src/i18n/index.ts` and to `i18n` in `astro.config.mjs`, create `src/i18n/<code>.ts`
typed as `Dictionary`, and add `src/pages/<code>/` routes. `npm run verify` reports any page missing its twin.

## Deploying

`.github/workflows/site.yml` builds on every push and pull request and, on `main`, publishes to GitHub Pages.
The address is configuration: `SITE_URL` and `SITE_BASE` in that workflow (and the `Sitemap:` line in
`public/robots.txt`). The site is served from https://claimstone.org (custom domain, set in the repository's Pages settings), so `SITE_BASE` is empty.
