import { useParams, Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaPhone, FaArrowLeft } from 'react-icons/fa';
import productsData from '../data/productsData';

const CollectionPage = () => {
    const { category } = useParams();
    const data = productsData[category];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-light">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-secondary font-heading mb-4">Category Not Found</h2>
                    <p className="text-gray-medium mb-8">The product category you're looking for doesn't exist.</p>
                    <Link
                        to="/collections"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        <FaArrowLeft className="text-sm" />
                        View All Collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f0eb]">
            {/* Breadcrumb */}
            <div className="bg-secondary text-white">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-sm">
                    <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
                        <FaHome className="text-xs" /> Home
                    </Link>
                    <FaChevronRight className="text-xs text-white/40" />
                    <Link to="/collections" className="hover:text-accent transition-colors">Collections</Link>
                    <FaChevronRight className="text-xs text-white/40" />
                    <span className="text-accent">{data.title}</span>
                </div>
            </div>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
                <div className="flex items-start gap-4 mb-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary font-heading uppercase tracking-tight">
                        {data.title}
                    </h1>
                    <div className="hidden md:block flex-1 h-1 bg-gradient-to-r from-teal-600 to-teal-400 mt-8 rounded-full max-w-32" />
                </div>
                <p className="text-gray-700 text-sm md:text-base max-w-3xl leading-relaxed font-medium italic">
                    {data.description}
                </p>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.products.map((product, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-[#f0e8df]"
                        >
                            {/* Product Image */}
                            <div className="aspect-[4/3] overflow-hidden bg-[#f0e8df] p-4 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                                />
                            </div>

                            {/* Product Name Label */}
                            <div className="bg-[#8B5E3C] text-white text-center py-3 px-4">
                                <h3 className="font-semibold text-sm md:text-base tracking-wide">{product.name}</h3>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300 pointer-events-none rounded-2xl" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Bar */}
            <div className="bg-[#8B5E3C] text-white">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaPhone className="text-sm" />
                        <span className="font-medium text-sm">Contact Number : +91 9106780688</span>
                    </div>
                    <span className="text-white/60 text-sm">{String(data.products.length).padStart(2, '0')}</span>
                </div>
            </div>

            {/* Anna Kitchen Brand Bar */}
            <div className="bg-gradient-to-r from-[#8B5E3C] to-[#6B4226] text-white">
                <div className="max-w-7xl mx-auto px-4 py-3 text-right">
                    <span className="font-heading font-semibold tracking-wide">Anna's Kitchen Equipments</span>
                </div>
            </div>

            {/* Back to Collections */}
            <div className="bg-[#f5f0eb] py-8 text-center">
                <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white px-7 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                    <FaArrowLeft className="text-xs" />
                    View All Collections
                </Link>
            </div>
        </div>
    );
};

export default CollectionPage;
