import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from './ui/Button';

interface SuccessMessageProps {
  onContinue?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-500 h-12 w-12" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Application Submitted!</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your 3PL warehouse information has been successfully submitted. Our team will review your details and reach out to you shortly to discuss partnership opportunities.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>What's next?</strong><br />
            • Our team will review your application within 24-48 hours<br />
            • You'll receive an email confirmation with next steps<br />
            • We may reach out for additional information if needed
          </p>
        </div>
        
        {onContinue && (
          <Button 
            onClick={onContinue}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Back to Warehouses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-6">
          <p className="text-sm text-gray-500">
            Questions? Contact us at{' '}
            <a href="mailto:support@fulfillyn.com" className="text-blue-600 hover:underline">
              support@fulfillyn.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;