import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    {
        question: 'Can Anna Kitchen Equipments help with kitchen design and layout planning?',
        answer: 'Absolutely! Anna Kitchen Equipments offers end-to-end kitchen planning and designing services to help you create an efficient, ergonomic, and well-organized commercial kitchen setup tailored to your operational needs.',
    },
    {
        question: 'Where can I find reliable commercial kitchen equipment in Lucknow?',
        answer: 'If you are looking for reliable commercial kitchen equipment in Lucknow, Uttar Pradesh, Anna Kitchen Equipments is a trusted local manufacturer and supplier. We provide a complete range of high-quality commercial kitchen equipment for restaurants, hotels, cafes, bakeries, cloud kitchens, hospitals, and institutions.',
    },
    {
        question: 'What industries does Anna Kitchen Equipments serve?',
        answer: 'We serve a broad range of sectors including restaurants, hotels, cloud kitchens, hospitals, educational institutions, cafeterias, catering services, and large institutional messes.',
    },
    {
        question: 'Do you provide customized kitchen equipment?',
        answer: 'Yes — we offer customization options based on your kitchen size, workflow needs, and specific operational requirements. Our design team works closely with clients to tailor solutions that optimize space and performance.',
    },
    {
        question: 'What products does Anna Kitchen Equipments offer?',
        answer: 'We offer a wide range of commercial kitchen solutions including cooking ranges, refrigeration equipment, imported kitchen machines, food preparation tools, display counters, bakery equipment, storage racks/tables, dishwashing systems, canteen equipment, chapati-making machines, pantry equipment, and more.',
    },
    {
        question: 'Are your products compliant with industry standards?',
        answer: 'Yes, our equipment is manufactured according to high quality standards using premium stainless steel and quality fabrication processes. We follow industry norms to ensure durability, hygiene, and performance.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section-padding bg-gold-lighter">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest">FAQ</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 font-heading">
                        Frequently Asked Questions
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-5 rounded-full" />
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-semibold text-secondary text-sm md:text-base pr-4 font-heading">
                                    {faq.question}
                                </span>
                                <FaChevronDown
                                    className={`text-primary text-sm flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="px-5 pb-5 text-gray-medium text-sm leading-relaxed border-t border-gray-50 pt-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
