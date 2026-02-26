import { useEffect, useRef } from 'react';

const partnerLogos = [
    { name: 'Cellfrost', color: '#E53935' },
    { name: 'BUTLER', color: '#1a1a1a' },
    { name: 'Vitamix', color: '#333' },
    { name: 'Rockwell', color: '#2196F3' },
    { name: 'RATIONAL', color: '#D32F2F' },
    { name: 'TRUFROST', color: '#0D47A1' },
    { name: 'Western', color: '#F57C00' },
    { name: 'EzyCook', color: '#00897B' },
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
        <section className="bg-gold-light py-10">
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
                            className="flex-shrink-0 bg-white rounded-xl px-8 py-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex items-center justify-center"
                            style={{ minWidth: '180px', height: '90px' }}
                        >
                            <span
                                className="text-xl font-extrabold tracking-wide transition-all duration-300"
                                style={{ color: partner.color }}
                            >
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerSlider;
