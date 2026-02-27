import { useParams, Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaPhone, FaArrowLeft, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import productsData from '../data/productsData';

const CollectionPage = () => {
    const { category } = useParams();
    const data = productsData[category];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <div className="text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">🔍</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white font-heading mb-4">Category Not Found</h2>
                    <p className="text-white/40 mb-8 max-w-md mx-auto">The product category you're looking for doesn't exist or may have been moved.</p>
                    <Link
                        to="/collections"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-secondary px-7 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-accent/20 transition-all"
                    >
                        <FaArrowLeft className="text-sm" />
                        View All Collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-dark-light to-secondary" />
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(197,160,78,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,175,55,0.2) 0%, transparent 50%)`,
                }} />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-12">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/40 mb-10">
                        <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
                            <FaHome className="text-xs" /> Home
                        </Link>
                        <FaChevronRight className="text-xs text-white/20" />
                        <Link to="/collections" className="hover:text-accent transition-colors">Collections</Link>
                        <FaChevronRight className="text-xs text-white/20" />
                        <span className="text-accent">{data.title}</span>
                    </div>

                    {/* Title section */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="inline-block bg-accent/10 border border-accent/20 text-accent px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                {data.products.length} Products
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-heading uppercase tracking-tight">
                                {data.title}
                            </h1>
                            <div className="flex items-center gap-3 mt-4">
                                <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
                                <p className="text-white/40 text-sm md:text-base max-w-xl leading-relaxed">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <a
                                href="tel:+919106780688"
                                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 px-5 py-2.5 rounded-full text-sm font-medium hover:border-accent/30 hover:text-accent transition-all duration-300"
                            >
                                <FaPhone className="text-xs text-accent" />
                                +91 91067 80688
                            </a>
                            <a
                                href="https://wa.me/919106780688"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300"
                            >
                                <FaWhatsapp className="text-lg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.products.map((product, index) => (
                        <Link
                            key={index}
                            to={`/collections/${category}/${encodeURIComponent(product.name)}`}
                            className="group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 block"
                        >
                            {/* Card border / frame */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5" />
                            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-[#252525] to-[#1a1a1a]" />
                            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-accent/20 transition-colors duration-700" />

                            <div className="relative">
                                {/* Product Image */}
                                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] p-6 flex items-center justify-center relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
                                    />
                                    {/* Subtle glow behind product */}
                                    <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Index badge */}
                                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white/50">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-5 border-t border-white/5">
                                    <h3 className="font-bold text-white text-sm md:text-base font-heading tracking-wide group-hover:text-accent transition-colors duration-500">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-accent/50 text-xs font-semibold uppercase tracking-wider group-hover:text-accent/80 transition-colors">
                                            View Details
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-500">
                                            <FaArrowRight className="text-[10px] text-white/30 group-hover:text-accent -rotate-45 transition-colors duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Contact Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <FaPhone className="text-sm text-accent" />
                        </div>
                        <div>
                            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">Need Assistance?</p>
                            <a href="tel:+919106780688" className="text-white font-semibold text-sm hover:text-accent transition-colors">
                                +91 91067 80688
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white/20 text-sm">
                            {data.products.length} products in {data.title}
                        </span>
                        <div className="w-px h-4 bg-white/10" />
                        <span className="font-heading font-semibold text-accent/60 tracking-wide text-sm">
                            Anna's Kitchen Equipments
                        </span>
                    </div>
                </div>
            </div>

            {/* Back to Collections */}
            <div className="border-t border-white/5 py-10 text-center">
                <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-secondary px-8 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                    <FaArrowLeft className="text-xs" />
                    View All Collections
                </Link>
            </div>
        </div>
    );
};

export default CollectionPage;
