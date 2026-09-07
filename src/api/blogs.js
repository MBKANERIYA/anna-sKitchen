const API_BASE = '/api';

// Default fallback data import
import defaultBlogsData from '../data/blogsData';
import { fetchWithTimeout } from './http';

/**
 * Fetch all blogs from the API, falls back to static data if API is unavailable
 */
export const fetchBlogs = async () => {
    try {
        const res = await fetchWithTimeout(`${API_BASE}/blogs`);
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`API error (${res.status}): ${errorText || res.statusText}`);
        }
        const data = await res.json();
        return data.length > 0 ? data : defaultBlogsData;
    } catch (err) {
        console.warn('⚠️ API unavailable, using fallback data:', err.message);
        return defaultBlogsData;
    }
};

/**
 * Fetch a single blog by slug
 */
export const fetchBlogBySlug = async (slug) => {
    try {
        const res = await fetchWithTimeout(`${API_BASE}/blogs/${slug}`);
        if (!res.ok) {
            throw new Error('Blog not found');
        }
        return await res.json();
    } catch (err) {
        console.warn('⚠️ API unavailable, falling back to static data:', err.message);
        return defaultBlogsData.find(blog => blog.slug === slug);
    }
};

/**
 * Add a blog via the API
 */
export const addBlog = async ({ slug, title, date, category, author, content, blogImage }) => {
    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('title', title);
    formData.append('date', date || '');
    formData.append('category', category || '');
    formData.append('author', author || '');
    // Stringify the array of objects before appending
    formData.append('content', JSON.stringify(content));
    formData.append('blogImage', blogImage);

    const res = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        body: formData
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok) {
        let errorMessage = 'Failed to add blog';
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
    return { message: 'Blog added successfully' };
};

/**
 * Delete a blog via the API
 */
export const deleteBlog = async (slug) => {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, {
        method: 'DELETE'
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok) {
        let errorMessage = 'Failed to delete blog';
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
    return { message: 'Blog deleted successfully' };
};
