import React from 'react';
import { CheckCircle, ArrowRight, Search } from 'lucide-react';
import Button from './ui/Button';

interface BrandSuccessMessageProps {
  onContinue?: () => void;
}

const BrandSuccessMessage: React.FC<BrandSuccessMessageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-purple-500 h-12 w-12" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Brand Profile Created!</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your brand profile has been successfully created. We'll now start matching you with 3PL partners that meet your specific requirements and criteria.
        </p>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-purple-800">
            <strong>What's next?</strong><br />
            • Our AI will analyze your requirements<br />
            • You'll receive matched 3PL recommendations within 24 hours<br />
            • Review proposals and connect with your preferred partners<br />
            • Start your fulfillment partnership
          </p>
        </div>
        
        <div className="space-y-3">
          {onContinue && (
            <Button 
              onClick={onContinue}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Back to Brands Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
          
          <Button 
            variant="outline"
            className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            <Search className="mr-2 w-4 h-4" />
            Find Matching 3PLs Now
          </Button>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-6">
          <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:support@fulfillyn.com" className="text-purple-600 hover:underline">
              support@fulfillyn.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandSuccessMessage;