// Fixes the broken product images on annakitchenequipment.com.
//
// The image files were renamed (lowercase, no spaces, .webp instead of .png),
// but the paths stored in MongoDB still point at the old names, so every image
// 404s. This rewrites the stored paths to match the files that actually exist.
//
// HOW TO RUN
//   1. Leave APPLY as false and run it once. It only PRINTS what it would do.
//   2. Check the output looks right (expect 61 changes).
//   3. Set APPLY to true, run it again. Now it saves.
//
//   mongosh "<your-connection-string>" --file fix-image-paths.mongosh.js
//
// It prints a full before/after list you can keep, and it never touches images
// already hosted on Cloudinary (anything starting with http).

const APPLY = false;   // <-- change to true for the real run

// --- the same renaming rule that was applied to the files ---------------
const slug = (s) =>
    s.toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const newPath = (p) => {
    const parts = p.replace(/^\//, '').split('/');
    const file = parts.pop();
    const dot = file.lastIndexOf('.');
    return '/' + [...parts.map(slug), slug(file.slice(0, dot)) + '.webp'].join('/');
};

const needsFix = (img) =>
    typeof img === 'string' && img !== '' && !/^https?:\/\//i.test(img) && newPath(img) !== img;

// --- products -----------------------------------------------------------
let changed = 0;
let untouched = 0;

print(APPLY ? '=== APPLYING CHANGES ===' : '=== DRY RUN — nothing will be saved ===');
print('');

db.categories.find({}).forEach((cat) => {
    let dirty = false;
    const products = (cat.products || []).map((p) => {
        if (!needsFix(p.image)) { untouched++; return p; }
        const to = newPath(p.image);
        print('  ' + p.image);
        print('    -> ' + to);
        changed++;
        dirty = true;
        return Object.assign({}, p, { image: to });
    });

    if (dirty && APPLY) {
        db.categories.updateOne({ _id: cat._id }, { $set: { products: products } });
    }
});

// --- blogs --------------------------------------------------------------
db.blogs.find({}).forEach((blog) => {
    if (!needsFix(blog.image)) { untouched++; return; }
    const to = newPath(blog.image);
    print('  [blog] ' + blog.image);
    print('    -> ' + to);
    changed++;
    if (APPLY) db.blogs.updateOne({ _id: blog._id }, { $set: { image: to } });
});

print('');
print((APPLY ? '  updated: ' : '  would update: ') + changed);
print('  left alone (Cloudinary or already correct): ' + untouched);
if (!APPLY) print('\n  Nothing was saved. Set APPLY = true at the top and run again.');
