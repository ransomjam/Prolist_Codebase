import { useState } from 'react';
import { Heart, Eye, MessageCircle, Share2, Star, Settings, User, MapPin, Calendar, Phone, Mail, Grid3X3, Bookmark, UserCheck, Plus } from 'lucide-react';
import { currentUser } from '../data/demoData';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Shield, CheckCircle, Clock, XCircle } from 'lucide-react';

interface VendorApplication {
  id: number;
  status: string;
  submittedAt: string;
  verifiedAt?: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const profileUser = user || currentUser;

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

  const getVerificationStatus = () => {
    if (!vendorApplication) return "Not Verified";
    return vendorApplication.status || "Pending";
  };

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-8 mb-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={currentUser.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
              alt={profileUser.name || profileUser.username}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h1 className="text-xl md:text-2xl font-light">{profileUser.name || profileUser.username}</h1>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-6 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-600 transition">
                  Edit profile
                </button>
                <button className="border border-gray-300 px-6 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition">
                  Share profile
                </button>
                <button className="border border-gray-300 p-1.5 rounded-md hover:bg-gray-50 transition">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div className="text-center md:text-left">
                <span className="font-semibold">{currentUser.listingsPosted || 24}</span>
                <span className="text-gray-600 ml-1">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold">{currentUser.followers || 1234}</span>
                <span className="text-gray-600 ml-1">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold">{currentUser.following || 567}</span>
                <span className="text-gray-600 ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-sm">
              <div className="font-semibold mb-1">{profileUser.name || 'ProList Vendor'}</div>
              <div className="text-gray-600 mb-1">🏪 Local Business Owner in {currentUser.location}</div>
              <div className="text-gray-600 mb-1">📍 Nkwen Market, Commercial Avenue</div>
              <div className="text-gray-600 mb-1">✨ {getVerificationStatus()}</div>
              <div className="text-gray-600">📞 +237 670000000</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <a
            href="/add-listing"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition"
          >
            Add Listing
          </a>
          {!vendorApplication && (
            <a
              href="/vendor-register"
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
            >
              Get Verified
            </a>
          )}
        </div>

        {/* Highlights/Stories */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-1">
              <Plus size={20} className="text-gray-400" />
            </div>
            <div className="text-xs text-gray-600">New</div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" 
                className="w-full h-full rounded-full object-cover border-2 border-white"
                alt="Products"
              />
            </div>
            <div className="text-xs text-gray-600">Products</div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
              <img 
                src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" 
                className="w-full h-full rounded-full object-cover border-2 border-white"
                alt="Market"
              />
            </div>
            <div className="text-xs text-gray-600">Market</div>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 via-green-500 to-teal-500 p-0.5">
              <img 
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64" 
                className="w-full h-full rounded-full object-cover border-2 border-white"
                alt="Services"
              />
            </div>
            <div className="text-xs text-gray-600">Services</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-t border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "posts"
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            <Grid3X3 size={16} className="mx-auto mb-1" />
            POSTS
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "saved"
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            <Bookmark size={16} className="mx-auto mb-1" />
            SAVED
          </button>
          <button
            onClick={() => setActiveTab("tagged")}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === "tagged"
                ? 'text-gray-900 border-t-2 border-gray-900'
                : 'text-gray-500'
            }`}
          >
            <UserCheck size={16} className="mx-auto mb-1" />
            TAGGED
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-white">
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div key={post.id} className="aspect-square relative group cursor-pointer">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
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

        {activeTab === "saved" && (
          <div className="py-12 text-center text-gray-500">
            <Bookmark size={48} className="mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Save posts you want to see again</p>
            <p className="text-sm">When you save posts, they'll appear here.</p>
          </div>
        )}

        {activeTab === "tagged" && (
          <div className="py-12 text-center text-gray-500">
            <UserCheck size={48} className="mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Photos of you</p>
            <p className="text-sm">When people tag you in photos, they'll appear here.</p>
          </div>
        )}
      </div>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-2">🎉 Upgrade to Premium</h3>
            <p className="text-sm mb-4">You'll enjoy 1 Month FREE because <strong>ProList Cares</strong>.</p>
            <button className="bg-emerald text-white px-4 py-2 rounded-lg w-full hover:bg-green-700">Confirm Upgrade</button>
            <button className="mt-2 text-sm text-red-600 underline w-full" onClick={() => setShowUpgrade(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}