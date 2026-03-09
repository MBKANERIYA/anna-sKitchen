import { useEffect, useRef } from 'react';

const partnerLogos = [
    { name: 'Cellfrost', logo: '/Partners/Cellfrost.png', bg: '#000' },
    { name: 'Rational', logo: '/Partners/Rational.svg' },
    { name: 'Vitamix', logo: '/Partners/vitamix.jpg' },
    { name: 'Rockwell', logo: '/Partners/Rockwell.png' },
    { name: 'TRUFROST', logo: '/Partners/TRUFROST.webp' },
    { name: 'Western', logo: '/Partners/Western.png' },
];

const PartnerSlider = () => {
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

    const allPartners = [...partnerLogos, ...partnerLogos];

    return (
        <section className="bg-gold-light py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-center text-sm font-semibold text-secondary mb-8 tracking-wide uppercase">
                    Business Partners
                </h2>
                <div
                    ref={scrollRef}
                    className="flex items-center gap-8 overflow-hidden"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {allPartners.map((partner, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 rounded-xl px-8 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex items-center justify-center ${partner.bg ? '' : 'bg-white'}`}
                            style={{ minWidth: '180px', height: '90px', backgroundColor: partner.bg || undefined }}
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-16 max-w-[140px] object-contain transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSlider;

