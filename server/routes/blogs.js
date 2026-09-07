const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const Blog = require('../models/Blog');
const { requireAuth } = require('../auth');

// Configure Cloudinary (it uses the same credentials initialized in products route, but we'll re-ensure config)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/blogs - Fetch all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
        res.json(blogs);
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ error: 'Failed to fetch blogs', details: err.message });
    }
});

// GET /api/blogs/:slug - Fetch a single blog
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).json({ error: 'Failed to fetch blog', details: err.message });
    }
});

// POST /api/blogs - Add a new blog with image upload
router.post('/', requireAuth, upload.single('blogImage'), async (req, res) => {
    try {
        const { slug, title, date, category, author, content } = req.body;
        let blogImage = req.body.blogImage;

        if (!title || !slug || !content) {
            return res.status(400).json({ error: 'Title, slug, and content are required' });
        }

        // Parse content since it will be sent as a JSON string in FormData
        let parsedContent = [];
        try {
            parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
        } catch (e) {
            return res.status(400).json({ error: 'Invalid content format. Must be JSON array.' });
        }

        // Upload image to Cloudinary if file provided
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                folder: 'annas-kitchen/blogs'
            });

            blogImage = uploadResponse.secure_url;
        }

        if (!blogImage) {
            return res.status(400).json({ error: 'Blog image is required' });
        }

        const newBlog = new Blog({
            slug,
            title,
            image: blogImage,
            date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            category: category || 'General',
            author: author || 'Admin',
            content: parsedContent
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (err) {
        console.error('Error adding blog:', err);
        // Handle unique slug error
        if (err.code === 11000) {
            return res.status(400).json({ error: 'A blog with this title/slug already exists.' });
        }
        res.status(500).json({ error: 'Failed to add blog', details: err.message });
    }
});

// DELETE /api/blogs/:slug - Delete a blog post
router.delete('/:slug', requireAuth, async (req, res) => {
    try {
        const deletedBlog = await Blog.findOneAndDelete({ slug: req.params.slug });
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json({ message: `Deleted blog "${deletedBlog.title}" successfully` });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ error: 'Failed to delete blog', details: err.message });
    }
});

module.exports = router;
