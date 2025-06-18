import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Shield, Star, MapPin, Phone, Clock, MessageCircle, Package, Award, Users, Mail, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import OptimizedProductCard from '../components/OptimizedProductCard';
import RealChatBox from '../components/RealChatBox';

interface VendorData {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  location?: string;
  accountType?: string;
  verificationStatus?: string;
  rating?: string;
  profilePictureUrl?: string;
  createdAt?: string;
}

interface VendorApplication {
  id: number;
  userId: number;
  fullName: string;
  phone: string;
  location: string;
  shopType: string;
  businessName: string;
  businessAddress?: string;
  businessDescription?: string;
  status: string;
  verifiedAt?: string;
}

export default function VendorProfile() {
  const { vendorId } = useParams();
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);

  // Fetch vendor user data
  const { data: vendor, isLoading: vendorLoading } = useQuery<VendorData>({
    queryKey: ['/api/users', vendorId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${vendorId}`);
      if (!response.ok) throw new Error('Failed to fetch vendor');
      return response.json();
    },
    enabled: !!vendorId
  });

  // Fetch vendor application data
  const { data: vendorApp } = useQuery<VendorApplication | null>({
    queryKey: ['/api/vendor/application', vendorId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/vendor/application/${vendorId}`);
        if (!response.ok) return null;
        return response.json();
      } catch (error) {
        return null;
      }
    },
    enabled: !!vendorId
  });

  // Fetch vendor's products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products/vendor', vendorId],
    queryFn: async () => {
      const response = await fetch(`/api/products/vendor/${vendorId}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
    enabled: !!vendorId
  });

  if (vendorLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendor profile...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Vendor Not Found</h1>
          <p className="text-gray-600 mb-4">The vendor profile you're looking for doesn't exist.</p>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const displayName = vendorApp?.fullName || vendor.username;
  const businessName = vendorApp?.businessName || `${displayName}'s Store`;
  const isVerified = vendor.verificationStatus === 'verified' || vendorApp?.status === 'verified';
  const rating = parseFloat(vendor.rating || '0');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Vendor Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              {vendor.profilePictureUrl ? (
                <img 
                  src={vendor.profilePictureUrl} 
                  alt={displayName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/20">
                  <span className="text-3xl font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              {isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{businessName}</h1>
                {isVerified && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-lg text-blue-100 mb-2">by {displayName}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                {vendor.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {vendor.location}
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(vendor.createdAt || '').toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </div>
                
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {products.length} Products
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-sm text-blue-100">Rating</span>
              </div>
              
              {user && user.id !== vendor.id && (
                <button
                  onClick={() => setShowChat(true)}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Vendor
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{products.length}</div>
              <div className="text-sm text-gray-600">Products Listed</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{rating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {vendor.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {vendorApp?.shopType || 'Online'}
              </div>
              <div className="text-sm text-gray-600">Shop Type</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      {vendorApp?.businessDescription && (
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">About This Business</h2>
            <p className="text-gray-600 leading-relaxed">{vendorApp.businessDescription}</p>
            
            {vendorApp.businessAddress && (
              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{vendorApp.businessAddress}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Products by {displayName}</h2>
          <span className="text-gray-600">{products.length} products</span>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Listed</h3>
            <p className="text-gray-600">This vendor hasn't listed any products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any, index: number) => (
              <OptimizedProductCard
                key={product.id}
                product={product}
                priority={index < 4}
                onProductClick={(id) => window.location.href = `/product/${id}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Chat Component */}
      {showChat && user && vendor && (
        <RealChatBox
          vendorName={displayName}
          vendorId={vendor.id}
          buyerName={user.username}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}