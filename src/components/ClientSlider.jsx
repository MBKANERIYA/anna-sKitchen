import { useEffect, useRef } from 'react';

const clientLogos = [
    { name: 'Mahal', image: '/clients/Logo.webp' },
    { name: 'Bar Stock Exchange', image: '/clients/unnamed (2).jpg' },
    { name: 'SLMG Beverages', image: '/clients/logo (1).png' },
    { name: 'Amul', image: '/clients/Amul_official_logo.svg' },
    { name: 'Haldiram', image: '/clients/Haldiram_Logo-9GN.png' },
    { name: 'Atul Bakery', image: '/clients/Atul-bakery-Logo-new.svg' },
    { name: 'Subway', image: '/clients/subway-logo.e7b602efa8e0c7316077.webp' },
    { name: 'Sumul Dairy', image: '/clients/sumul_dairy_logo.jpg' },
    { name: 'OYO', image: '/clients/download (1).png' },
    { name: 'Client', image: '/clients/487824977_122233010432025315_6264959669572713421_n.jpg' },
    // { name: 'Client', image: '/clients/WhatsApp Image 2026-02-26 at 17.33.43.jpeg' },
    { name: 'Client', image: '/clients/WhatsApp Image 2026-02-26 at 17.33.43 (1).jpeg' },
    { name: 'Client', image: '/clients/unnamed.jpg' },
    { name: 'IRCTC', image: '/clients/IRCTC.png' },
];

const ClientSlider = () => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationId;
        let scrollPos = 0;
        const speed = 0.5;

        const animate = () => {
            scrollPos += speed;
            if (scrollPos >= container.scrollWidth / 2) {
                scrollPos = 0;
            }
            container.scrollLeft = scrollPos;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleMouseEnter = () => cancelAnimationFrame(animationId);
        const handleMouseLeave = () => {
            animationId = requestAnimationFrame(animate);
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Duplicate logos for seamless loop
    const allLogos = [...clientLogos, ...clientLogos];

    return (
        <section className="bg-gold-light py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-center text-sm font-semibold text-secondary mb-8 tracking-wide uppercase">
                    Our Clients
                </h2>
                <div
                    ref={scrollRef}
                    className="flex items-center gap-8 overflow-hidden"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {allLogos.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex items-center justify-center"
                            style={{ minWidth: '180px', height: '90px' }}
                        >
                            <img
                                src={client.image}
                                alt={client.name}
                                className="max-h-14 max-w-[150px] object-contain transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientSlider;
