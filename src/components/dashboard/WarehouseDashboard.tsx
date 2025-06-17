import React, { useState } from 'react';
import { Plus, Building2, MapPin, Package, Edit, Trash2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Warehouse {
  id: string;
  name: string;
  address: string;
  squareFootage: number;
  capabilities: string[];
  status: 'active' | 'pending' | 'inactive';
}

interface WarehouseDashboardProps {
  onAddWarehouse: () => void;
  onBack: () => void;
}

const WarehouseDashboard: React.FC<WarehouseDashboardProps> = ({ onAddWarehouse, onBack }) => {
  // Mock data - in real app this would come from API
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: '1',
      name: 'Main Distribution Center',
      address: '123 Logistics Ave, Los Angeles, CA 90210',
      squareFootage: 150000,
      capabilities: ['DTC', 'B2B', 'Cold Storage'],
      status: 'active'
    },
    {
      id: '2',
      name: 'East Coast Hub',
      address: '456 Fulfillment St, Atlanta, GA 30309',
      squareFootage: 85000,
      capabilities: ['DTC', 'FBA Prep'],
      status: 'active'
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

  const formatSquareFootage = (sqft: number) => {
    return sqft.toLocaleString() + ' sq ft';
  };

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
              <h1 className="text-2xl font-bold text-gray-900">My Warehouses</h1>
              <p className="text-gray-600">Manage your warehouse locations and capabilities</p>
            </div>
            <Button onClick={onAddWarehouse} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Warehouse
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {warehouses.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No warehouses yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by adding your first warehouse location. This will help brands find and connect with your services.
            </p>
            <Button onClick={onAddWarehouse} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Warehouse
            </Button>
          </div>
        ) : (
          // Warehouse Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id} className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{warehouse.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warehouse.status)}`}>
                        {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{warehouse.address}</span>
                  </div>

                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{formatSquareFootage(warehouse.squareFootage)}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Capabilities:</p>
                    <div className="flex flex-wrap gap-1">
                      {warehouse.capabilities.map((capability, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}

            {/* Add Warehouse Card */}
            <div 
              onClick={onAddWarehouse}
              className="bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer rounded-lg p-6 group transform hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mb-4 transition-colors">
                  <Plus className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-700 mb-2 transition-colors">Add New Warehouse</h3>
                <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  Expand your network by adding another warehouse location
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {warehouses.length > 0 && (
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Warehouses</p>
                  <p className="text-2xl font-bold text-gray-900">{warehouses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Space</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatSquareFootage(warehouses.reduce((sum, w) => sum + w.squareFootage, 0))}
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
                    {warehouses.filter(w => w.status === 'active').length}
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
                    {warehouses.filter(w => w.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WarehouseDashboard;