import { useState } from 'react';
import { Heart, Eye, MessageCircle, Share2, Star, Settings, User, MapPin, Calendar, Phone, Mail, Grid3X3, Bookmark, UserCheck, Plus, TrendingUp, Package, DollarSign, Award, Clock, CheckCircle, XCircle, Shield } from 'lucide-react';
import { currentUser } from '../data/demoData';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

interface VendorApplication {
  id: number;
  status: string;
  submittedAt: string;
  verifiedAt?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const profileUser = user || currentUser;
  const isPremium = currentUser.accountType === 'premium';

  // Fetch user's vendor application status
  const { data: vendorApplication } = useQuery({
    queryKey: ['/api/vendor/application', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/vendor/application/${user.id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch application');
      }
      return response.json();
    },
    enabled: !!user?.id
  });

  // Fetch vendor stats
  const { data: vendorStats } = useQuery({
    queryKey: ['/api/vendor/stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/vendor/stats/${user.id}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!user?.id
  });

  // Fetch user's products
  const { data: userProducts = [] } = useQuery({
    queryKey: ['/api/products/vendor', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/products/vendor/${user.id}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id
  });

  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 45,
      comments: 8
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 67,
      comments: 12
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 32,
      comments: 5
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 89,
      comments: 15
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 156,
      comments: 24
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      likes: 78,
      comments: 9
    }
  ];

  const getVerificationBadge = () => {
    if (!vendorApplication) {
      return (
        <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
          <Shield size={16} />
          <span className="text-sm font-medium">Not Verified</span>
        </div>
      );
    }

    switch (vendorApplication.status) {
      case 'Basic Verified':
        return (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
            <CheckCircle size={16} />
            <span className="text-sm font-medium">Basic Verified</span>
          </div>
        );
      case 'Rejected':
        return (
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
            <XCircle size={16} />
            <span className="text-sm font-medium">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
            <Clock size={16} />
            <span className="text-sm font-medium">Pending Review</span>
          </div>
        );
    }
  };

  const getNotificationMessage = () => {
    if (!vendorApplication) return null;

    if (vendorApplication.status === 'Basic Verified') {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-900">Congratulations! Your application was approved</h3>
              <p className="text-green-700 text-sm">You now have Basic Verified status and can start listing products on ProList.</p>
              <p className="text-green-600 text-xs mt-1">
                Verified on: {new Date(vendorApplication.verifiedAt || vendorApplication.submittedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (vendorApplication.status === 'Rejected') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" size={24} />
            <div>
              <h3 className="font-semibold text-red-900">Application Not Approved</h3>
              <p className="text-red-700 text-sm">Your vendor application was rejected. Please review your documents and submit a new application.</p>
              <a href="/vendor-register" className="text-red-600 underline text-sm hover:text-red-800 mt-1 inline-block">
                Submit New Application
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Clock className="text-blue-600" size={24} />
          <div>
            <h3 className="font-semibold text-blue-900">Application Under Review</h3>
            <p className="text-blue-700 text-sm">Your vendor application is being reviewed by our team. You'll be notified once a decision is made.</p>
            <p className="text-blue-600 text-xs mt-1">
              Submitted on: {new Date(vendorApplication.submittedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      {/* Notification Messages */}
      {getNotificationMessage()}

      {/* Profile Header */}
      <div className="px-6 py-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
          {/* Profile Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={currentUser.avatar}
              alt={profileUser.name || profileUser.username}
              className="w-40 h-40 rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{profileUser.name || profileUser.username}</h1>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {getVerificationBadge()}
                {isPremium && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">Premium Member</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-6">
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">{currentUser.listingsPosted}</span>
                <span className="text-gray-600 block text-sm">Posts</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">{currentUser.followers}</span>
                <span className="text-gray-600 block text-sm">Followers</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">{currentUser.following}</span>
                <span className="text-gray-600 block text-sm">Following</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-gray-900">{currentUser.trustCount}</span>
                <span className="text-gray-600 block text-sm">Trust Score</span>
              </div>
            </div>

            {/* Bio & Contact */}
            <div className="text-gray-700 mb-6 max-w-2xl">
              <p className="font-medium mb-2">{currentUser.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {currentUser.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={16} />
                  {currentUser.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={16} />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined {currentUser.joinDate}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="/add-listing"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Add New Listing
              </a>
              <button className="border border-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">
                Edit Profile
              </button>
              {!vendorApplication && (
                <a
                  href="/vendor-register"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Get Verified
                </a>
              )}
              {!isPremium && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sales Performance */}
        {vendorStats && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Sales Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <DollarSign className="text-green-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">{vendorStats.totalRevenue?.toLocaleString() || 0}</div>
                <div className="text-sm text-gray-600">Total Revenue (CFA)</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Package className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">{vendorStats.totalSales || 0}</div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Star className="text-yellow-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">{vendorStats.averageRating || currentUser.rating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <Award className="text-purple-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-gray-900">{userProducts.length}</div>
                <div className="text-sm text-gray-600">Active Products</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-t border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid3X3 size={16} className="mx-auto mb-1" />
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-colors ${
              activeTab === "products"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Package size={16} className="mx-auto mb-1" />
            PRODUCTS
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-colors ${
              activeTab === "activity"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp size={16} className="mx-auto mb-1" />
            ACTIVITY
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-colors ${
              activeTab === "reviews"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Star size={16} className="mx-auto mb-1" />
            REVIEWS
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded-lg">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-4">
                    <div className="flex items-center gap-1">
                      <Heart size={20} fill="white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={20} fill="white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProducts.length > 0 ? (
              userProducts.map((product: any) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-lg font-bold text-green-600 mb-2">{parseInt(product.price).toLocaleString()} CFA</p>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Views: {product.viewCount || 0}</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Package size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-semibold mb-2">No products yet</p>
                <p className="text-gray-600 mb-4">Start selling by adding your first product</p>
                <a
                  href="/add-listing"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Add Product
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Platform Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentUser.listingsPosted}</div>
                  <div className="text-sm text-gray-600">Listings Posted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentUser.realEstatePosted}</div>
                  <div className="text-sm text-gray-600">Real Estate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{currentUser.auctionsPosted}</div>
                  <div className="text-sm text-gray-600">Auctions</div>
                </div>
              </div>
            </div>
            <div className="text-center py-8">
              <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600">Detailed activity history will appear here</p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center py-12">
            <Star size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-semibold mb-2">No reviews yet</p>
            <p className="text-gray-600">Customer reviews will appear here once you start selling</p>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-96 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Upgrade to Premium</h3>
            <p className="text-gray-600 mb-6">Unlock advanced features and boost your business visibility on ProList.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Priority product listing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Premium badge</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:from-purple-700 hover:to-pink-700 transition">
              Upgrade Now
            </button>
            <button 
              className="mt-3 text-gray-500 hover:text-gray-700 w-full text-center text-sm" 
              onClick={() => setShowUpgrade(false)}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}