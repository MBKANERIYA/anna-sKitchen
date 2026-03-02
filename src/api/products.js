const API_BASE = '/api';

// Default fallback data import
import defaultProductsData from '../data/productsData';

/**
 * Fetch all products from the API, falls back to static data if API is unavailable
 */
export const fetchProducts = async () => {
    try {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error('API error');
        return await res.json();
    } catch (err) {
        console.warn('⚠️ API unavailable, using fallback data:', err.message);
        return defaultProductsData;
    }
};

/**
 * Add a product to a category via the API
 */
export const addProduct = async ({ categorySlug, categoryTitle, categoryDescription, productName, productImage }) => {
    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categorySlug, categoryTitle, categoryDescription, productName, productImage })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add product');
    }
    return await res.json();
};

/**
 * Delete a product from a category via the API
 */
export const deleteProduct = async (categorySlug, productIndex) => {
    const res = await fetch(`${API_BASE}/products/${categorySlug}/${productIndex}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete product');
    }
    return await res.json();
};
