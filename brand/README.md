# Brand

The Claimstone mark is a touchstone: the stone on which gold was rubbed to see whether it was pure. The amber
streak is the mark left by the test, which is what the engine does to a claim.

**One source.** The geometry lives in `mark.mjs`. Everything else is generated from it:

```bash
npm run brand      # rewrites brand/*.svg, brand/exports/*.png, and the icons, og.png and manifest in public/
```

`src/components/Logo.astro` is the one hand-copied place (it needs to follow the page theme); if the geometry
in `mark.mjs` changes, change it there too.

## Files

| File | Use |
|---|---|
| `logo-mark.svg` | the mark on a light background |
| `logo-mark-on-dark.svg` | the mark on a dark background |
| `logo-mark-mono-black.svg`, `-white.svg` | one colour: print, engraving, stamps |
| `exports/lockup-on-dark.png`, `-on-light.png` | mark and name, transparent background |
| `exports/avatar-512.png` | GitHub profile or organisation picture |
| `exports/github-social-preview.png` | upload by hand in the repository's Settings → Social preview |
| `../public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-*.png`, `og.png` | the website |

## Rules

- Colours: amber `#f5a524` for the streak, slate `#1d2227` (on light) or `#3d4853` (on dark) for the stone.
- Keep clear space around the mark equal to the width of the thick streak.
- Don't recolour the streak, add a gradient, or put the mark on a busy photograph.
- Smallest size: 16 pixels, where only the thick streak stays visible. That is intended.
- The name is set in Schibsted Grotesk SemiBold. The fonts in `fonts/` are under the SIL Open Font License.

## Not done yet

- A text-to-outline vector lockup (`lockup.svg`). The PNG lockups exist; an outlined SVG needs a vector editor.
- A trademark search for the name. Do this before investing further in the mark.
