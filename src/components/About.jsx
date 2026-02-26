import { FaArrowRight } from 'react-icons/fa';

const highlights = [
    {
        title: '3.5 Lakh Sq. Ft. of Infrastructure',
        image: '/images/a1.webp',
    },
    {
        title: 'Cutting-Edge Technology in Action',
        image: '/images/a2.webp',
    },
    {
        title: 'A team of 1,000+ people',
        image: '/images/a3.webp',
    },
];

const About = () => {
    return (
        <section id="about" className="section-padding bg-gold-light">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest">Why Choose Us</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 font-heading">
                        Anna's Kitchen Equipments
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="group"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-secondary font-heading">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <a href="#story" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-4 transition-all duration-300 group">
                        Read More
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
