// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The deployed address is configuration, not code: GitHub Pages serves a project site under
// /<repo>, a custom domain serves from the root. Set SITE_URL and SITE_BASE in the workflow.
const site = process.env.SITE_URL ?? 'https://jonbj.github.io';
const base = process.env.SITE_BASE ?? '/claimstone-website';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
    }),
  ],
});
