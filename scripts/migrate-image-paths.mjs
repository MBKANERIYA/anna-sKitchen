/**
 * Rewrite stored image paths in MongoDB after the 2026-09-07 asset optimisation.
 *
 * The optimisation renamed every file in public/ (WebP + slugified names) and
 * updated the source, but product and blog documents hold their own copy of
 * those paths. Until they are rewritten, every database-backed image 404s.
 *
 *   node scripts/migrate-image-paths.mjs           # dry run, changes nothing
 *   node scripts/migrate-image-paths.mjs --apply   # writes, after a backup
 *
 * Cloudinary URLs (anything starting with http) are left alone — those are
 * admin uploads and were never part of the rename.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const APPLY = process.argv.includes('--apply');

const assetMap = JSON.parse(readFileSync(join(HERE, 'asset-map.json'), 'utf8'));

// Read from .env (gitignored) so the connection string never has to be typed
// into a shell and left in history.
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set.');
    console.error('Put it in a local .env file (already gitignored) and re-run.');
    process.exit(1);
}

/** null = leave untouched. */
const remap = (image) => {
    if (typeof image !== 'string' || image === '') return null;
    if (/^https?:\/\//i.test(image)) return null;      // Cloudinary upload
    const key = image.startsWith('/') ? image : `/${image}`;
    const mapped = assetMap[key];
    return mapped && mapped !== key ? mapped : null;
};

await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
console.log(`connected — ${APPLY ? 'APPLYING' : 'DRY RUN'}\n`);

// Work through the raw collections so this does not depend on the app's schemas.
const db = mongoose.connection.db;
const categories = await db.collection('categories').find({}).toArray();
const blogs = await db.collection('blogs').find({}).toArray();

if (APPLY) {
    const dir = join(ROOT, 'backups');
    mkdirSync(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const file = join(dir, `mongo-before-image-migration-${stamp}.json`);
    writeFileSync(file, JSON.stringify({ categories, blogs }, null, 2));
    console.log(`backup written: ${file}\n`);
}

let changed = 0, skipped = 0, unmapped = [];

for (const cat of categories) {
    const updates = [];
    (cat.products ?? []).forEach((p, i) => {
        const next = remap(p.image);
        if (next) updates.push([i, p.image, next]);
        else if (typeof p.image === 'string' && !/^https?:\/\//i.test(p.image)) {
            if (!assetMap[p.image.startsWith('/') ? p.image : `/${p.image}`]) unmapped.push(`${cat.slug}: ${p.image}`);
            else skipped++;
        } else skipped++;
    });

    if (!updates.length) continue;
    console.log(`  ${cat.slug} — ${updates.length} image(s)`);
    for (const [, from, to] of updates.slice(0, 2)) console.log(`      ${from}\n   -> ${to}`);
    if (updates.length > 2) console.log(`      … and ${updates.length - 2} more`);

    if (APPLY) {
        const products = cat.products.map((p, i) => {
            const hit = updates.find(([idx]) => idx === i);
            return hit ? { ...p, image: hit[2] } : p;
        });
        await db.collection('categories').updateOne({ _id: cat._id }, { $set: { products } });
    }
    changed += updates.length;
}

for (const blog of blogs) {
    const next = remap(blog.image);
    if (!next) { skipped++; continue; }
    console.log(`  blog "${blog.slug}"\n      ${blog.image}\n   -> ${next}`);
    if (APPLY) await db.collection('blogs').updateOne({ _id: blog._id }, { $set: { image: next } });
    changed += 1;
}

console.log(`\n  ${APPLY ? 'updated' : 'would update'}: ${changed}`);
console.log(`  left alone (Cloudinary / already correct): ${skipped}`);
if (unmapped.length) {
    console.log(`\n  NOT IN THE ASSET MAP — these will stay broken and need a look:`);
    for (const u of [...new Set(unmapped)]) console.log(`      ${u}`);
}
if (!APPLY) console.log('\n  nothing was written. Re-run with --apply to commit.');

await mongoose.disconnect();
