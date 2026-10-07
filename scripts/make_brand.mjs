// Generates every logo file from brand/mark.mjs.  Run from the repo root:  npm run brand
// Writes: brand/*.svg, brand/exports/*.png (for GitHub and print), public/ icons, og.png, site.webmanifest.
import { Resvg } from '@resvg/resvg-js';
import { mkdir, writeFile } from 'node:fs/promises';
import { COLORS as C, markElements, markMono, svgDoc, faviconSvg } from '../brand/mark.mjs';

const root = new URL('../', import.meta.url).pathname;
const fonts = ['SchibstedGrotesk_600SemiBold.ttf', 'SchibstedGrotesk_400Regular.ttf', 'IBMPlexMono_400Regular.ttf'].map(
  (f) => `${root}brand/fonts/${f}`,
);
const png = (svg, width) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width }, font: { fontFiles: fonts, loadSystemFonts: false, defaultFontFamily: 'Schibsted Grotesk' } })
    .render()
    .asPng();
const out = async (path, data) => { await writeFile(root + path, data); console.log('wrote', path); };
const place = (inner, x, y, size) => `<g transform="translate(${x} ${y}) scale(${size / 64})">${inner}</g>`;
const tile = (size, markSize, { rounded = false } = {}) =>
  svgDoc(
    `<rect width="${size}" height="${size}" ${rounded ? `rx="${size * 0.22}"` : ''} fill="${C.heroBg}"/>` +
      place(markElements({ stone: C.stoneOnDark }), (size - markSize) / 2, (size - markSize) / 2, markSize),
    { size, viewBox: `0 0 ${size} ${size}` },
  );

await mkdir(root + 'brand/exports', { recursive: true });

// 1. Master vector files
await out('brand/logo-mark.svg', svgDoc(markElements({ stone: C.stoneOnLight })));
await out('brand/logo-mark-on-dark.svg', svgDoc(markElements({ stone: C.stoneOnDark })));
await out('brand/logo-mark-mono-black.svg', svgDoc(markMono({ color: '#000000' })));
await out('brand/logo-mark-mono-white.svg', svgDoc(markMono({ color: '#ffffff' })));
await out('public/favicon.svg', faviconSvg());

// 2. Raster icons
await out('public/apple-touch-icon.png', png(tile(180, 118), 180));
await out('public/icon-192.png', png(tile(192, 128), 192));
await out('public/icon-512.png', png(tile(512, 340), 512));
await out('public/icon-maskable-512.png', png(tile(512, 250), 512)); // inside the 80% safe zone
await out('brand/exports/avatar-512.png', png(tile(512, 340, { rounded: false }), 512));

// favicon.ico: three PNG frames, on a dark tile so it reads on both light and dark browser chrome
const frames = [16, 32, 48].map((s) => ({ s, data: png(tile(s, Math.round(s * 0.78), { rounded: true }), s) }));
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(frames.length, 4);
let offset = 6 + 16 * frames.length;
const dir = frames.map(({ s, data }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(data.length, 8); e.writeUInt32LE(offset, 12);
  offset += data.length;
  return e;
});
await out('public/favicon.ico', Buffer.concat([head, ...dir, ...frames.map((f) => f.data)]));

// 3. Social cards: same artwork at 1200x630 (site) and 1280x640 (GitHub)
const grid = (w, h) =>
  Array.from({ length: Math.ceil(w / 56) }, (_, i) => `<path d="M${i * 56} 0V${h}" stroke="#12161b"/>`).join('') +
  Array.from({ length: Math.ceil(h / 56) }, (_, i) => `<path d="M0 ${i * 56}H${w}" stroke="#12161b"/>`).join('');
const card = (W, H) => {
  const dx = (W - 1200) / 2, dy = (H - 630) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><radialGradient id="g" cx="${900 + dx}" cy="${120 + dy}" r="520" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${C.accent}" stop-opacity=".16"/><stop offset="1" stop-color="${C.accent}" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="${C.heroBg}"/>${grid(W, H)}<rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(${dx} ${dy})">
    ${place(markElements({ stone: C.stoneOnDark }), 80, 62, 64)}
    <text x="162" y="109" font-family="Schibsted Grotesk" font-weight="600" font-size="40" fill="${C.white}">Claimstone</text>
    <text x="80" y="262" font-family="Schibsted Grotesk" font-weight="600" font-size="78" fill="${C.white}">A reading machine that</text>
    <text x="80" y="354" font-family="Schibsted Grotesk" font-weight="600" font-size="78" fill="${C.accent}">refuses to overstate</text>
    <text x="80" y="446" font-family="Schibsted Grotesk" font-weight="600" font-size="78" fill="${C.white}">what it read.</text>
    <text x="80" y="566" font-family="IBM Plex Mono" font-size="25" fill="${C.muted}">every claim has a verified quote  ·  open source  ·  Apache-2.0</text>
  </g></svg>`;
};
await out('public/og.png', png(card(1200, 630), 1200));
await out('brand/exports/github-social-preview.png', png(card(1280, 640), 1280));

// 4. Lockups (mark + name) as PNG with a transparent background
const lockup = (stone, textColor) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="360" viewBox="0 0 1400 360">${place(markElements({ stone }), 20, 60, 240)}<text x="300" y="232" font-family="Schibsted Grotesk" font-weight="600" font-size="150" fill="${textColor}">Claimstone</text></svg>`;
await out('brand/exports/lockup-on-dark.png', png(lockup(C.stoneOnDark, C.white), 1400));
await out('brand/exports/lockup-on-light.png', png(lockup(C.stoneOnLight, C.ink), 1400));

// 5. Web app manifest
await out('public/site.webmanifest', JSON.stringify({
  name: 'Claimstone', short_name: 'Claimstone',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
  theme_color: C.heroBg, background_color: C.heroBg, display: 'browser',
}, null, 2) + '\n');
