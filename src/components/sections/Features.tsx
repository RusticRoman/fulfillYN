import React from 'react';
import { Shield, Zap, Users, BarChart3, Globe, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Vetted Partners',
    description: 'All 3PL partners are thoroughly screened for reliability, compliance, and performance standards.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Our AI-powered algorithm matches you with the perfect 3PL partners based on your specific requirements.',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Get personalized assistance from our logistics experts throughout your partnership journey.',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track key metrics and performance indicators to ensure your fulfillment operations are optimized.',
    color: 'text-orange-600 bg-orange-100'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access a worldwide network of fulfillment centers to serve customers anywhere.',
    color: 'text-indigo-600 bg-indigo-100'
  },
  {
    icon: Clock,
    title: 'Fast Implementation',
    description: 'Get up and running quickly with streamlined onboarding and integration processes.',
    color: 'text-red-600 bg-red-100'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose FulfillYN?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make finding and partnering with the right 3PL simple, fast, and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;