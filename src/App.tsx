import React, { useState } from 'react';
import { FormProvider } from './context/FormContext';
import FormContainer from './components/FormContainer';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';

function App() {
  const [showSignupForm, setShowSignupForm] = useState(false);

  if (showSignupForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => setShowSignupForm(false)} showBackButton />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSignupClick={() => setShowSignupForm(true)} />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;