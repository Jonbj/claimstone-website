// Run after `astro build`. Fails when a built page links to an internal address that does not
// exist, when a page lacks its other-language twin, or when hreflang/canonical tags are missing.
import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.SITE_BASE ?? '/claimstone-website').replace(/\/+$/, '');

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}
const exists = (p) => access(p).then(() => true, () => false);

const pages = [];
for await (const f of walk(dist)) if (f.endsWith('.html')) pages.push(f);

const problems = [];
const rel = (f) => relative(dist, f);

for (const f of pages) {
  const html = await readFile(f, 'utf8');
  const name = rel(f);

  if (name !== '404.html') {
    if (!/<link rel="canonical" href="[^"]+"/.test(html)) problems.push(`${name}: no canonical`);
    for (const l of ['en', 'it', 'x-default'])
      if (!html.includes(`hreflang="${l}"`)) problems.push(`${name}: no hreflang ${l}`);
    const twin = name.startsWith('it/') ? name.slice(3) : join('it', name);
    if (!(await exists(join(dist, twin)))) problems.push(`${name}: no twin at ${twin}`);
  }

  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)) {
    const url = m[1];
    if (!url.startsWith(base + '/') && url !== base) continue; // external, or not ours
    const local = join(dist, url.slice(base.length));
    const ok = (await exists(local)) && !local.endsWith('/')
      ? true
      : (await exists(join(local, 'index.html'))) || (await exists(local + '.html'));
    if (!ok) problems.push(`${name}: broken internal link ${url}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`ok: ${pages.length} pages, links and language twins verified`);
