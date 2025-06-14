import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import OptimizedImage from '../components/OptimizedImage';
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
import ShareButton from '@/components/ShareButton';
import VendorSalesStats from '@/components/VendorSalesStats';
import ChatBox from '@/components/ChatBox';


interface Product {
  id: number;
  vendorId: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  status?: string;
  viewCount: number;
  salesCount?: number;
  createdAt: string;
  imageUrls?: string[];
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
  const [orderInProgress, setOrderInProgress] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  // Fetch database products with optimization
  const { data: dbProducts = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) return [];
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  // Use only authentic database products
  const product = dbProducts.find((p: any) => p.id === parseInt(id!));
  const productLoading = false;

  // Get product images array, fallback to empty array if none
  const productImages = product?.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [];
  const currentImage = productImages[selectedImageIndex];
  const hasImages = productImages.length > 0;

  // Fetch vendor info
  const { data: vendor } = useQuery({
    queryKey: ['/api/vendor/application', product?.vendorId],
    queryFn: async () => {
      if (!product?.vendorId) return null;
      
      const response = await fetch(`/api/vendor/application/${product.vendorId}`);
      if (!response.ok) {
        // If no vendor application found, try to get user info directly
        const userResponse = await fetch(`/api/users/${product.vendorId}`);
        if (userResponse.ok) {
          const user = await userResponse.json();
          return {
            id: user.id,
            userId: user.id,
            fullName: user.username.replace('_', ' ').replace(/\b\w/g, (letter: string) => letter.toUpperCase()),
            phone: user.phone || "+237 6XX XXX XXX",
            location: user.location || "Bamenda",
            status: user.verificationStatus === "basic_verified" ? "Basic Verified" : 
                   user.verificationStatus === "premium_verified" ? "Premium Verified" : "Pending"
          };
        }
        return null;
      }
      return response.json();
    },
    enabled: !!product?.vendorId
  });

  // Get similar products by category
  const similarProducts = dbProducts.filter((p: any) => 
    p.category === product?.category && p.id !== parseInt(id!)
  ).slice(0, 3);

  // Get other products from same vendor
  const otherVendorProducts = dbProducts.filter((p: any) => 
    p.vendorId === product?.vendorId && p.id !== parseInt(id!)
  ).slice(0, 3);

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

  const handlePlaceOrder = () => {
    setOrderInProgress(true);
    // Brief loading state before navigation
    setTimeout(() => {
      setLocation(`/checkout/${id}`);
      setOrderInProgress(false);
    }, 500);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Please Wait..</p>
        </div>
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
        {/* Left Column - Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              className="h-96 cursor-pointer relative group overflow-hidden rounded-xl"
              onClick={() => setShowImageModal(true)}
            >
              <OptimizedImage
                src={currentImage}
                alt={product.title}
                className="w-full h-full transition-transform group-hover:scale-105"
                priority={true}
                fallbackIcon={
                  <div className="flex flex-col items-center justify-center">
                    <Package className="w-24 h-24 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-sm">Click to view image</p>
                  </div>
                }
              />
              {/* Zoom overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2">
                  <Eye className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Thumbnail images */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((index) => (
              <div 
                key={index} 
                className={`h-20 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  selectedImageIndex === index 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-gray-100 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedImageIndex(index);
                  if (hasImages || index < productImages.length) {
                    setShowImageModal(true);
                  }
                }}
              >
                <OptimizedImage
                  src={productImages[index]}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full h-full"
                  priority={index === 0}
                  fallbackIcon={
                    <div className="flex flex-col items-center">
                      <Package className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400">{index + 1}</span>
                    </div>
                  }
                />
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
            
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold text-green-600">
                {parseInt(product.price).toLocaleString()} XAF
              </div>
              {product.isDemo && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  DEMO
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3 mb-6">
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

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleChat}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-lg font-medium ${
                  showChat 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                }`}
              >
                <MessageCircle size={18} />
                {showChat ? 'Close Chat' : 'Chat Vendor'}
              </button>
              
              <button
                onClick={handlePlaceOrder}
                disabled={orderInProgress}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-lg font-medium ${
                  orderInProgress 
                    ? 'bg-blue-600 text-white shadow-blue-200 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
                }`}
              >
                {orderInProgress ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Place Order
                  </>
                )}
              </button>
            </div>

            {/* Escrow Workflow Overview */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Secure Escrow Protection</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Your payment is protected through our trust-based escrow system:
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">1</div>
                  <span>Payment held in escrow → Vendor ships product</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">2</div>
                  <span>You receive item → Upload photo proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-900">3</div>
                  <span>Admin releases funds to vendor (72hr auto-release)</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Protection:</strong> Funds only released after delivery confirmation
                </p>
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-end mb-6">
              <ShareButton 
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  description: product.description
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Vendor Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={28} />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{vendor?.fullName || 'Vendor'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="text-green-600" size={16} />
                  <span className="text-sm text-green-600 font-medium">
                    {vendor?.status || 'Basic Verified'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trust and Follow Stats with Buttons */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{trustCount}</div>
                <div className="text-sm text-gray-600 mb-3">Trusts</div>
                <button
                  onClick={handleTrust}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    trusted 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <Shield size={16} className="inline mr-2" />
                  {trusted ? 'Trusted' : 'Trust'}
                </button>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{followCount}</div>
                <div className="text-sm text-gray-600 mb-3">Followers</div>
                <button
                  onClick={handleFollow}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    following 
                      ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <UserPlus size={16} className="inline mr-2" />
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>

            {/* Sales Statistics */}
            <VendorSalesStats 
              vendorId={product.vendorId} 
              className="mb-4"
            />

            {/* View Profile Button */}
            <button
              onClick={() => setLocation(`/vendor/${vendor?.fullName.toLowerCase().replace(' ', '_')}`)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <User size={18} />
              View Vendor Profile
            </button>
          </div>

          {/* Chat Component */}
          <ChatBox
            vendorName={vendor?.fullName || 'Vendor'}
            vendorId={product?.vendorId}
            productTitle={product?.title}
            buyerName="Buyer"
            isOpen={showChat}
            onClose={() => setShowChat(false)}
          />
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
                  <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {item.imageUrls && item.imageUrls.length > 0 ? (
                      <img 
                        src={item.imageUrls[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-gray-400" />
                    )}
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
                  <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {item.imageUrls && item.imageUrls.length > 0 ? (
                      <img 
                        src={item.imageUrls[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-gray-400" />
                    )}
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

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image container */}
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="flex items-center justify-center min-h-96">
                {hasImages && currentImage ? (
                  <img 
                    src={currentImage} 
                    alt={product.title}
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12">
                    <Package className="w-32 h-32 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h3>
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              
              {/* Image navigation */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${
                        selectedImageIndex === index 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {productImages[index] ? (
                        <img 
                          src={productImages[index]} 
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <Package className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="text-center mt-3">
                  <p className="text-sm text-gray-600">
                    Image {selectedImageIndex + 1} of 3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}