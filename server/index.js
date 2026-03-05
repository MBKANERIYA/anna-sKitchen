require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/products');
const blogRoutes = require('./routes/blogs');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        version: '1.0.2-debug',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Exception:', err);
    res.status(500).json({
        error: 'Global Server Error',
        details: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
        }
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    });

module.exports = app;

