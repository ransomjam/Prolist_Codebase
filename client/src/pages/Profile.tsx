import { useState } from 'react';
import { Heart, Eye, MessageCircle, Share2, Star, Settings, User, MapPin, Calendar, Phone, Mail, Grid3X3, Bookmark, UserCheck, Plus, TrendingUp, Package, DollarSign, Award, Clock, CheckCircle, XCircle, Shield, X, Save } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState("posts");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProductSuccess, setShowProductSuccess] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  // Fetch user's products
  const { data: userProducts = [] } = useQuery({
    queryKey: ['/api/products/vendor', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/products/vendor/${user.id}`);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to fetch user products');
      }
      return response.json();
    },
    enabled: !!user?.id
  });

  // Fetch vendor application
  const { data: vendorApplication } = useQuery({
    queryKey: ['/api/vendor/application', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/vendor/application/${user.id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch vendor application');
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
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch vendor stats');
      }
      return response.json();
    },
    enabled: !!user?.id
  });

  // Mutation for updating user profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!user?.id) throw new Error('User not found');
      const response = await fetch(`/api/users/${user.id}`, {
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
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Profile updated successfully!
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  const profileUser = user;
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(editForm);
  };

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
    }
  ];

  const getVerificationBadge = () => {
    // Check if user is a verified vendor
    if (user?.accountType === 'vendor' && user?.verificationStatus === 'basic_verified') {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle size={14} />
          <span className="text-xs font-medium">✅ Verified Vendor</span>
        </div>
      );
    }

    if (!vendorApplication) {
      return (
        <div className="flex items-center gap-1 text-gray-500">
          <Clock size={14} />
          <span className="text-xs">Unverified</span>
        </div>
      );
    }

    switch (vendorApplication.status) {
      case 'Basic Verified':
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={14} />
            <span className="text-xs font-medium">✅ Verified Vendor</span>
          </div>
        );
      case 'Premium Verified':
        return (
          <div className="flex items-center gap-1 text-purple-600">
            <Shield size={14} />
            <span className="text-xs font-medium">Premium Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1 text-yellow-600">
            <Clock size={14} />
            <span className="text-xs font-medium">Pending Verification</span>
          </div>
        );
      case 'Rejected':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <XCircle size={14} />
            <span className="text-xs font-medium">Verification Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={14} />
            <span className="text-xs">Unverified</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg -mt-16 relative z-10 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profileUser.username.charAt(0).toUpperCase()}
              </div>
              {getVerificationBadge()}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{profileUser.username}</h1>
              <p className="text-gray-600">{profileUser.email}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {(profileUser as any).location || 'No location set'}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} />
                  {(profileUser as any).phone || 'No phone number'}
                </span>
              </div>
            </div>

            <button 
              onClick={openEditModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
             {/* Upgrade to Premium Icon */}
             <button
                onClick={() => setShowUpgrade(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
              >
                <TrendingUp size={16} className="mr-2 inline-block" />
                Upgrade to Premium
              </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">{userProducts?.length || 0}</span>
              <span className="text-gray-600 block text-xs">Posts</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">0</span>
              <span className="text-gray-600 block text-xs">Followers</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">0</span>
              <span className="text-gray-600 block text-xs">Following</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold text-gray-900">{vendorStats?.totalSales || 0}</span>
              <span className="text-gray-600 block text-xs">Sales</span>
            </div>
          </div>

          {/* Trust Score Box */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="text-green-600" size={18} />
                  <span className="font-semibold text-gray-900">Trust Score</span>
                </div>
                <div className="text-2xl font-bold text-green-600">0</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Rating</div>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="font-semibold">{vendorStats?.averageRating || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <p className="text-gray-700 text-sm mb-2">{(profileUser as any).bio || 'No bio added yet'}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex space-x-8 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-4 px-2 font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`pb-4 px-2 font-medium text-sm transition-colors ${
                activeTab === "posts"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-4 px-2 font-medium text-sm transition-colors ${
                activeTab === "activity"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-2 font-medium text-sm transition-colors ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Products Listed</p>
                      <p className="text-2xl font-bold text-blue-600">{userProducts?.length || 0}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-900">Total Sales</p>
                      <p className="text-2xl font-bold text-green-600">{vendorStats?.totalSales || 0}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-900">Rating</p>
                      <p className="text-2xl font-bold text-purple-600">{vendorStats?.averageRating || 0}</p>
                    </div>
                    <Star className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="grid grid-cols-3 gap-2">
              {userProducts && userProducts.length > 0 ? (
                userProducts.map((product: any) => (
                  <div key={product.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer relative">
                    <img 
                      src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                        <p className="font-semibold">{product.title}</p>
                        <p className="text-sm">${product.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <Package size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm font-semibold mb-1">No products yet</p>
                  <p className="text-xs text-gray-500 mb-4">Share your first product to get started</p>
                  <a
                    href="/product-listing"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Product
                  </a>
                </div>
              )}
               {/* Add Product Button */}
               <a
                    href="/product-listing"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Product
                  </a>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Platform Activity</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{userProducts?.length || 0}</div>
                    <div className="text-xs text-gray-600">Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">0</div>
                    <div className="text-xs text-gray-600">Real Estate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">0</div>
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
              <p className="text-xs text-gray-500">Reviews will appear here once you receive them</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}