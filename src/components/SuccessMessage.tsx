import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4 py-12 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your 3PL information has been successfully submitted. Our team will review your details and reach out to you shortly.
        </p>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-500">
            If you have any questions, please contact us at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;