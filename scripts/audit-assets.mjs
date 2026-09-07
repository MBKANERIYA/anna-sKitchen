// One-off audit: does every static asset referenced from src/ and index.html exist in public/?
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const srcFiles = walk(join(ROOT, 'src')).concat([join(ROOT, 'index.html')]);
const ASSET_RE = /["'`(](\/?[^"'`()]*?\.(?:png|jpe?g|webp|avif|svg|pdf))["'`)]/gi;

const refs = new Map(); // assetPath -> Set(sourceFile)
for (const f of srcFiles) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(ASSET_RE)) {
    const raw = m[1];
    if (/^https?:/i.test(raw)) continue;
    refs.set(raw, (refs.get(raw) || new Set()).add(relative(ROOT, f)));
  }
}

const missing = [];
for (const [ref, sources] of refs) {
  const rel = ref.replace(/^\//, '');
  if (!existsSync(join(PUBLIC, rel))) missing.push([ref, [...sources]]);
}

const publicFiles = walk(PUBLIC).map(p => '/' + relative(PUBLIC, p).split(sep).join('/'));
const referenced = new Set([...refs.keys()].map(r => r.startsWith('/') ? r : '/' + r));
const orphans = publicFiles.filter(p => !referenced.has(p));

console.log(`Referenced assets: ${refs.size}`);
console.log(`Files in public/:  ${publicFiles.length}`);
console.log(`\n--- MISSING (referenced but not on disk): ${missing.length} ---`);
for (const [ref, srcs] of missing) console.log(`  ${ref}\n      <- ${srcs.join(', ')}`);
console.log(`\n--- ORPHANS (on disk, never referenced): ${orphans.length} ---`);
let orphanBytes = 0;
for (const o of orphans) {
  const b = statSync(join(PUBLIC, o.slice(1))).size;
  orphanBytes += b;
  console.log(`  ${(b/1024).toFixed(0).padStart(6)} KB  ${o}`);
}
console.log(`  Orphan total: ${(orphanBytes/1024/1024).toFixed(1)} MB`);
