import React from 'react';
import { Search, UserCheck, Handshake, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Tell Us Your Needs',
    description: 'Share your fulfillment requirements, volume, and specific needs through our simple form.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: UserCheck,
    title: 'Get Matched',
    description: 'Our algorithm finds and presents you with the best 3PL partners that match your criteria.',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: Handshake,
    title: 'Connect & Partner',
    description: 'Review proposals, compare options, and connect directly with your chosen 3PL partners.',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: TrendingUp,
    title: 'Scale & Grow',
    description: 'Monitor performance, optimize operations, and scale your business with confidence.',
    color: 'text-orange-600 bg-orange-100'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding the perfect 3PL partner has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-orange-200"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 lg:bg-gray-900 lg:text-white lg:border-gray-900">
                  {index + 1}
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 pt-12">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;