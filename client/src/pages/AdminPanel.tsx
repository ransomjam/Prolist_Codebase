import { useState } from 'react';
import { 
  Shield, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  FileText, 
  Settings, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  UserCheck,
  CreditCard
} from 'lucide-react';

type AdminSection = 
  | 'overview' 
  | 'vendor-verification' 
  | 'escrow-management' 
  | 'user-management' 
  | 'product-management'
  | 'order-management'
  | 'analytics'
  | 'settings';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  const adminSections = [
    {
      id: 'overview' as AdminSection,
      title: 'Dashboard Overview',
      icon: BarChart3,
      description: 'Platform statistics and quick insights',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'vendor-verification' as AdminSection,
      title: 'Vendor Verification',
      icon: UserCheck,
      description: 'Review and approve vendor applications',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'escrow-management' as AdminSection,
      title: 'Escrow Management',
      icon: CreditCard,
      description: 'Manage payments and escrow transactions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'user-management' as AdminSection,
      title: 'User Management',
      icon: Users,
      description: 'Manage user accounts and permissions',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'product-management' as AdminSection,
      title: 'Product Management',
      icon: Package,
      description: 'Monitor and moderate product listings',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'order-management' as AdminSection,
      title: 'Order Management',
      icon: ShoppingCart,
      description: 'Track and manage all platform orders',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'analytics' as AdminSection,
      title: 'Analytics & Reports',
      icon: BarChart3,
      description: 'Detailed analytics and reporting tools',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'settings' as AdminSection,
      title: 'Platform Settings',
      icon: Settings,
      description: 'Configure platform settings and policies',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Verifications</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Escrow Transactions</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">1,923</p>
            </div>
            <Package className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New vendor application approved</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Escrow payment released</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Product flagged for review</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveSection('vendor-verification')}
              className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
            >
              <UserCheck className="w-5 h-5 text-green-600 mb-2" />
              <p className="text-sm font-medium text-green-900">Review Applications</p>
            </button>
            <button 
              onClick={() => setActiveSection('escrow-management')}
              className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
            >
              <CreditCard className="w-5 h-5 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-purple-900">Manage Escrow</p>
            </button>
            <button 
              onClick={() => setActiveSection('user-management')}
              className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors"
            >
              <Users className="w-5 h-5 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-orange-900">User Management</p>
            </button>
            <button 
              onClick={() => setActiveSection('analytics')}
              className="p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg text-left transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-indigo-900">View Analytics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVendorVerification = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <UserCheck className="text-green-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Vendor Verification Management</h2>
      </div>
      <div className="space-y-4">
        <button 
          onClick={() => window.location.href = '/admin-verify'}
          className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-left transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-900">Review Applications</h3>
              <p className="text-sm text-green-700">Review and approve vendor verification requests</p>
            </div>
            <Eye className="w-5 h-5 text-green-600" />
          </div>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900">Pending</h4>
            <p className="text-2xl font-bold text-yellow-800">12</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900">Approved</h4>
            <p className="text-2xl font-bold text-green-800">89</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900">Rejected</h4>
            <p className="text-2xl font-bold text-red-800">7</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEscrowManagement = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="text-purple-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Escrow Management</h2>
      </div>
      <div className="space-y-4">
        <button 
          onClick={() => window.location.href = '/admin-escrow'}
          className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-left transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-900">Manage Escrow Transactions</h3>
              <p className="text-sm text-purple-700">Review and release escrow payments</p>
            </div>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900">Pending Release</h4>
            <p className="text-2xl font-bold text-blue-800">23</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900">Released</h4>
            <p className="text-2xl font-bold text-green-800">156</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900">Disputed</h4>
            <p className="text-2xl font-bold text-orange-800">3</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'vendor-verification':
        return renderVendorVerification();
      case 'escrow-management':
        return renderEscrowManagement();
      case 'user-management':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-orange-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            </div>
            <p className="text-gray-600 mb-4">Manage user accounts, permissions, and platform access.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Total Users: 2,847</h3>
                <p className="text-sm text-gray-600">Active users across all account types</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">Verified Vendors: 89</h3>
                <p className="text-sm text-gray-600">Successfully verified business accounts</p>
              </div>
            </div>
          </div>
        );
      case 'product-management':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-teal-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
            </div>
            <p className="text-gray-600">Monitor and moderate product listings across the platform.</p>
          </div>
        );
      case 'order-management':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart className="text-red-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Order Management</h2>
            </div>
            <p className="text-gray-600">Track and manage all platform orders and transactions.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-indigo-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Analytics & Reports</h2>
            </div>
            <p className="text-gray-600">Detailed analytics and reporting tools for platform insights.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-gray-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Platform Settings</h2>
            </div>
            <p className="text-gray-600">Configure platform settings, policies, and system preferences.</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">ProList Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Sections</h2>
              <nav className="space-y-2">
                {adminSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent size={20} />
                      <div className="text-left">
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs opacity-75">{section.description}</p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}