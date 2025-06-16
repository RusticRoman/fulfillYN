import React, { useState } from 'react';
import { Plus, Building, MapPin, Package, Edit, Trash2, ArrowRight, Search, Filter } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Brand {
  id: string;
  brandName: string;
  industry: string;
  monthlyVolume: number;
  productTypes: string[];
  preferredLocations: string[];
  requirements: {
    temperatureControlled: boolean;
    hazmatSupport: boolean;
    fbaPrep: boolean;
    returnsHandling: boolean;
    kitting: boolean;
    subscriptionFulfillment: boolean;
    sameDayShipping: boolean;
    b2bSupport: boolean;
  };
  status: 'active' | 'pending' | 'inactive';
  createdAt: string;
}

interface BrandDashboardProps {
  onAddBrand: () => void;
  onBack: () => void;
}

const BrandDashboard: React.FC<BrandDashboardProps> = ({ onAddBrand, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in real app this would come from API
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: '1',
      brandName: 'EcoBeauty Co.',
      industry: 'Beauty & Wellness',
      monthlyVolume: 2500,
      productTypes: ['Skincare', 'Cosmetics'],
      preferredLocations: ['West Coast', 'East Coast'],
      requirements: {
        temperatureControlled: true,
        hazmatSupport: false,
        fbaPrep: true,
        returnsHandling: true,
        kitting: true,
        subscriptionFulfillment: true,
        sameDayShipping: false,
        b2bSupport: false,
      },
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      brandName: 'TechGear Pro',
      industry: 'Electronics',
      monthlyVolume: 1800,
      productTypes: ['Electronics', 'Accessories'],
      preferredLocations: ['Midwest', 'South'],
      requirements: {
        temperatureControlled: false,
        hazmatSupport: false,
        fbaPrep: true,
        returnsHandling: true,
        kitting: false,
        subscriptionFulfillment: false,
        sameDayShipping: true,
        b2bSupport: true,
      },
      status: 'active',
      createdAt: '2024-02-20'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteBrand = (id: string) => {
    setBrands(prev => prev.filter(brand => brand.id !== id));
  };

  const filteredBrands = brands.filter(brand =>
    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-2 transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">My Brands</h1>
              <p className="text-gray-600">Manage your brand profiles and 3PL matching criteria</p>
            </div>
            <Button onClick={onAddBrand} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {brands.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by adding your first brand profile. This will help you find the perfect 3PL partners that match your specific requirements.
            </p>
            <Button onClick={onAddBrand} size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Brand
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Brand Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <Card key={brand.id} className="hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Building className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{brand.brandName}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.status)}`}>
                          {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteBrand(brand.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{brand.industry}</span>
                    </div>

                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{brand.monthlyVolume.toLocaleString()} units/month</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Product Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {brand.productTypes.map((type, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Preferred Locations:</p>
                      <div className="flex flex-wrap gap-1">
                        {brand.preferredLocations.map((location, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(brand.requirements)
                          .filter(([_, value]) => value)
                          .slice(0, 3)
                          .map(([key, _], index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                            >
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                          ))}
                        {Object.values(brand.requirements).filter(Boolean).length > 3 && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            +{Object.values(brand.requirements).filter(Boolean).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="w-full">
                      Find Matching 3PLs
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Add Brand Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors cursor-pointer" onClick={onAddBrand}>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Brand</h3>
                  <p className="text-sm text-gray-600">
                    Create a new brand profile to find matching 3PL partners
                  </p>
                </div>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Brands</p>
                    <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Volume</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {brands.reduce((sum, b) => sum + b.monthlyVolume, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {brands.filter(b => b.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {brands.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandDashboard;