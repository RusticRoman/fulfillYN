import React, { useState } from 'react';
import { Menu, X, ArrowLeft, Truck } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  onGetStartedClick?: () => void;
  onLoginClick?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGetStartedClick, onLoginClick, onBack, showBackButton }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FulfillYN</span>
            </div>
          </div>

          {!showBackButton && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                  How It Works
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Pricing
                </a>
              </nav>

              {/* Desktop CTA - Only Login button */}
              <div className="hidden md:flex items-center">
                <Button variant="outline" onClick={onLoginClick}>Log In</Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !showBackButton && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <div className="border-t border-gray-200 pt-4">
                <Button variant="outline" className="w-full" onClick={onLoginClick}>Log In</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;