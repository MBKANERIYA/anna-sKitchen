import { FaCogs, FaShieldAlt, FaSlidersH, FaHeadset } from 'react-icons/fa';

const features = [
    {
        icon: <FaCogs className="text-3xl" />,
        title: 'End-to-End Solutions',
        description: 'From conceptual design and layout planning to manufacturing, installation, and post-sales support, we manage every step with precision.',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: <FaShieldAlt className="text-3xl" />,
        title: 'Premium Build Quality',
        description: 'We fabricate our equipment using top-grade stainless steel, infused with technical expertise and rigorous quality control.',
        color: 'from-amber-500 to-orange-500',
    },
    {
        icon: <FaSlidersH className="text-3xl" />,
        title: 'Highly Customizable Solutions',
        description: 'We offer customization ranging from equipment configuration to material finishes ensuring your operations function at peak efficiency.',
        color: 'from-purple-500 to-pink-500',
    },
    {
        icon: <FaHeadset className="text-3xl" />,
        title: 'Unmatched Workforce Support',
        description: 'Our onsite engineers provide installation and regular servicing across India. We pride ourselves on rapid delivery using trusted logistics networks.',
        color: 'from-green-500 to-emerald-500',
    },
];

const Features = () => {
    return (
        <section id="services" className="section-padding bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Strengths</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 font-heading">
                        We Power Your Kitchen Success
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-5 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="flex gap-5">
                                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary mb-3 font-heading">{feature.title}</h3>
                                    <p className="text-gray-medium text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
