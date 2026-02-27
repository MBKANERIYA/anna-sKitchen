import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    {
        question: 'Do you create custom kitchen equipment?',
        answer: 'Yes, we custom design and sizes for hotels, restaurants, bakeries and caterers.',
    },
    {
        question: 'What are your materials?',
        answer: 'Our materials are all first grade food safe stainless steel and certified components, which gives hygiene, durability and strength.',
    },
    {
        question: 'Do your shipping and products only apply to Surat?',
        answer: 'No, we ship and we can ship our equipment through the whole of India. Our packaging is reliable and protected and we are quick!',
    },
    {
        question: 'Do you offer after sales?',
        answer: 'Sure! We offer insure support, maintenance recommendations and dedicated support for any assistance around after sales that may be required to ensure a seamless running of the product.',
    },
    {
        question: 'How would I go about requesting a quote?',
        answer: 'Simply use the contact form for a quote or feel free to contact us by phone or email in correspondence with your product requirements.',
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

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
