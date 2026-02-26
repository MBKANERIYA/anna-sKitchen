import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaArrowRight } from 'react-icons/fa';

const socials = [
    { icon: FaFacebookF, name: 'Follow On Facebook', href: '#' },
    { icon: FaLinkedinIn, name: 'Join On Linkedin', href: '#' },
    { icon: FaInstagram, name: 'Follow On Instagram', href: '#' },
    { icon: FaYoutube, name: 'Follow On Youtube', href: '#' },
];

const CTA = () => {
    return (
        <section id="contact" className="relative overflow-hidden">
            {/* Follow Us Section */}
            <div className="bg-gradient-to-b from-white to-green-50/50 py-16 md:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <span className="text-primary text-sm font-bold uppercase tracking-widest">Follow Us</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mt-3 font-heading">
                            Join for <span className="text-primary">updates, insights, and more.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {socials.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 bg-white rounded-full px-5 py-4 border border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                                    <social.icon className="text-lg" />
                                </div>
                                <span className="text-sm font-semibold text-secondary">{social.name}</span>
                                <div className="ml-auto w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors duration-300">
                                    <FaArrowRight className="text-xs -rotate-45" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Let's Work Together Section */}
            <div className="bg-gradient-to-b from-green-50/50 to-green-100/30 py-16 md:py-24 px-4 text-center">
                <span className="text-secondary/60 text-sm font-bold uppercase tracking-[0.3em]">LET'S DISCUSS</span>
                <div className="relative max-w-5xl mx-auto mt-6">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-secondary leading-[0.9] tracking-tight font-heading uppercase">
                        LET'S WORK
                    </h2>
                    <div className="flex items-center justify-center my-2 md:my-4">
                        <a
                            href="tel:+919161171118"
                            className="inline-flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent text-secondary font-bold text-sm md:text-base hover:scale-110 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 z-10"
                        >
                            <FaArrowRight className="text-lg md:text-xl -rotate-45 mb-1" />
                            <span className="text-xs md:text-sm font-bold">Get in Touch</span>
                        </a>
                    </div>
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-secondary leading-[0.9] tracking-tight font-heading uppercase">
                        TOGETHER
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default CTA;
