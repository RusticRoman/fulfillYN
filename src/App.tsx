import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import UserCabinet from './components/dashboard/UserCabinet';

type AppView = 'home' | 'login' | 'signup' | 'cabinet' | '3pl-form';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const { isAuthenticated, user, setUserType } = useAuth();

  const handleLoginSuccess = () => {
    setCurrentView('cabinet');
  };

  const handleSignupSuccess = () => {
    setCurrentView('cabinet');
  };

  const handleUserTypeSelection = (type: 'brand' | '3pl') => {
    setUserType(type);
    if (type === '3pl') {
      setCurrentView('3pl-form');
    } else {
      // For brands, you could redirect to a different dashboard
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  // Signup page
  if (currentView === 'signup') {
    return (
      <SignupForm 
        onSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Login page
  if (currentView === 'login') {
    return (
      <LoginForm 
        onSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setCurrentView('signup')}
      />
    );
  }

  // User cabinet (after login, before selecting user type)
  if (currentView === 'cabinet' && isAuthenticated && !user?.userType) {
    return (
      <UserCabinet 
        onSelectUserType={handleUserTypeSelection}
        onLogout={handleLogout}
      />
    );
  }

  // 3PL Partner form
  if (currentView === '3pl-form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => setCurrentView('cabinet')} showBackButton />
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

  // Home page
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onGetStartedClick={() => setCurrentView('signup')}
        onLoginClick={() => setCurrentView('login')}
      />
      <Hero onGetStartedClick={() => setCurrentView('signup')} />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing onGetStartedClick={() => setCurrentView('signup')} />
      <FAQ />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;