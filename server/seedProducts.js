require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Product');
const productsData = require('../src/data/productsData').default;

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');

        console.log('Wiping old categories...');
        await Category.deleteMany();

        console.log('Seeding new categories from source file...');
        const categoriesArray = Object.values(productsData);

        for (const cat of categoriesArray) {
            await Category.create(cat);
            console.log(`Seeded category: ${cat.title} with ${cat.products.length} products`);
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding DB:', error);
    } finally {
        process.exit();
    }
};

seedDB();
