const mongoose = require('mongoose');

const blogContentSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    text: { type: String, required: true }
}, { _id: false });

const blogSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    date: { type: String, required: true },
    category: { type: String, default: 'General' },
    author: { type: String, default: 'Admin' },
    content: [blogContentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
