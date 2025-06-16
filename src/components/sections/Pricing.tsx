import React from 'react';
import { Check, Star } from 'lucide-react';
import Button from '../ui/Button';

interface PricingProps {
  onGetStartedClick?: () => void;
}

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small businesses getting started',
    features: [
      'Access to 3PL network',
      'Basic matching algorithm',
      'Email support',
      'Up to 3 partner connections',
      'Basic analytics'
    ],
    popular: false
  },
  {
    name: 'Growth',
    price: '$99',
    period: '/month',
    description: 'Ideal for growing businesses with higher volumes',
    features: [
      'Everything in Starter',
      'Advanced matching with AI',
      'Priority support',
      'Unlimited partner connections',
      'Advanced analytics & reporting',
      'Dedicated account manager',
      'Custom integration support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large enterprises with complex needs',
    features: [
      'Everything in Growth',
      'White-label solution',
      'Custom API development',
      '24/7 phone support',
      'Multi-location management',
      'Advanced compliance tools',
      'Custom SLA agreements'
    ],
    popular: false
  }
];

const Pricing: React.FC<PricingProps> = ({ onGetStartedClick }) => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                plan.popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                
                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  onClick={onGetStartedClick}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include our core matching service and access to our vetted 3PL network.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;