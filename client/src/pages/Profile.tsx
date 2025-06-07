import { useState } from 'react';
import { Heart, Eye, MessageCircle, Share2, Star, Settings, User, MapPin, Calendar, Phone, Mail, Grid3X3, Bookmark, UserCheck, Plus, TrendingUp, Package, DollarSign, Award, Clock, CheckCircle, XCircle, Shield, X, Save } from 'lucide-react';
import { currentUser } from '../data/demoData';
import { useAuth } from '../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface VendorApplication {
  id: number;
  status: string;
  submittedAt: string;
  verifiedAt?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(currentUser.accountType === 'premium');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  const profileUser = user || currentUser;
  const isPremium = isPremiumUser;

  // Initialize edit form with current user data
  const openEditModal = () => {
    setEditForm({
      username: profileUser.username || '',
      email: profileUser.email || '',
      phone: (profileUser as any).phone || '',
      location: (profileUser as any).location || '',
      bio: (profileUser as any).bio || ''
    });
    setShowEditModal(true);
  };

  // Mutation for updating user profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: any) => {
      const response = await fetch(`/api/users/${profileUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      setShowEditModal(false);
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="w-5 h-5 rounded-full bg-white bg-opacity-30 flex items-center justify-center">✓</div>
          <span class="font-medium">Profile Updated Successfully</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(editForm);
  };

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
      <div className="px-4 py-4">
        {/* Top Row - Profile pic, name, edit button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              alt={(profileUser as any).name || profileUser.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{(profileUser as any).name || profileUser.username}</h1>
              <div className="flex items-center gap-2 mt-1">
                {getVerificationBadge()}
              </div>
            </div>
          </div>
          <button 
            onClick={openEditModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900">{currentUser.listingsPosted}</span>
            <span className="text-gray-600 block text-xs">Posts</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900">{currentUser.followers}</span>
            <span className="text-gray-600 block text-xs">Followers</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900">{currentUser.following}</span>
            <span className="text-gray-600 block text-xs">Following</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-gray-900">{vendorStats?.totalSales || 0}</span>
            <span className="text-gray-600 block text-xs">Sales</span>
          </div>
        </div>

        {/* Trust Score Box */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="text-green-600" size={18} />
                <span className="font-semibold text-gray-900">Trust Score</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{currentUser.trustCount}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Rating</div>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-current" size={16} />
                <span className="font-semibold">{vendorStats?.averageRating || currentUser.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm mb-2">{currentUser.bio}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {currentUser.location}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {currentUser.phone}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="/add-listing"
              className="bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition text-center"
            >
              Add Listing
            </a>
            {!vendorApplication && (
              <a
                href="/vendor-register"
                className="bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition text-center"
              >
                Get Verified
              </a>
            )}
          </div>
          
          {!isPremium ? (
            <button
              onClick={() => setShowUpgrade(true)}
              className="relative w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 py-3 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-yellow-300 overflow-hidden group"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              {/* Background pulse animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center">
                <span className="group-hover:text-yellow-900 transition-colors duration-300">Upgrade to Premium</span>
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-75 blur-sm transform scale-110 transition-all duration-300"></div>
            </button>
          ) : (
            <div className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border border-purple-400">
              <CheckCircle size={16} />
              <span>ProList Premium</span>
            </div>
          )}
        </div>

        {/* My Businesses Section */}
        {vendorApplication && vendorApplication.businessName && (
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">My Businesses</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">{vendorApplication.businessName}</div>
                <div className="text-xs text-gray-600">{vendorApplication.businessAddress || 'Business Location'}</div>
              </div>
              <div className="flex items-center gap-1">
                {vendorApplication.status === 'Approved' ? (
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">Active</div>
                ) : vendorApplication.status === 'Pending' ? (
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">Pending</div>
                ) : (
                  <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">Inactive</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Revenue Summary */}
        {vendorStats && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600">Total Revenue</div>
                <div className="text-lg font-bold text-green-600">{vendorStats.totalRevenue?.toLocaleString() || 0} CFA</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">Active Products</div>
                <div className="text-lg font-bold text-blue-600">{userProducts.length}</div>
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
            className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
              activeTab === "overview"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500'
            }`}
          >
            <Grid3X3 size={14} className="mx-auto mb-1" />
            POSTS
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
              activeTab === "products"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500'
            }`}
          >
            <Package size={14} className="mx-auto mb-1" />
            PRODUCTS
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
              activeTab === "activity"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500'
            }`}
          >
            <TrendingUp size={14} className="mx-auto mb-1" />
            ACTIVITY
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-2 text-center text-xs font-medium transition-colors ${
              activeTab === "reviews"
                ? 'text-blue-600 border-t-2 border-blue-600 bg-blue-50'
                : 'text-gray-500'
            }`}
          >
            <Star size={14} className="mx-auto mb-1" />
            REVIEWS
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-3">
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center rounded">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-3">
                    <div className="flex items-center gap-1">
                      <Heart size={16} fill="white" />
                      <span className="text-sm font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} fill="white" />
                      <span className="text-sm font-semibold">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-3">
            {userProducts.length > 0 ? (
              userProducts.map((product: any) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-3 flex gap-3">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{product.title}</h3>
                    <p className="text-green-600 font-bold text-sm">{parseInt(product.price).toLocaleString()} CFA</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Views: {product.viewCount || 0}</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-semibold mb-1">No products yet</p>
                <p className="text-gray-600 text-xs mb-3">Start selling by adding your first product</p>
                <a
                  href="/add-listing"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                >
                  Add Product
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Platform Activity</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{currentUser.listingsPosted}</div>
                  <div className="text-xs text-gray-600">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{currentUser.realEstatePosted}</div>
                  <div className="text-xs text-gray-600">Real Estate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{currentUser.auctionsPosted}</div>
                  <div className="text-xs text-gray-600">Auctions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center py-8">
            <Star size={32} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-semibold mb-1">No reviews yet</p>
            <p className="text-gray-600 text-xs">Customer reviews will appear here</p>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
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
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Enhanced customer support</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-600" />
                <span>Exclusive marketplace features</span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm font-semibold mb-1">Special Offer!</p>
              <p className="text-green-700 text-sm">Get 1 month FREE because ProList cares about our community.</p>
            </div>
            <button 
              onClick={() => {
                setShowUpgrade(false);
                setShowCongrats(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Claim Free Month
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

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-6">You'll enjoy one month free because ProList cares.</p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <p className="text-purple-800 font-semibold text-sm">Welcome to ProList Premium!</p>
              <p className="text-purple-700 text-sm mt-1">Your premium features are now active.</p>
            </div>
            <button 
              onClick={() => {
                setShowCongrats(false);
                setIsPremiumUser(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-20 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={updateProfileMutation.isPending}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}