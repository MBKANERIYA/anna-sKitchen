// Rewrite asset references in src/ and index.html from scripts/asset-map.json.
// Literal string replace (longest key first) so spaces, "&" and "(1)" need no escaping.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const map = JSON.parse(readFileSync(join(ROOT, 'scripts', 'asset-map.json'), 'utf8'));
const pairs = Object.entries(map)
  .filter(([o, n]) => o !== n)
  .sort((a, b) => b[0].length - a[0].length);

function walk(d, o = []) {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    e.isDirectory() ? walk(p, o) : o.push(p);
  }
  return o;
}

const targets = walk(join(ROOT, 'src'))
  .filter(f => /\.(jsx?|css|html)$/.test(f))
  .concat([join(ROOT, 'index.html')]);

let totalHits = 0;
const perFile = [];
for (const f of targets) {
  let text = readFileSync(f, 'utf8');
  const orig = text;
  let hits = 0;
  for (const [oldP, newP] of pairs) {
    if (!text.includes(oldP)) continue;
    hits += text.split(oldP).length - 1;
    text = text.split(oldP).join(newP);
  }
  if (text !== orig) {
    writeFileSync(f, text);
    perFile.push([relative(ROOT, f), hits]);
    totalHits += hits;
  }
}
for (const [f, h] of perFile) console.log(`  ${String(h).padStart(3)} refs  ${f}`);
console.log(`\nrewrote ${totalHits} references across ${perFile.length} files`);

// Anything still pointing at an old path?
const leftovers = [];
for (const f of targets) {
  const text = readFileSync(f, 'utf8');
  for (const [oldP] of pairs) if (text.includes(oldP)) leftovers.push(`${relative(ROOT, f)}: ${oldP}`);
}
console.log(leftovers.length ? `\nLEFTOVER OLD PATHS:\n  ${leftovers.join('\n  ')}` : '\nno stale paths remain');
