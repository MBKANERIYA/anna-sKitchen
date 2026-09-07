import { describe, it, expect } from 'vitest';
import { slug, slugPath } from './slugify.mjs';

describe('slug', () => {
    it('lowercases so Linux hosting matches the Windows-authored name', () => {
        expect(slug('IRCTC')).toBe('irctc');
    });

    it('expands "&" to "and" instead of dropping it', () => {
        // Dropping it would let "Chaat & Fast Food" and "Chaat Fast Food"
        // collapse onto the same URL.
        expect(slug('Chaat & Fast Food Counter')).toBe('chaat-and-fast-food-counter');
        expect(slug('Chaat Fast Food Counter')).toBe('chaat-fast-food-counter');
    });

    it('collapses spaces, dots and parentheses to single hyphens', () => {
        expect(slug('WhatsApp Image 2026-02-26 at 17.33.43 (1)')).toBe(
            'whatsapp-image-2026-02-26-at-17-33-43-1'
        );
    });

    it('trims leading and trailing separators', () => {
        expect(slug('  Bread Oven  ')).toBe('bread-oven');
        expect(slug('- Chaat Counter - 2 -')).toBe('chaat-counter-2');
    });
});

describe('slugPath', () => {
    it('slugifies directory segments as well as the filename', () => {
        expect(slugPath('images/Chaat & Fast Food Counter/Pani Puri Counter.png'))
            .toBe('images/chaat-and-fast-food-counter/pani-puri-counter.png');
    });

    it('preserves and lowercases the extension', () => {
        expect(slugPath('clients/Photo.JPEG')).toBe('clients/photo.jpeg');
    });

    it('leaves an already-clean path unchanged', () => {
        expect(slugPath('images/a1.webp')).toBe('images/a1.webp');
    });

    it('keeps distinct source names distinct', () => {
        // These two really exist in public/clients and must not collide.
        expect(slugPath('clients/unnamed.jpg')).not.toBe(slugPath('clients/unnamed (2).jpg'));
    });
});
