import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import CTA from '../components/CTA';
import ClientSlider from '../components/ClientSlider';
import PartnerSlider from '../components/PartnerSlider';


const productCategories = [
    { name: 'Cooking Range', slug: 'heating-range' },
    { name: 'Refrigeration Equipment', slug: 'refrigeration' },
    { name: 'Display Counter', slug: 'chat-and-fast-food-counter' },
    { name: 'Bar Equipment', slug: 'chat-and-fast-food-counter' },
    { name: 'Bakery Equipment', slug: 'bakery-products' },
    { name: 'Storage Table & Rack', slug: 'rack-trolley' },
    { name: 'Dish Washing Equipment', slug: 'processing' },
    { name: 'Canteen Equipment', slug: 'work-and-profession-table' },
];

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/ab.webp')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/60 to-secondary/40" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading">
                        About <span className="text-accent">Us</span>
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-white/70 mt-4">
                        <Link to="/" className="hover:text-accent transition-colors flex items-center gap-1">
                            <FaHome className="text-xs" /> Home
                        </Link>
                        <FaChevronRight className="text-xs text-white/40" />
                        <span className="text-accent">About Us</span>
                    </div>
                </div>
            </div>

            {/* Product Category Nav */}
            <div className="bg-secondary/90 backdrop-blur-sm overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 flex gap-1">
                    {productCategories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={`/collections/${cat.slug}`}
                            className="whitespace-nowrap text-white/70 text-xs font-medium px-4 py-3 hover:text-accent hover:bg-white/5 transition-all duration-300"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            <ClientSlider />

            {/* Quote Form */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <form className="flex flex-wrap items-center gap-3 bg-white rounded-full shadow-lg border border-gray-100 p-2 pl-6">
                    <input type="text" placeholder="Name" className="flex-1 min-w-[100px] text-sm py-2 px-3 outline-none bg-transparent border-r border-gray-200" />
                    <input type="text" placeholder="Contact No." className="flex-1 min-w-[100px] text-sm py-2 px-3 outline-none bg-transparent border-r border-gray-200" />
                    <input type="text" placeholder="Location" className="flex-1 min-w-[100px] text-sm py-2 px-3 outline-none bg-transparent border-r border-gray-200" />
                    <input type="text" placeholder="Your Budget" className="flex-1 min-w-[100px] text-sm py-2 px-3 outline-none bg-transparent border-r border-gray-200" />
                    <select className="text-sm py-2 px-3 outline-none bg-transparent text-gray-500">
                        <option>-- Select Ranfes --</option>
                        <option>Heating Range</option>
                        <option>Refrigeration</option>
                        <option>Bakery Products</option>
                        <option>Processing</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                        Get Quote
                    </button>
                </form>
            </div>

            {/* About Content */}
            <div className="max-w-5xl mx-auto px-4 py-12">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    Cooking Equipment Manufacturing Company in Lucknow
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mt-3 mb-6 font-heading">
                    About <span className="text-primary">Anna's Kitchen Equipments</span> – Your Trusted Partner for Commercial Kitchen Solutions
                </h2>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                    <p>
                        Founded in 2007, Anna's Kitchen Equipments has been delivering top-quality commercial kitchen equipment designed to meet the unique needs of restaurants, hotels, cloud kitchens, and catering businesses. As one of the leading kitchen equipment manufacturers and suppliers in India, our mission is to make your kitchen setup seamless and cost-effective.
                    </p>
                    <p>
                        We know how challenging it can be to find reliable and durable industrial kitchen equipment at the right price. That's why we offer a complete range of affordable kitchen equipment — from basic tools to advanced appliances — all under one roof.
                    </p>
                    <p>
                        Whether you're launching a new food business or upgrading your hotel kitchen equipment, our expert team is here to help you choose the perfect setup tailored to your operations. With a focus on quality, performance, and customer satisfaction, Anna's Kitchen Equipments is your one-stop destination for all professional kitchen needs.
                    </p>
                    <p>
                        Explore the world of efficient and innovative cooking solutions at annakitchenequipments.in — where your culinary vision comes to life.
                    </p>
                </div>
            </div>

            <PartnerSlider />

            <div className="text-center py-8 flex flex-wrap justify-center gap-4">
                <Link
                    to="/collections"
                    className="text-primary text-sm font-semibold hover:underline"
                >
                    Explore Anna Kitchen Products or Shop by Brand
                </Link>
                <span className="text-gray-300">|</span>
                <a href="#" className="text-primary text-sm font-semibold hover:underline">
                    Download Brochure
                </a>
            </div>

            {/* CTA - Follow Us + Let's Work Together */}
            <CTA />
        </div>
    );
};

export default AboutPage;
