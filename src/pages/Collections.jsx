import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import productsData from '../data/productsData';

const categoryImages = {
    'bakery-products': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    refrigeration: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80',
    'heating-range': 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&q=80',
    'chat-and-fast-food-counter': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    'work-and-profession-table': 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
    'rack-trolley': 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80',
    processing: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
};

const Collections = () => {
    const categories = Object.values(productsData);

    return (
        <div className="min-h-screen bg-gray-light">
            {/* Breadcrumb */}
            <div className="bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
                        <FaHome className="text-xs" /> Home
                    </Link>
                    <FaChevronRight className="text-xs text-white/40" />
                    <span className="text-accent">Collections</span>
                </div>
            </div>

            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-secondary via-dark to-secondary py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }} />
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest">Browse Our Range</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 font-heading">
                        Our Product Collections
                    </h1>
                    <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
                        Explore our comprehensive range of commercial kitchen equipment for every need
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full" />
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            to={`/collections/${cat.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={categoryImages[cat.slug]}
                                    alt={cat.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                                <div className="absolute bottom-4 left-5 right-5">
                                    <h3 className="text-xl font-bold text-white font-heading uppercase tracking-wide">
                                        {cat.title}
                                    </h3>
                                    <p className="text-white/60 text-xs mt-1">
                                        {cat.products.length} Products
                                    </p>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-medium text-sm line-clamp-2 mb-4">
                                    {cat.description}
                                </p>
                                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                                    View Products <FaArrowRight className="text-xs" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
