import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  Heart, 
  Shield, 
  UserPlus, 
  MessageCircle, 
  User, 
  ShoppingCart, 
  Package,
  RefreshCw,
  Star,
  Eye,
  ArrowLeft,
  MapPin
} from 'lucide-react';

interface Product {
  id: number;
  vendorId: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  status: string;
  viewCount: number;
  salesCount: number;
  createdAt: string;
}

interface VendorApplication {
  id: number;
  userId: number;
  fullName: string;
  phone: string;
  location: string;
  status: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [saved, setSaved] = useState(false);
  const [trustCount, setTrustCount] = useState(32);
  const [followCount, setFollowCount] = useState(102);
  const [following, setFollowing] = useState(false);
  const [trusted, setTrusted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    }
  });

  // Fetch vendor info
  const { data: vendor } = useQuery({
    queryKey: ['/api/vendor/application', product?.vendorId],
    queryFn: async () => {
      if (!product?.vendorId) return null;
      const response = await fetch(`/api/vendor/application/${product.vendorId}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!product?.vendorId
  });

  // Fetch products from same vendor
  const { data: vendorProducts = [] } = useQuery({
    queryKey: ['/api/products/vendor', product?.vendorId],
    queryFn: async () => {
      if (!product?.vendorId) return [];
      const response = await fetch(`/api/products/vendor/${product.vendorId}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!product?.vendorId
  });

  // Fetch similar products by category
  const { data: allProducts = [] } = useQuery({
    queryKey: ['/api/products'],
  });

  const similarProducts = (allProducts as Product[]).filter((p: Product) => 
    p.category === product?.category && p.id !== parseInt(id!)
  ).slice(0, 3);

  const otherVendorProducts = vendorProducts.filter((p: Product) => p.id !== parseInt(id!)).slice(0, 3);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleTrust = () => {
    setTrusted(!trusted);
    setTrustCount(prev => trusted ? prev - 1 : prev + 1);
  };

  const handleFollow = () => {
    setFollowing(!following);
    setFollowCount(prev => following ? prev - 1 : prev + 1);
  };

  const handleChat = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      alert(`Message sent to ${vendor?.fullName}: "${chatMessage}"`);
      setChatMessage('');
      setShowChat(false);
    }
  };

  const handlePlaceOrder = () => {
    setLocation(`/checkout/${id}`);
  };

  if (productLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button 
          onClick={() => setLocation('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b px-4 py-3">
        <button 
          onClick={() => setLocation('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid lg:grid-cols-2 gap-8">
        {/* Left Column - Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Package className="w-24 h-24 text-gray-400" />
            </div>
          </div>
          
          {/* Thumbnail images placeholder */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          {/* Title and Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <button
                onClick={handleSave}
                className={`p-2 rounded-full transition-all ${
                  saved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:scale-110`}
              >
                <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="text-3xl font-bold text-green-600">
                {parseInt(product.price).toLocaleString()} XAF
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleTrust}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    trusted 
                      ? 'bg-blue-100 text-blue-700 shadow-lg shadow-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Shield size={16} />
                  Trust ({trustCount})
                </button>
                <button
                  onClick={handleFollow}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    following 
                      ? 'bg-green-100 text-green-700 shadow-lg shadow-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <UserPlus size={16} />
                  Follow ({followCount})
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>{product.location}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{product.viewCount} views</span>
                </div>
                <div>
                  Posted {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Vendor Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{vendor?.fullName || 'Vendor'}</h4>
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-600" size={16} />
                    <span className="text-sm text-green-600 font-medium">
                      {vendor?.status || 'Basic Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>Trusts: <span className="font-semibold">{trustCount}</span></div>
              <div>Followers: <span className="font-semibold">{followCount}</span></div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleChat}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle size={16} />
                Chat Vendor
              </button>
              
              <button
                onClick={() => setLocation(`/vendor/${vendor?.fullName.toLowerCase().replace(' ', '_')}`)}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User size={16} />
                View Profile
              </button>
              
              <button
                onClick={handlePlaceOrder}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                <ShoppingCart size={16} />
                Place Order
              </button>
            </div>
          </div>

          {/* Chat Box */}
          {showChat && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                Chat with {vendor?.fullName}
              </h4>
              <div className="space-y-3">
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* More from this Vendor */}
      {otherVendorProducts.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={24} />
              More from this Vendor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherVendorProducts.map((item: Product) => (
                <div
                  key={item.id}
                  onClick={() => setLocation(`/product/${item.id}`)}
                  className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h4>
                  <p className="text-green-600 font-bold text-sm">
                    {parseInt(item.price).toLocaleString()} XAF
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Similar Listings */}
      {similarProducts.length > 0 && (
        <div className="max-w-6xl mx-auto p-4 mt-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <RefreshCw size={24} />
              Similar Listings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarProducts.map((item: Product) => (
                <div
                  key={item.id}
                  onClick={() => setLocation(`/product/${item.id}`)}
                  className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h4>
                  <p className="text-green-600 font-bold text-sm">
                    {parseInt(item.price).toLocaleString()} XAF
                  </p>
                  <p className="text-gray-500 text-xs capitalize">{item.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}