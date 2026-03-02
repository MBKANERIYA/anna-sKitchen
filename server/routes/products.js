const express = require('express');
const router = express.Router();
const Category = require('../models/Product');

// GET /api/products - Fetch all categories with their products
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: 1 });

        // Transform to the same format the frontend expects: { slug: { title, slug, description, products } }
        const data = {};
        categories.forEach(cat => {
            data[cat.slug] = {
                title: cat.title,
                slug: cat.slug,
                description: cat.description,
                products: cat.products.map(p => ({ name: p.name, image: p.image }))
            };
        });

        res.json(data);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({
            error: 'Failed to fetch products',
            details: err.message
        });
    }
});


// POST /api/products - Add a product to a category (or create new category)
router.post('/', async (req, res) => {
    try {
        const { categorySlug, categoryTitle, categoryDescription, productName, productImage } = req.body;

        if (!productName || !productImage) {
            return res.status(400).json({ error: 'Product name and image are required' });
        }

        let category = await Category.findOne({ slug: categorySlug });

        if (!category) {
            // Create new category
            category = new Category({
                slug: categorySlug,
                title: categoryTitle || categorySlug,
                description: categoryDescription || 'Newly added category.',
                products: []
            });
        }

        category.products.push({ name: productName, image: productImage });
        await category.save();

        res.status(201).json({
            message: `Successfully added "${productName}" to ${category.title}`,
            category: {
                title: category.title,
                slug: category.slug,
                description: category.description,
                products: category.products
            }
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({
            error: 'Failed to add product',
            details: err.message
        });
    }
});


// DELETE /api/products/:categorySlug/:productIndex - Delete a product from a category
router.delete('/:categorySlug/:productIndex', async (req, res) => {
    try {
        const { categorySlug, productIndex } = req.params;
        const index = parseInt(productIndex, 10);

        const category = await Category.findOne({ slug: categorySlug });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (index < 0 || index >= category.products.length) {
            return res.status(400).json({ error: 'Invalid product index' });
        }

        const removedProduct = category.products[index];
        category.products.splice(index, 1);
        await category.save();

        res.json({ message: `Deleted "${removedProduct.name}" from ${category.title}` });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({
            error: 'Failed to delete product',
            details: err.message
        });
    }
});


module.exports = router;
