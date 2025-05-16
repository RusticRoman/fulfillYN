import React from 'react';
import { FormProvider } from './context/FormContext';
import FormContainer from './components/FormContainer';
import { Truck } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Truck className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">3PL Partner Onboarding</h1>
          </div>
          <div className="text-sm text-gray-600">
            Have questions? Contact <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Become a 3PL Partner</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete this form to tell us about your logistics capabilities, and join our network of trusted fulfillment partners.
          </p>
        </div>

        <FormProvider>
          <FormContainer />
        </FormProvider>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Truck className="h-6 w-6" />
              <span className="text-lg font-semibold">3PL Network</span>
            </div>
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} Logistics Network Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;