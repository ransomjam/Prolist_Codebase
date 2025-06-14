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
  const [isPremiumUser, setIsPremiumUser] = useState(user?.accountType === 'premium' || false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProductSuccess, setShowProductSuccess] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profilePicture: null as File | null
  });
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string>('');

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

  // Mutation for upgrading to premium
  const upgradeToPremiumMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not found');
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountType: 'premium',
          verificationStatus: 'premium_verified'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade to premium');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsPremiumUser(true);
      setShowUpgrade(false);
      setShowCongrats(true);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
    onError: (error) => {
      console.error('Error upgrading to premium:', error);
      alert('Failed to upgrade to premium. Please try again.');
    }
  });

  // Mutation for updating user profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!user?.id) throw new Error('User not found');
      
      // Handle profile picture conversion
      let profilePictureData = null;
      if (updates.profilePicture) {
        profilePictureData = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]); // Remove data:image/jpeg;base64, prefix
          };
          reader.readAsDataURL(updates.profilePicture);
        });
      }

      const updateData = { ...updates };
      if (profilePictureData) {
        updateData.profilePictureUrl = `data:image/jpeg;base64,${profilePictureData}`;
      }
      delete updateData.profilePicture; // Remove file object

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
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
      bio: (profileUser as any).bio || '',
      profilePicture: null
    });
    setProfilePreviewUrl('');
    setShowEditModal(true);
  };

  // Handle profile picture file change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditForm({ ...editForm, profilePicture: file });
      const url = URL.createObjectURL(file);
      setProfilePreviewUrl(url);
    }
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
    // Check if user is premium
    if (isPremiumUser || user?.accountType === 'premium') {
      return (
        <div className="flex items-center gap-1 text-purple-600">
          <span className="text-xs font-medium">Premium Member</span>
        </div>
      );
    }

    // Check if user is a verified vendor
    if (user?.accountType === 'vendor' && user?.verificationStatus === 'basic_verified') {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <span className="text-xs font-medium">Verified Vendor</span>
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
        <div className="bg-white rounded-xl shadow-lg -mt-16 relative z-10 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              {(profileUser as any).profilePictureUrl ? (
                <div className="relative">
                  <img
                    src={(profileUser as any).profilePictureUrl}
                    alt={`${profileUser.username}'s profile`}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      // Fallback to initial if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                </div>
              ) : null}
              <div 
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold ${
                  (profileUser as any).profilePictureUrl ? 'hidden' : 'flex'
                }`}
              >
                {profileUser.username.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                {getVerificationBadge()}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 truncate">
                {profileUser.username}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-2 truncate">{profileUser.email}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="sm:w-4 sm:h-4" />
                  <span className="truncate max-w-32 sm:max-w-none">
                    {(profileUser as any).location || 'No location set'}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="sm:w-4 sm:h-4" />
                  <span className="truncate max-w-32 sm:max-w-none">
                    {(profileUser as any).phone || 'No phone number'}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <button 
                onClick={openEditModal}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              
              {!isPremiumUser && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:from-yellow-600 hover:to-orange-600 transition shadow-lg"
                >
                  Upgrade to Premium
                </button>
              )}
              
              {isPremiumUser && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-lg text-center">
                  Premium Member
                </div>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">{userProducts?.length || 0}</span>
              <span className="text-gray-600 block text-xs sm:text-sm">Posts</span>
            </div>
            <div className="text-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">0</span>
              <span className="text-gray-600 block text-xs sm:text-sm">Followers</span>
            </div>
            <div className="text-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">0</span>
              <span className="text-gray-600 block text-xs sm:text-sm">Following</span>
            </div>
            <div className="text-center">
              <span className="text-base sm:text-lg font-bold text-gray-900">{vendorStats?.totalSales || 0}</span>
              <span className="text-gray-600 block text-xs sm:text-sm">Sales</span>
            </div>
          </div>

          {/* Trust Score Box */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 sm:p-4 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <Shield className="text-green-600" size={16} />
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">Trust Score</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">0</div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                <div className="flex items-center justify-center sm:justify-end gap-1">
                  <Star className="text-yellow-500 fill-current" size={14} />
                  <span className="font-semibold text-sm sm:text-base">{vendorStats?.averageRating || 0}</span>
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
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-500 text-xs">No image</p>
                        </div>
                      </div>
                    )}
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
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6">
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
              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {profilePreviewUrl ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                        src={profilePreviewUrl}
                        alt="Profile preview"
                      />
                    ) : (profileUser as any).profilePictureUrl ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                        src={(profileUser as any).profilePictureUrl}
                        alt="Current profile"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                        {profileUser.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
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

      {/* Premium Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            {upgradeStep === 1 && (
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Premium</h3>
                  <p className="text-gray-600">Unlock exclusive features and boost your business</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Premium Benefits:</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Unlimited Listings</li>
                      <li>• Access to Post Auctions</li>
                      <li>• Access to post Real estate listings</li>
                      <li>• Premium vendor badge</li>
                      <li>• Priority listing placement</li>
                      <li>• Advanced analytics dashboard</li>
                      <li>• Priority customer support</li>
                      <li>• Featured product promotions</li>
                      <li>• Enhanced profile customization</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">5,000 XAF</div>
                    <div className="text-sm text-green-700">per month</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setUpgradeStep(2)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition shadow-lg"
                  >
                    Continue to Payment
                  </button>
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            )}

            {upgradeStep === 2 && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Payment Method</h3>
                  <button 
                    onClick={() => setUpgradeStep(1)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Premium Subscription</span>
                      <span className="font-bold">5,000 XAF/month</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Select Payment Method:</h4>
                    
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="mobile_money"
                        checked={paymentMethod === 'mobile_money'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">Mobile Money</div>
                        <div className="text-sm text-gray-600">MTN/Orange Money</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank payment</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      // Simulate payment processing
                      setUpgradeStep(3);
                      setTimeout(() => {
                        upgradeToPremiumMutation.mutate();
                      }, 2000);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition shadow-lg"
                  >
                    Pay 5,000 XAF
                  </button>
                  <button
                    onClick={() => setShowUpgrade(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {upgradeStep === 3 && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">Please wait while we process your payment...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Premium!</h2>
            <p className="text-gray-600 mb-6">You've successfully upgraded to Premium membership</p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-purple-900 mb-2">Your New Benefits Are Now Active:</h3>
              <ul className="text-sm text-purple-800 space-y-1 text-left">
                <li>• Premium vendor badge displayed</li>
                <li>• Priority placement in search results</li>
                <li>• Access to advanced analytics</li>
                <li>• Priority customer support</li>
                <li>• Featured product promotions</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowCongrats(false);
                  window.location.reload(); // Refresh to show premium features
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
              >
                Explore Premium Features
              </button>
              <button
                onClick={() => setShowCongrats(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}