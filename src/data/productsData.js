// All product categories and their items for Anna Kitchen Equipments

const defaultProductsData = {
    'bakery-products': {
        title: 'BAKERY PRODUCTS',
        slug: 'bakery-products',
        description:
            "Exceptional Baking Starts With The Right Tools. At Anna's Kitchen Equipments, We Provide High-Quality Bakery Equipment For Professional And Home Bakers, Ensuring Consistent, Delicious Results.",
        products: [
            { name: 'Bengali Sweet Counter', image: '/images/Bakery Product/Bengali Sweet Counter.png' },
            { name: 'Bread Oven', image: '/images/Bakery Product/Bread Oven.png' },
            { name: 'Bread Slice Cutter', image: '/images/Bakery Product/Bread Slice Cutter.png' },
            { name: 'Cold Display Counter', image: '/images/Bakery Product/Cold Display Counter.png' },
            { name: 'Spiral Mixer Machine', image: '/images/Bakery Product/Spiral Mixer Machine.png' },
            { name: 'Square Display Counter', image: '/images/Bakery Product/Square Display Counter.png' },
        ],
    },
    refrigeration: {
        title: 'REFRIGERATION',
        slug: 'refrigeration',
        description:
            'Keep Your Ingredients Fresh And Your Kitchen Running Smoothly With Our Premium Refrigeration Equipment. Designed For Heavy-Duty Commercial Use, Our Range Delivers Consistently Low Temperatures And Maximum Efficiency.',
        products: [
            { name: 'Cold Bain Marie', image: '/images/Refrigeration/Cold Bain Marie.png' },
            { name: 'Double Top Door Chest Deep Freezer', image: '/images/Refrigeration/Double Top Door Chest Deep Freezer.png' },
            { name: 'Four Door Refrigerator', image: '/images/Refrigeration/Four Door Refrigerator.png' },
            { name: 'Ice Cube Machine', image: '/images/Refrigeration/Ice Cube Machine.png' },
            { name: 'Pizza Makeline', image: '/images/Refrigeration/Pizza Makeline.png' },
            { name: 'Softy Machine', image: '/images/Refrigeration/Softy Machine.png' },
            { name: 'Table Top Refrigerator', image: '/images/Refrigeration/Table Top Refrigerator.png' },
            { name: 'Two Door Refrigerator', image: '/images/Refrigeration/Two Door Refrigerator.png' },
            { name: 'Upright Beverage Coolers', image: '/images/Refrigeration/Upright Beverage Coolers.png' },
            { name: 'Water Cooler', image: '/images/Refrigeration/Water Cooler.png' },
        ],
    },
    'heating-range': {
        title: 'HEATING RANGE',
        slug: 'heating-range',
        description:
            'Power Your Kitchen With Our Robust Heating Range Equipment. From Commercial Burners To Tandoors, Our Heating Solutions Are Built For High-Performance Cooking In Demanding Kitchen Environments.',
        products: [
            { name: 'Dosa Bhatti', image: '/images/Heating Range/Dosa Bhatti.png' },
            { name: 'Drum Tandoor', image: '/images/Heating Range/Drum Tandoor.png' },
            { name: 'Hot Bain Marie', image: '/images/Heating Range/Hot Bain Marie.png' },
            { name: 'Kadai Fryer', image: '/images/Heating Range/Kadai Fryer.png' },
            { name: 'Roti Puffer', image: '/images/Heating Range/Roti Puffer.png' },
            { name: 'Single Burner Gas Range', image: '/images/Heating Range/Single Burner Gas Range.png' },
            { name: 'Tank Tandoor', image: '/images/Heating Range/Tank Tandoor.png' },
            { name: 'Three Burner Chinese Gas', image: '/images/Heating Range/Three Burner Chinese Gas.png' },
            { name: 'Three Burner Indian Gas', image: '/images/Heating Range/Three Burner Indian Gas.png' },
            { name: 'Two Burner Indian', image: '/images/Heating Range/Two Burner Indian.png' },
        ],
    },
    'chat-and-fast-food-counter': {
        title: 'CHAT & FAST FOOD COUNTER',
        slug: 'chat-and-fast-food-counter',
        description:
            'Serve Your Customers Efficiently With Our Sleek And Durable Chat & Fast Food Counters. Designed For Quick Service, These Counters Offer Ample Space, Easy Access, And Hygienic Surfaces, Perfect For Fast-Paced Environments.',
        products: [
            { name: 'Chaat Counter - 1', image: '/images/Chaat & Fast Food Counter/Chaat Counter - 1.png' },
            { name: 'Chaat Counter - 2', image: '/images/Chaat & Fast Food Counter/Chaat Counter - 2.png' },
            { name: 'Pani Puri Counter', image: '/images/Chaat & Fast Food Counter/Pani Puri Counter.png' },
            { name: 'Pav Bhaji Counter', image: '/images/Chaat & Fast Food Counter/Pav Bhaji Counter.png' },
        ],
    },
    'work-and-profession-table': {
        title: 'WORK & PROFESSION TABLE',
        slug: 'work-and-profession-table',
        description:
            'Optimize Your Kitchen Workflow With Our Sturdy And Spacious Work & Profession Tables. Built For Durability And Ease Of Use, They Provide The Perfect Surface For Food Prep And Professional Tasks In Busy Kitchens.',
        products: [
            { name: 'Cash Drawer', image: '/images/Work & Professyion Table/Cash Drawer.png' },
            { name: 'Drawer With Storage Table', image: '/images/Work & Professyion Table/Drawer With Storage Table.png' },
            { name: 'Pick Up Counter', image: '/images/Work & Professyion Table/Pick Up Counter.png' },
            { name: 'Restaurant Table', image: '/images/Work & Professyion Table/Restaurant Table.png' },
            { name: 'Service Table', image: '/images/Work & Professyion Table/Service Table.png' },
            { name: 'Single Sink', image: '/images/Work & Professyion Table/Single Sink.png' },
            { name: 'Sink With Table', image: '/images/Work & Professyion Table/Sink With Table.png' },
            { name: 'Three Sinks Table', image: '/images/Work & Professyion Table/Three Sinks Table.png' },
            { name: 'Three Step Work', image: '/images/Work & Professyion Table/Three Step Work.png' },
            { name: 'Work Table With Drawer', image: '/images/Work & Professyion Table/Work Table With Drawer.png' },
            { name: 'Work Table', image: '/images/Work & Professyion Table/Work Table.png' },
            { name: 'Work With Storage Table', image: '/images/Work & Professyion Table/Work With Storage Table.png' },
        ],
    },
    'rack-trolley': {
        title: 'RACK TROLLEY',
        slug: 'rack-trolley',
        description:
            'Easily Transport And Organize Your Baked Goods With Our Durable And Versatile Rack Trolleys. Designed For Efficiency, These Trolleys Offer Smooth Mobility And Ample Storage, Perfect For Busy Kitchen Environments.',
        products: [
            { name: 'Dish Rack', image: '/images/Rack Trolley/Dish Rack.png' },
            { name: 'Masala Trolley', image: '/images/Rack Trolley/Masala Trolley.png' },
            { name: 'Pipe Pot Rack', image: '/images/Rack Trolley/Pipe Pot Rack.png' },
            { name: 'Service Trolley', image: '/images/Rack Trolley/Service Trolley.png' },
            { name: 'Storage Rack', image: '/images/Rack Trolley/Storage Rack.png' },
            { name: 'Tray Slide Trolley', image: '/images/Rack Trolley/Tray Slide Trolley.png' },
        ],
    },
    processing: {
        title: 'PROCESSING',
        slug: 'processing',
        description:
            'Enhance Your Kitchen Efficiency With Our Advanced Processing Equipment. Designed For Precision And Speed, Our Range Of Tools Ensures Smooth And Consistent Preparation, Ideal For Professional Kitchens And Large-Scale Production.',
        products: [
            { name: 'Coffee Beans Grinder', image: '/images/Processing/Coffee Beans Grinder.png' },
            { name: 'Coffee Machine', image: '/images/Processing/Coffee Machine.png' },
            { name: 'Grilled Machine', image: '/images/Processing/Grilled Machine.png' },
            { name: 'Heavy Duty Exhaust Fan', image: '/images/Processing/Heavy Duty Exhaust Fan.png' },
            { name: 'Ice Blender', image: '/images/Processing/Ice Blender.png' },
            { name: 'Idli Steamer', image: '/images/Processing/Idli Steamer.png' },
            { name: 'Meat Mincer', image: '/images/Processing/Meat Mincer.png' },
            { name: 'Pizza Gas Oven', image: '/images/Processing/Pizza Gas Oven.png' },
            { name: 'Pizza Oven', image: '/images/Processing/Pizza Oven.png' },
            { name: 'Plate Induction Stove', image: '/images/Processing/Plate Induction Stove.png' },
            { name: 'Plate Warmer', image: '/images/Processing/Plate Warmer.png' },
            { name: 'Pulveriser', image: '/images/Processing/Pulveriser.png' },
            { name: 'Wet Grinder', image: '/images/Processing/Wet Grinder.png' },
        ],
    },
    'hotel-and-restaurant': {
        title: 'HOTEL & RESTAURANT',
        slug: 'hotel-and-restaurant',
        description:
            'Complete Kitchen Solutions For Hotels And Restaurants. From Heavy-Duty Cooking Equipment To Elegant Serving Stations, We Provide Everything You Need To Run A Professional Hospitality Kitchen.',
        products: [],
    },
    'cafe-and-bakery-kitchen': {
        title: 'CAFE & BAKERY KITCHEN',
        slug: 'cafe-and-bakery-kitchen',
        description:
            'Specialized Equipment For Cafes And Bakery Kitchens. Our Range Includes Ovens, Display Counters, Coffee Stations, And Everything Needed To Create A Perfect Cafe Experience.',
        products: [],
    },
    'bar-and-food-court': {
        title: 'BAR & FOOD COURT',
        slug: 'bar-and-food-court',
        description:
            'Premium Equipment For Bars And Food Courts. From Beverage Dispensers To Fast-Service Counters, We Offer Durable And Stylish Solutions For High-Traffic Environments.',
        products: [],
    },
    'canteen-and-cloud-kitchen': {
        title: 'CANTEEN & CLOUD KITCHEN',
        slug: 'canteen-and-cloud-kitchen',
        description:
            'Efficient And Scalable Equipment For Canteens And Cloud Kitchens. Designed For Bulk Cooking And Quick Service, Our Solutions Help You Serve More With Less Effort.',
        products: [],
    },
    'hospital-and-pantry-kitchen': {
        title: 'HOSPITAL & PANTRY KITCHEN',
        slug: 'hospital-and-pantry-kitchen',
        description:
            'Hygienic And Reliable Kitchen Equipment For Hospitals And Pantry Kitchens. Our Products Meet The Highest Standards Of Cleanliness And Safety Required In Healthcare Environments.',
        products: [],
    },
};

export const saveProductsData = () => {
    localStorage.setItem('productsData', JSON.stringify(defaultProductsData));
};

export default defaultProductsData;
