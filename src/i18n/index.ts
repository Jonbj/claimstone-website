import { en, type Dictionary } from './en';
import { it } from './it';

export const locales = ['en', 'it'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = { en: 'English', it: 'Italiano' };
/** BCP 47 tags for og:locale. */
export const ogLocale: Record<Locale, string> = { en: 'en_US', it: 'it_IT' };

const dictionaries: Record<Locale, Dictionary> = { en, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Accepts anything Astro hands us (`Astro.currentLocale` may be undefined) and narrows it. */
export function asLocale(value: string | undefined): Locale {
  return (locales as readonly string[]).includes(value ?? '') ? (value as Locale) : defaultLocale;
}

const trimSlashes = (s: string) => s.replace(/^\/+|\/+$/g, '');

/** Path of a page in a given locale, honouring the configured base. `path` is locale-neutral: 'how-it-works'. */
export function pagePath(locale: Locale, path = ''): string {
  const base = trimSlashes(import.meta.env.BASE_URL);
  const parts = [base, locale === defaultLocale ? '' : locale, trimSlashes(path)].filter(Boolean);
  return '/' + parts.join('/') + (parts.length ? '/' : '');
}

/** Path of a static file from public/. */
export function assetPath(file: string): string {
  const base = trimSlashes(import.meta.env.BASE_URL);
  return '/' + [base, trimSlashes(file)].filter(Boolean).join('/');
}
