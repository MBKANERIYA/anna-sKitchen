const API_BASE = '/api';

// Default fallback data import
import defaultProductsData from '../data/productsData';
import { fetchWithTimeout } from './http';

/**
 * Fetch all products from the API, falls back to static data if API is unavailable
 */
export const fetchProducts = async () => {
    try {
        const res = await fetchWithTimeout(`${API_BASE}/products`);
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || res.statusText}`);
        }
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
    const formData = new FormData();
    formData.append('categorySlug', categorySlug);
    formData.append('categoryTitle', categoryTitle || '');
    formData.append('categoryDescription', categoryDescription || '');
    formData.append('productName', productName);
    formData.append('productImage', productImage);

    const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        body: formData
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok) {
        let errorMessage = 'Failed to add product';
        if (contentType && contentType.includes('application/json')) {
            const err = await res.json();
            errorMessage = err.details ? `${err.error}: ${err.details}` : (err.error || errorMessage);
        } else {
            errorMessage = await res.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }


    if (contentType && contentType.includes('application/json')) {
        return await res.json();
    }
    return { message: 'Product added successfully' };
};


/**
 * Delete a product from a category via the API
 */
export const deleteProduct = async (categorySlug, productIndex) => {
    const res = await fetch(`${API_BASE}/products/${categorySlug}/${productIndex}`, {
        method: 'DELETE'
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok) {
        let errorMessage = 'Failed to delete product';
        if (contentType && contentType.includes('application/json')) {
            const err = await res.json();
            errorMessage = err.details ? `${err.error}: ${err.details}` : (err.error || errorMessage);
        } else {
            errorMessage = await res.text() || errorMessage;
        }
        throw new Error(errorMessage);
    }


    if (contentType && contentType.includes('application/json')) {
        return await res.json();
    }
    return { message: 'Product deleted successfully' };
};

