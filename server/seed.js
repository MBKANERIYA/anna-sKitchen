require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Product');

// Default product data to seed
const defaultProductsData = {
    'bakery-products': {
        title: 'BAKERY PRODUCTS',
        slug: 'bakery-products',
        description: "Exceptional Baking Starts With The Right Tools. At Anna's Kitchen Equipments, We Provide High-Quality Bakery Equipment For Professional And Home Bakers, Ensuring Consistent, Delicious Results.",
        products: [
            { name: 'Bengali Sweet Counter', image: '/images/b-0.png' },
            { name: 'Cold Display Counter', image: '/images/B-1.png' },
            { name: 'Square Display Counter', image: '/images/B-2.png' },
            { name: 'Shape Bakery Counter', image: '/images/B-3.png' },
            { name: 'Bread Oven', image: '/images/B-4.png' },
            { name: 'Bread Slice Cutter', image: '/images/B-5.png' },
            { name: 'Dough Mixer Machine', image: '/images/B-6.png' },
        ],
    },
    refrigeration: {
        title: 'REFRIGERATION',
        slug: 'refrigeration',
        description: 'Keep Your Ingredients Fresh And Your Kitchen Running Smoothly With Our Premium Refrigeration Equipment. Designed For Heavy-Duty Commercial Use, Our Range Delivers Consistently Low Temperatures And Maximum Efficiency.',
        products: [
            { name: 'Pickup Counter With Freezer', image: '/images/r-1.png' },
            { name: 'Double Top Door Chest Deep Freezer', image: '/images/r-2.png' },
            { name: 'Pizza Makeline', image: '/images/r-3.png' },
            { name: 'Salad Counter', image: '/images/r-4.png' },
            { name: 'Ulfee machine', image: '/images/r-5.png' },
            { name: 'Ice Cube Machine', image: '/images/r-6.png' },
            { name: 'Softy Machine', image: '/images/r-7.png' },
            { name: 'Cold Bain Marine', image: '/images/r-8.png' },
            { name: 'Water Cooler', image: '/images/r-9.png' },
            { name: 'Upright Beverage Cooler', image: '/images/r-10.png' },
            { name: 'Two Door Refrigerator', image: '/images/r-11.png' },
            { name: 'Four Door Refrigerator', image: '/images/r-12.png' },
        ],
    },
    'heating-range': {
        title: 'HEATING RANGE',
        slug: 'heating-range',
        description: 'Power Your Kitchen With Our Robust Heating Range Equipment. From Commercial Burners To Tandoors, Our Heating Solutions Are Built For High-Performance Cooking In Demanding Kitchen Environments.',
        products: [
            { name: 'Single Burner Gas Range', image: '/images/h1.png' },
            { name: 'Pizza Oven', image: '/images/h2.png' },
            { name: 'Two Burner Indian', image: '/images/h3.png' },
            { name: 'Three Burner Indian Gas', image: '/images/h4.png' },
            { name: 'Three Burner Chiness Gas', image: '/images/h5.png' },
            { name: 'Ontinenntal Gas Range', image: '/images/h6.png' },
            { name: 'Roti Puffer', image: '/images/h7.png' },
            { name: 'Dosa Plate', image: '/images/h8.png' },
            { name: 'Kadai Frayer', image: '/images/h9.png' },
            { name: 'Drum Tandoor', image: '/images/h10.png' },
            { name: 'Tank Tandoor', image: '/images/h11.png' },
            { name: 'Roomali Bhatti', image: '/images/h12.png' },
        ],
    },
    'chat-and-fast-food-counter': {
        title: 'CHAT & FAST FOOD COUNTER',
        slug: 'chat-and-fast-food-counter',
        description: 'Serve Your Customers Efficiently With Our Sleek And Durable Chat & Fast Food Counters. Designed For Quick Service, These Counters Offer Ample Space, Easy Access, And Hygienic Surfaces, Perfect For Fast-Paced Environments.',
        products: [
            { name: 'Pav Bhaji Counter', image: '/images/c1.png' },
            { name: 'Cold Juice Counter', image: '/images/c2.png' },
            { name: 'Chat Counter', image: '/images/c3.png' },
            { name: 'Pav Bhaji Counter', image: '/images/c4.png' },
            { name: 'Hot Ben Mary', image: '/images/c5.png' },
            { name: 'Chat Counter', image: '/images/c6.png' },
            { name: 'Pani Puri Counter', image: '/images/c7.png' },
            { name: 'Chat & Pani Puri Counter', image: '/images/c8.png' },
            { name: 'Cold Food Counter', image: '/images/c9.png' },
            { name: 'Pani Puri Counter', image: '/images/c10.png' },
            { name: 'Pan Counter', image: '/images/c11.png' },
            { name: 'Gas Range Counter', image: '/images/c12.png' },
        ],
    },
    'work-and-profession-table': {
        title: 'WORK & PROFESSION TABLE',
        slug: 'work-and-profession-table',
        description: 'Optimize Your Kitchen Workflow With Our Sturdy And Spacious Work & Profession Tables. Built For Durability And Ease Of Use, They Provide The Perfect Surface For Food Prep And Professional Tasks In Busy Kitchens.',
        products: [
            { name: 'Work With Storage Table', image: '/images/w1.png' },
            { name: 'Work Table With Drawer', image: '/images/w2.png' },
            { name: 'Work Table', image: '/images/w3.png' },
            { name: 'Three Sinks Table', image: '/images/w4.png' },
            { name: 'Three Step Work Table', image: '/images/w5.png' },
            { name: 'Service Table', image: '/images/w6.png' },
            { name: 'Pick Up Counter', image: '/images/w7.png' },
            { name: 'Sink With Table', image: '/images/w8.png' },
            { name: 'Drawer With Storage Table', image: '/images/w9.png' },
            { name: 'Restaurant Table', image: '/images/w10.png' },
            { name: 'Steel Dining Table', image: '/images/w11.png' },
            { name: 'Single Sink', image: '/images/w12.png' },
        ],
    },
    'rack-trolley': {
        title: 'RACK TROLLEY',
        slug: 'rack-trolley',
        description: 'Easily Transport And Organize Your Baked Goods With Our Durable And Versatile Rack Trolleys. Designed For Efficiency, These Trolleys Offer Smooth Mobility And Ample Storage, Perfect For Busy Kitchen Environments.',
        products: [
            { name: 'Tray Slide Trolley', image: '/images/t1.png' },
            { name: 'Servyce Trolly', image: '/images/t2.png' },
            { name: 'Storage Rack', image: '/images/t3.png' },
            { name: 'Canteen Table', image: '/images/t4.png' },
            { name: 'Dish Rack', image: '/images/t5.png' },
            { name: 'Pipe Pot Rack', image: '/images/t6.png' },
            { name: 'Storage Rack', image: '/images/t7.png' },
            { name: 'Restaurant Dinning Table', image: '/images/t8.png' },
            { name: 'Masala Trolly', image: '/images/t9.png' },
            { name: 'Canteen Table', image: '/images/t10.png' },
            { name: 'Restaurant Dinning Table', image: '/images/t11.png' },
            { name: 'Canteen Table', image: '/images/t12.png' },
        ],
    },
    processing: {
        title: 'PROCESSING',
        slug: 'processing',
        description: 'Enhance Your Kitchen Efficiency With Our Advanced Processing Equipment. Designed For Precision And Speed, Our Range Of Tools Ensures Smooth And Consistent Preparation, Ideal For Professional Kitchens And Large-Scale Production.',
        products: [
            { name: 'Idli Steamer', image: '/images/p1.png' },
            { name: 'Soda Dispenser', image: '/images/p2.png' },
            { name: 'Plate Warmer', image: '/images/p3.png' },
            { name: 'Ice Blender', image: '/images/p4.png' },
            { name: 'Dishwasher', image: '/images/p5.png' },
            { name: 'Combi Oven', image: '/images/p6.png' },
            { name: 'Pizza Oven', image: '/images/p7.png' },
            { name: 'Meat Mincer', image: '/images/p8.png' },
            { name: 'Insect Killer', image: '/images/p9.png' },
            { name: 'Juice Dispenser', image: '/images/p10.png' },
            { name: 'Plate Induction Stove', image: '/images/p11.png' },
            { name: 'Wet Grinder', image: '/images/p12.png' },
            { name: 'Drain Trough Grating', image: '/images/p13.png' },
            { name: 'Coffee Machine', image: '/images/p14.png' },
            { name: 'Grilled Machine', image: '/images/p15.png' },
            { name: 'Pulveriser', image: '/images/p16.png' },
            { name: 'Exhaust System', image: '/images/p17.png' },
            { name: 'Duct Damper Grill', image: '/images/p18.png' },
            { name: 'Heavy Duty Exhaust Fan', image: '/images/p19.png' },
            { name: 'Sink With Table', image: '/images/p20.png' },
            { name: 'Fastfood Counter', image: '/images/p21.png' },
        ],
    },
    'hotel-and-restaurant': {
        title: 'HOTEL & RESTAURANT',
        slug: 'hotel-and-restaurant',
        description: 'Complete Kitchen Solutions For Hotels And Restaurants. From Heavy-Duty Cooking Equipment To Elegant Serving Stations, We Provide Everything You Need To Run A Professional Hospitality Kitchen.',
        products: [],
    },
    'cafe-and-bakery-kitchen': {
        title: 'CAFE & BAKERY KITCHEN',
        slug: 'cafe-and-bakery-kitchen',
        description: 'Specialized Equipment For Cafes And Bakery Kitchens. Our Range Includes Ovens, Display Counters, Coffee Stations, And Everything Needed To Create A Perfect Cafe Experience.',
        products: [],
    },
    'bar-and-food-court': {
        title: 'BAR & FOOD COURT',
        slug: 'bar-and-food-court',
        description: 'Premium Equipment For Bars And Food Courts. From Beverage Dispensers To Fast-Service Counters, We Offer Durable And Stylish Solutions For High-Traffic Environments.',
        products: [],
    },
    'canteen-and-cloud-kitchen': {
        title: 'CANTEEN & CLOUD KITCHEN',
        slug: 'canteen-and-cloud-kitchen',
        description: 'Efficient And Scalable Equipment For Canteens And Cloud Kitchens. Designed For Bulk Cooking And Quick Service, Our Solutions Help You Serve More With Less Effort.',
        products: [],
    },
    'hospital-and-pantry-kitchen': {
        title: 'HOSPITAL & PANTRY KITCHEN',
        slug: 'hospital-and-pantry-kitchen',
        description: 'Hygienic And Reliable Kitchen Equipment For Hospitals And Pantry Kitchens. Our Products Meet The Highest Standards Of Cleanliness And Safety Required In Healthcare Environments.',
        products: [],
    },
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing data
        await Category.deleteMany({});
        console.log('🗑️  Cleared existing categories');

        // Insert all categories
        const categories = Object.values(defaultProductsData);
        await Category.insertMany(categories);
        console.log(`✅ Seeded ${categories.length} categories with products`);

        // Print summary
        for (const cat of categories) {
            console.log(`   → ${cat.title}: ${cat.products.length} products`);
        }

        await mongoose.disconnect();
        console.log('\n✅ Seeding complete! Database is ready.');
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    }
}

seed();
