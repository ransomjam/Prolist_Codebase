import { currentUser } from '../data/demoData';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Shield, CheckCircle, Clock, XCircle, Bell } from 'lucide-react';

interface VendorApplication {
  id: number;
  status: string;
  submittedAt: string;
  verifiedAt?: string;
}

export default function Profile() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { user } = useAuth();
  const isPremium = currentUser.accountType === 'premium';

  // Fetch user's vendor application status
  const { data: vendorApplication } = useQuery({
    queryKey: ['/api/vendor/application', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/vendor/application/${user.id}`);
      if (!response.ok) {
        if (response.status === 404) return null; // No application found
        throw new Error('Failed to fetch application');
      }
      return response.json();
    },
    enabled: !!user?.id
  });

  const getVerificationBadge = () => {
    if (!vendorApplication) {
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <Shield size={20} />
          <span>Not Verified</span>
        </div>
      );
    }

    switch (vendorApplication.status) {
      case 'Basic Verified':
        return (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full">
            <CheckCircle size={20} />
            <span className="font-medium">Basic Verified</span>
          </div>
        );
      case 'Rejected':
        return (
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-full">
            <XCircle size={20} />
            <span className="font-medium">Application Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full">
            <Clock size={20} />
            <span className="font-medium">Pending Verification</span>
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
    <div className="p-6">
      {/* Notification Messages */}
      {getNotificationMessage()}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">👤 My Profile</h2>
        {!isPremium && (
          <button onClick={() => setShowUpgrade(true)} className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-4 py-2 rounded-xl shadow-neonBlue hover:shadow-neonGreen">
            Upgrade to Premium
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold text-primary">{currentUser.name}</h3>
        <p className="text-gray-600">@{currentUser.username}</p>
        <p className="text-gray-600">{currentUser.location}</p>
        
        {/* Contact Information */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-700 mt-2">📞 Phone: <span className="text-blue-500">+237 670000000</span></p>
          <p className="text-sm text-green-600">💬 WhatsApp: <a href="https://wa.me/237670000000" className="underline">Chat on WhatsApp</a></p>
        </div>
        
        <p className="mt-3 text-sm">Account: <strong className="text-emerald">{currentUser.accountType}</strong></p>
        
        {/* Verification Status */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Verification Status</h4>
          {getVerificationBadge()}
          {!vendorApplication && (
            <a 
              href="/vendor-register" 
              className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium underline text-sm"
            >
              Apply for Vendor Verification
            </a>
          )}
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <span>Listings: {currentUser.listingsPosted}</span>
          <span>Real Estate: {currentUser.realEstatePosted}</span>
          <span>Auctions: {currentUser.auctionsPosted}</span>
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <span>🛡️ Trust: {currentUser.trustCount}</span>
          <span>👥 Followers: {currentUser.followers}</span>
        </div>
      </div>

      <a
        href="/new-listing"
        className="inline-block mt-4 bg-gradient-to-r from-blue-500 to-emerald-400 text-white px-4 py-2 rounded-xl shadow-neonBlue hover:shadow-neonGreen"
      >
        + Add New Listing
      </a>

      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-neonBlue">
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