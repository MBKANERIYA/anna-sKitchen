const mongoose = require('mongoose');

const productItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
}, { _id: false });

const categorySchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    products: [productItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
