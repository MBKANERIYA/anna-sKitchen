import { extname, basename } from 'node:path';

/**
 * URL-safe slug for a single path segment.
 *
 * Hosting-driven rules: "&" becomes "and" rather than disappearing (so
 * "Chaat & Fast Food" and a hypothetical "Chaat Fast Food" cannot collide), and
 * every other run of non-alphanumerics collapses to a single hyphen. Lower-casing
 * matters because Linux serves case-sensitively while the authoring machine
 * (Windows) does not — mixed-case names work locally and 404 in production.
 */
export const slug = (s) =>
    s.toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

/** Slugify every segment of a relative path, preserving the extension. */
export const slugPath = (rel) => {
    const parts = rel.split('/');
    const file = parts.pop();
    // Strip using the extension's original case — basename() matches the suffix
    // case-sensitively, so lower-casing first would leave ".JPEG" in the stem and
    // produce "photo-jpeg.jpeg". Only the output extension is lower-cased.
    const ext = extname(file);
    return [...parts.map(slug).filter(Boolean), slug(basename(file, ext)) + ext.toLowerCase()].join('/');
};
