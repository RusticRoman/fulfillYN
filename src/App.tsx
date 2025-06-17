import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { BrandFormProvider } from './context/BrandFormContext';
import FormContainer from './components/FormContainer';
import BrandFormContainer from './components/form/BrandFormContainer';
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
import WarehouseDashboard from './components/dashboard/WarehouseDashboard';
import BrandDashboard from './components/dashboard/BrandDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';

type AppView = 'home' | 'login' | 'signup' | 'cabinet' | 'warehouses' | '3pl-form' | 'admin' | 'brands' | 'brand-form';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const { isAuthenticated, user, setUserType } = useAuth();

  const handleLoginSuccess = () => {
    // Wait a moment for user data to be fully loaded
    setTimeout(() => {
      // Check if user already has a userType and navigate accordingly
      if (user?.userType) {
        if (user.userType === '3pl') {
          setCurrentView('warehouses');
        } else if (user.userType === 'admin') {
          setCurrentView('admin');
        } else if (user.userType === 'brand') {
          setCurrentView('brands');
        } else {
          setCurrentView('cabinet');
        }
      } else {
        setCurrentView('cabinet');
      }
    }, 100);
  };

  const handleSignupSuccess = () => {
    // Wait a moment for user data to be fully loaded after signup
    setTimeout(() => {
      if (user?.userType) {
        if (user.userType === '3pl') {
          setCurrentView('warehouses');
        } else if (user.userType === 'admin') {
          setCurrentView('admin');
        } else if (user.userType === 'brand') {
          setCurrentView('brands');
        } else {
          setCurrentView('cabinet');
        }
      } else {
        setCurrentView('cabinet');
      }
    }, 100);
  };

  const handleUserTypeSelection = (type: 'brand' | '3pl' | 'admin') => {
    setUserType(type);
    if (type === '3pl') {
      setCurrentView('warehouses');
    } else if (type === 'admin') {
      setCurrentView('admin');
    } else if (type === 'brand') {
      setCurrentView('brands');
    } else {
      setCurrentView('home');
    }
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  const handleAddWarehouse = () => {
    setCurrentView('3pl-form');
  };

  const handleAddBrand = () => {
    setCurrentView('brand-form');
  };

  const handleFormSuccess = () => {
    setCurrentView('warehouses');
  };

  const handleBrandFormSuccess = () => {
    setCurrentView('brands');
  };

  // Auto-navigate based on user type when user data is loaded
  React.useEffect(() => {
    if (isAuthenticated && user?.userType && currentView === 'home') {
      if (user.userType === '3pl') {
        setCurrentView('warehouses');
      } else if (user.userType === 'admin') {
        setCurrentView('admin');
      } else if (user.userType === 'brand') {
        setCurrentView('brands');
      }
    }
  }, [isAuthenticated, user, currentView]);

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

  // Admin dashboard
  if (currentView === 'admin') {
    return (
      <AdminDashboard 
        onBack={() => setCurrentView('cabinet')}
        onLogout={handleLogout}
      />
    );
  }

  // Brand dashboard
  if (currentView === 'brands') {
    return (
      <BrandDashboard 
        onAddBrand={handleAddBrand}
        onBack={() => setCurrentView('cabinet')}
      />
    );
  }

  // Brand form
  if (currentView === 'brand-form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => setCurrentView('brands')} showBackButton />
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Create Brand Profile</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tell us about your brand and requirements to find the perfect 3PL partners that match your specific needs.
            </p>
          </div>

          <BrandFormProvider>
            <BrandFormContainer onSuccess={handleBrandFormSuccess} />
          </BrandFormProvider>
        </main>
      </div>
    );
  }

  // Warehouse dashboard for 3PL users
  if (currentView === 'warehouses') {
    return (
      <WarehouseDashboard 
        onAddWarehouse={handleAddWarehouse}
        onBack={() => setCurrentView('cabinet')}
      />
    );
  }

  // 3PL Partner form
  if (currentView === '3pl-form') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onBack={() => setCurrentView('warehouses')} showBackButton />
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Add New Warehouse</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete this form to add your warehouse to our network and connect with brands looking for fulfillment partners.
            </p>
          </div>

          <FormProvider>
            <FormContainer onSuccess={handleFormSuccess} />
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