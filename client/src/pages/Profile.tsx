import { currentUser } from '../data/demoData';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string>('none');
  const { user } = useAuth();
  const isPremium = currentUser.accountType === 'premium';

  useEffect(() => {
    // Check for pending verification requests
    const requests = JSON.parse(localStorage.getItem('verificationRequests') || '[]');
    const userRequest = requests.find((req: any) => req.submittedBy === user?.username);
    if (userRequest) {
      setVerificationStatus(userRequest.status);
    }
  }, [user]);

  return (
    <div className="p-6">
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
        
        {/* Verification Status for Vendors */}
        {currentUser.accountType === 'vendor' && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm">
              Verification Status: {' '}
              {verificationStatus === 'pending' ? (
                <span className="text-yellow-600 font-medium">⏳ Pending Verification</span>
              ) : verificationStatus === 'verified' ? (
                <span className="text-green-600 font-medium">✓ Verified</span>
              ) : (
                <span className="text-gray-600">Not Verified</span>
              )}
            </p>
            {verificationStatus === 'none' && (
              <a 
                href="/apply-verification" 
                className="inline-block mt-2 text-primary hover:text-blue-700 font-medium underline text-sm"
              >
                Apply for Verification
              </a>
            )}
          </div>
        )}
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