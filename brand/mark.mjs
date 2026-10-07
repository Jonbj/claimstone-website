// The Claimstone mark, drawn once. Everything else in brand/ and public/ is generated from this file
// by scripts/make_brand.mjs. Coordinates are in a 64 x 64 box.

export const COLORS = {
  accent: '#f5a524',
  stoneOnLight: '#1d2227',
  stoneOnDark: '#3d4853',
  heroBg: '#0a0c0f',
  ink: '#14171a',
  muted: '#98a2ad',
  line: '#232a31',
  white: '#f1f3f5',
};

// A touchstone slab. The stroke has the same colour as the fill so that the joins come out rounded.
const SLAB = 'M11 26 L37 11 L56 22 L53 47 L19 54 L8 41 Z';
const STREAK = 'M16 43 L47 25';
const STREAK_THIN = 'M25 49 L38 41.5';

/** The mark as SVG elements (no <svg> wrapper). `stone` colours the slab, `accent` the streak. */
export function markElements({ stone = COLORS.stoneOnLight, accent = COLORS.accent } = {}) {
  return [
    `<path d="${SLAB}" fill="${stone}" stroke="${stone}" stroke-width="7" stroke-linejoin="round"/>`,
    `<path d="${STREAK}" stroke="${accent}" stroke-width="8" stroke-linecap="round" fill="none"/>`,
    `<path d="${STREAK_THIN}" stroke="${accent}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>`,
  ].join('');
}

/** One-colour version: the streaks are cut out of the slab. `color` is any CSS colour or `currentColor`. */
export function markMono({ color = 'currentColor', id = 'cs-m' } = {}) {
  return [
    `<mask id="${id}"><rect width="64" height="64" fill="#fff"/>`,
    `<path d="${STREAK}" stroke="#000" stroke-width="8" stroke-linecap="round" fill="none"/>`,
    `<path d="${STREAK_THIN}" stroke="#000" stroke-width="3" stroke-linecap="round" fill="none"/></mask>`,
    `<path d="${SLAB}" fill="${color}" stroke="${color}" stroke-width="7" stroke-linejoin="round" mask="url(#${id})"/>`,
  ].join('');
}

export function svgDoc(inner, { size = 64, viewBox = '0 0 64 64', defs = '' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${defs}${inner}</svg>\n`;
}

/** The favicon: it follows the browser's light or dark theme, so it is not a flat copy of the master. */
export function faviconSvg() {
  const css = `.s{fill:${COLORS.stoneOnLight};stroke:${COLORS.stoneOnLight}}@media (prefers-color-scheme:dark){.s{fill:${COLORS.stoneOnDark};stroke:${COLORS.stoneOnDark}}}`;
  return svgDoc(
    [
      `<style>${css}</style>`,
      `<path class="s" d="${SLAB}" stroke-width="7" stroke-linejoin="round"/>`,
      `<path d="${STREAK}" stroke="${COLORS.accent}" stroke-width="8" stroke-linecap="round" fill="none"/>`,
      `<path d="${STREAK_THIN}" stroke="${COLORS.accent}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>`,
    ].join(''),
  );
}
