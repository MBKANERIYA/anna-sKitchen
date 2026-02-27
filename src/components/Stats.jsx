import { useState, useEffect, useRef } from 'react';
import { FaProjectDiagram, FaUserFriends, FaWarehouse, FaCalendarAlt } from 'react-icons/fa';

const stats = [
    { icon: <FaProjectDiagram />, value: 100, suffix: '+', label: 'Total Projects' },
    { icon: <FaUserFriends />, value: 700, suffix: '+', label: 'Total Family' },
    { icon: <FaWarehouse />, value: 350000, suffix: '', label: 'Infrastructure (Sq. Ft)' },
    { icon: <FaCalendarAlt />, value: 20, suffix: '+', label: 'Experience (Years)' },
];

const Counter = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const Stats = () => {
    return (
        <section className="relative py-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-dark to-secondary" />
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />

            <div className="relative max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center text-accent text-2xl group-hover:bg-accent group-hover:text-secondary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 font-heading">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
