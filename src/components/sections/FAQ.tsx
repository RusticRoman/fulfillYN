import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How does FulfillYN vet 3PL partners?',
    answer: 'We have a comprehensive vetting process that includes background checks, financial stability assessment, compliance verification, performance history review, and on-site inspections. Only partners that meet our strict criteria are accepted into our network.'
  },
  {
    question: 'How long does it take to find a 3PL partner?',
    answer: 'Most businesses are matched with suitable 3PL partners within 48-72 hours. The entire process from initial matching to final partnership agreement typically takes 1-2 weeks, depending on your specific requirements and decision timeline.'
  },
  {
    question: 'What types of businesses do you work with?',
    answer: 'We work with businesses of all sizes, from startups to enterprise companies, across various industries including e-commerce, retail, healthcare, food & beverage, electronics, and more. Our network includes specialized 3PLs for unique requirements.'
  },
  {
    question: 'Are there any setup fees or hidden costs?',
    answer: 'No, there are no setup fees or hidden costs. Our Starter plan is completely free, and our paid plans have transparent monthly pricing. You only pay for the plan you choose - there are no additional fees for matching or connecting with 3PL partners.'
  },
  {
    question: 'Can I work with multiple 3PL partners?',
    answer: 'Absolutely! Many of our clients work with multiple 3PL partners to diversify their fulfillment network, serve different geographic regions, or handle different product types. Our platform makes it easy to manage multiple partnerships.'
  },
  {
    question: 'What if I\'m not satisfied with a 3PL partner?',
    answer: 'We provide ongoing support to ensure successful partnerships. If issues arise, our team will work with both parties to resolve them. If a partnership isn\'t working out, we can help you find alternative partners from our network at no additional cost.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our platform and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <Button variant="outline">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;