import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Building2, 
  Search, 
  Filter, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Eye,
  ArrowRight,
  BarChart3,
  Settings,
  LogOut,
  Heart,
  Star,
  TrendingUp,
  MapPin,
  Package,
  Zap,
  MessageCircle
} from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

interface Brand {
  id: string;
  name: string;
  email: string;
  industry: string;
  monthlyVolume: number;
  requirements: {
    temperatureControlled: boolean;
    hazmatSupport: boolean;
    fbaPrep: boolean;
    b2bSupport: boolean;
    sameDayShipping: boolean;
    realTimeTracking: boolean;
  };
  preferredLocations: string[];
  budgetRange: string;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
}

interface ThreePL {
  id: string;
  companyName: string;
  email: string;
  location: string;
  warehouses: number;
  capabilities: {
    temperatureControlled: boolean;
    hazmatSupport: boolean;
    fbaPrep: boolean;
    b2bSupport: boolean;
    sameDayShipping: boolean;
    realTimeTracking: boolean;
  };
  minimumVolume: number;
  certified: boolean;
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
}

interface PotentialMatch {
  id: string;
  brand: Brand;
  threePL: ThreePL;
  matchScore: number;
  matchingCriteria: string[];
  missingCriteria: string[];
  locationMatch: boolean;
  volumeMatch: boolean;
  status: 'new' | 'contacted' | 'in_discussion' | 'matched' | 'rejected';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onLogout }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'brands' | '3pls' | 'matches'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const [brands] = useState<Brand[]>([
    {
      id: '1',
      name: 'EcoBeauty',
      email: 'sarah@ecobeauty.com',
      industry: 'Beauty & Wellness',
      monthlyVolume: 2500,
      requirements: {
        temperatureControlled: true,
        hazmatSupport: false,
        fbaPrep: true,
        b2bSupport: false,
        sameDayShipping: false,
        realTimeTracking: true,
      },
      preferredLocations: ['West Coast', 'East Coast'],
      budgetRange: '$5,000 - $15,000/month',
      status: 'active',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'TechGear Pro',
      email: 'marcus@techgearpro.com',
      industry: 'Electronics',
      monthlyVolume: 1800,
      requirements: {
        temperatureControlled: false,
        hazmatSupport: false,
        fbaPrep: true,
        b2bSupport: true,
        sameDayShipping: true,
        realTimeTracking: true,
      },
      preferredLocations: ['Midwest', 'South'],
      budgetRange: '$15,000 - $50,000/month',
      status: 'active',
      joinedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'FreshFoods',
      email: 'emily@freshfoods.com',
      industry: 'Food & Beverage',
      monthlyVolume: 3200,
      requirements: {
        temperatureControlled: true,
        hazmatSupport: false,
        fbaPrep: false,
        b2bSupport: true,
        sameDayShipping: false,
        realTimeTracking: true,
      },
      preferredLocations: ['Midwest', 'East Coast'],
      budgetRange: '$50,000 - $100,000/month',
      status: 'pending',
      joinedDate: '2024-03-10'
    }
  ]);

  const [threePLs, setThreePLs] = useState<ThreePL[]>([
    {
      id: '1',
      companyName: 'LogiFlow Solutions',
      email: 'contact@logiflow.com',
      location: 'Los Angeles, CA',
      warehouses: 3,
      capabilities: {
        temperatureControlled: true,
        hazmatSupport: false,
        fbaPrep: true,
        b2bSupport: true,
        sameDayShipping: false,
        realTimeTracking: true,
      },
      minimumVolume: 1000,
      certified: true,
      status: 'active',
      joinedDate: '2023-11-20'
    },
    {
      id: '2',
      companyName: 'FastTrack Fulfillment',
      email: 'info@fasttrack.com',
      location: 'Atlanta, GA',
      warehouses: 2,
      capabilities: {
        temperatureControlled: false,
        hazmatSupport: false,
        fbaPrep: true,
        b2bSupport: true,
        sameDayShipping: true,
        realTimeTracking: true,
      },
      minimumVolume: 500,
      certified: false,
      status: 'pending',
      joinedDate: '2024-01-05'
    },
    {
      id: '3',
      companyName: 'Prime Logistics',
      email: 'hello@primelogistics.com',
      location: 'Chicago, IL',
      warehouses: 5,
      capabilities: {
        temperatureControlled: true,
        hazmatSupport: true,
        fbaPrep: true,
        b2bSupport: true,
        sameDayShipping: false,
        realTimeTracking: true,
      },
      minimumVolume: 2000,
      certified: true,
      status: 'active',
      joinedDate: '2023-09-15'
    }
  ]);

  // Generate potential matches
  const generateMatches = (): PotentialMatch[] => {
    const matches: PotentialMatch[] = [];
    
    brands.forEach(brand => {
      threePLs.forEach(threePL => {
        const matchingCriteria: string[] = [];
        const missingCriteria: string[] = [];
        
        // Check capability matches
        Object.entries(brand.requirements).forEach(([key, required]) => {
          if (required) {
            const capability = threePL.capabilities[key as keyof typeof threePL.capabilities];
            if (capability) {
              matchingCriteria.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
            } else {
              missingCriteria.push(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
            }
          }
        });

        // Check volume compatibility
        const volumeMatch = brand.monthlyVolume >= threePL.minimumVolume;
        if (volumeMatch) {
          matchingCriteria.push('Volume Requirements');
        } else {
          missingCriteria.push('Volume Requirements');
        }

        // Check location match (simplified)
        const locationMatch = brand.preferredLocations.some(loc => 
          threePL.location.toLowerCase().includes(loc.toLowerCase().split(' ')[0])
        );
        if (locationMatch) {
          matchingCriteria.push('Location Preference');
        }

        // Calculate match score
        const totalCriteria = Object.values(brand.requirements).filter(Boolean).length + 2; // +2 for volume and location
        const matchScore = Math.round((matchingCriteria.length / totalCriteria) * 100);

        // Only include matches with score > 40%
        if (matchScore > 40) {
          matches.push({
            id: `${brand.id}-${threePL.id}`,
            brand,
            threePL,
            matchScore,
            matchingCriteria,
            missingCriteria,
            locationMatch,
            volumeMatch,
            status: 'new'
          });
        }
      });
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  const potentialMatches = generateMatches();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const toggleCertification = (id: string) => {
    setThreePLs(prev => prev.map(threePL => 
      threePL.id === id 
        ? { ...threePL, certified: !threePL.certified }
        : threePL
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_discussion':
        return 'bg-purple-100 text-purple-800';
      case 'matched':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredThreePLs = threePLs.filter(threePL =>
    threePL.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    threePL.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMatches = potentialMatches.filter(match =>
    match.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.threePL.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-2 transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Dashboard
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600">Manage brands, 3PLs, and platform operations</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'brands'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Brands ({brands.length})
            </button>
            <button
              onClick={() => setActiveTab('3pls')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === '3pls'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              3PL Partners ({threePLs.length})
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matches'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Heart className="w-4 h-4 inline mr-2" />
              Potential Matches ({potentialMatches.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-5 gap-6">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Brands</p>
                    <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">3PL Partners</p>
                    <p className="text-2xl font-bold text-gray-900">{threePLs.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Certified 3PLs</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {threePLs.filter(p => p.certified).length}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Potential Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{potentialMatches.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {[...brands, ...threePLs].filter(item => item.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Top Matches Preview */}
            <Card title="Top Potential Matches" className="p-6">
              <div className="space-y-4">
                {potentialMatches.slice(0, 3).map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {match.brand.name} ↔ {match.threePL.companyName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {match.matchingCriteria.slice(0, 3).join(', ')}
                          {match.matchingCriteria.length > 3 && ` +${match.matchingCriteria.length - 3} more`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setActiveTab('matches')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab('matches')}
                >
                  View All Matches
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card title="Recent Activity" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">LogiFlow Solutions certified</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New brand registration: FreshFoods</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Building2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">FastTrack Fulfillment submitted application</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Matches Grid */}
            <div className="grid gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {match.brand.name} ↔ {match.threePL.companyName}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getMatchStatusColor(match.status)}`}>
                            {match.status.replace('_', ' ').toUpperCase()}
                          </span>
                          {match.locationMatch && (
                            <span className="inline-flex items-center text-xs text-green-600">
                              <MapPin className="w-3 h-3 mr-1" />
                              Location Match
                            </span>
                          )}
                          {match.volumeMatch && (
                            <span className="inline-flex items-center text-xs text-green-600">
                              <Package className="w-3 h-3 mr-1" />
                              Volume Compatible
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Brand Info */}
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Brand: {match.brand.name}
                      </h4>
                      <div className="space-y-2 text-sm text-purple-800">
                        <p><strong>Industry:</strong> {match.brand.industry}</p>
                        <p><strong>Monthly Volume:</strong> {match.brand.monthlyVolume.toLocaleString()} units</p>
                        <p><strong>Budget:</strong> {match.brand.budgetRange}</p>
                        <p><strong>Locations:</strong> {match.brand.preferredLocations.join(', ')}</p>
                      </div>
                    </div>

                    {/* 3PL Info */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        3PL: {match.threePL.companyName}
                      </h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <p><strong>Location:</strong> {match.threePL.location}</p>
                        <p><strong>Warehouses:</strong> {match.threePL.warehouses} locations</p>
                        <p><strong>Min. Volume:</strong> {match.threePL.minimumVolume.toLocaleString()} units/month</p>
                        <p><strong>Certified:</strong> {match.threePL.certified ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Matching Criteria */}
                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Matching Criteria ({match.matchingCriteria.length})
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {match.matchingCriteria.map((criteria, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md"
                          >
                            {criteria}
                          </span>
                        ))}
                      </div>
                    </div>

                    {match.missingCriteria.length > 0 && (
                      <div>
                        <h5 className="font-medium text-orange-700 mb-2 flex items-center">
                          <XCircle className="w-4 h-4 mr-2" />
                          Missing Criteria ({match.missingCriteria.length})
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {match.missingCriteria.map((criteria, index) => (
                            <span
                              key={index}
                              className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-md"
                            >
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {filteredMatches.length === 0 && (
                <Card className="p-12 text-center">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No potential matches available at this time.'}
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}

        {(activeTab === 'brands' || activeTab === '3pls') && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'brands' ? 'brands' : '3PL partners'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Data Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === 'brands' ? 'Brand' : 'Company'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === 'brands' ? 'Industry' : 'Location'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab === 'brands' ? 'Monthly Volume' : 'Warehouses'}
                      </th>
                      {activeTab === '3pls' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Certified
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeTab === 'brands' && filteredBrands.map((brand) => (
                      <tr key={brand.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                            <div className="text-sm text-gray-500">{brand.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {brand.industry}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {brand.monthlyVolume.toLocaleString()} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(brand.status)}`}>
                            {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}

                    {activeTab === '3pls' && filteredThreePLs.map((threePL) => (
                      <tr key={threePL.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{threePL.companyName}</div>
                            <div className="text-sm text-gray-500">{threePL.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {threePL.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {threePL.warehouses} locations
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleCertification(threePL.id)}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              threePL.certified
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                          >
                            {threePL.certified ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Certified
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" />
                                Not Certified
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(threePL.status)}`}>
                            {threePL.status.charAt(0).toUpperCase() + threePL.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;