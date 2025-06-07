import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle, Clock, AlertCircle, Shield, User, FileText, Camera, Award } from 'lucide-react';

export default function VerificationDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'status'>('overview');

  const getAccountTypeDetails = () => {
    switch (user?.accountType) {
      case 'shop_owner':
        return {
          title: 'Shop Owner Account',
          description: 'Sell products and manage your online store',
          benefits: ['List unlimited products', 'Access to market analytics', 'Customer messaging system', 'Payment processing'],
          icon: <Shield className="w-8 h-8 text-blue-600" />
        };
      case 'professional':
        return {
          title: 'Professional Service Provider',
          description: 'Offer professional services to clients',
          benefits: ['Service portfolio showcase', 'Client booking system', 'Project management tools', 'Escrow payment protection'],
          icon: <Award className="w-8 h-8 text-purple-600" />
        };
      case 'real_estate':
        return {
          title: 'Real Estate Agent',
          description: 'List and manage property sales',
          benefits: ['Property listing management', 'Virtual tour integration', 'Lead generation tools', 'Commission tracking'],
          icon: <Camera className="w-8 h-8 text-green-600" />
        };
      default:
        return {
          title: 'User Account',
          description: 'Browse and purchase from local vendors',
          benefits: ['Access to all listings', 'Secure checkout', 'Order tracking', 'Chat with vendors'],
          icon: <User className="w-8 h-8 text-gray-600" />
        };
    }
  };

  const getVerificationStatusInfo = () => {
    switch (user?.verificationStatus) {
      case 'verified':
        return {
          status: 'Verified',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          message: 'Your account is fully verified and you have access to all platform features.'
        };
      case 'pending':
        return {
          status: 'Verification Pending',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />,
          message: 'Your verification documents are being reviewed. This typically takes 1-3 business days.'
        };
      case 'rejected':
        return {
          status: 'Verification Rejected',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <AlertCircle className="w-6 h-6 text-red-600" />,
          message: 'Your verification was rejected. Please review the feedback and resubmit your documents.'
        };
      default:
        return {
          status: 'Not Verified',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <AlertCircle className="w-6 h-6 text-gray-600" />,
          message: 'Complete your account verification to access all platform features.'
        };
    }
  };

  const accountDetails = getAccountTypeDetails();
  const verificationInfo = getVerificationStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {accountDetails.icon}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{accountDetails.title}</h1>
          <p className="text-gray-600">{accountDetails.description}</p>
        </div>

        {/* Verification Status Card */}
        <div className={`${verificationInfo.bgColor} ${verificationInfo.borderColor} border-2 rounded-2xl p-6 mb-8`}>
          <div className="flex items-center gap-4">
            {verificationInfo.icon}
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${verificationInfo.color}`}>
                {verificationInfo.status}
              </h3>
              <p className="text-gray-700 mt-1">{verificationInfo.message}</p>
            </div>
            {user?.verificationStatus !== 'verified' && (
              <button
                onClick={() => window.location.href = '/account-verification'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {user?.verificationStatus === 'pending' ? 'View Status' : 'Start Verification'}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'documents', 'status'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accountDetails.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Username</label>
                      <p className="text-gray-900">{user?.username}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{user?.location || 'Not provided'}</p>
                    </div>
                    {user?.specialization && (
                      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">Specialization</label>
                        <p className="text-gray-900">{user.specialization}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">National ID or Passport</span>
                      </div>
                      <span className="text-sm text-green-600">✓ Submitted</span>
                    </div>
                    {user?.accountType !== 'user' && (
                      <>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">Business License</span>
                          </div>
                          <span className="text-sm text-green-600">✓ Submitted</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Camera className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">Business Photos</span>
                          </div>
                          <span className="text-sm text-green-600">✓ Submitted</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'status' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Application Submitted</p>
                        <p className="text-sm text-gray-500">Your verification documents have been received</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user?.verificationStatus === 'pending' 
                          ? 'bg-yellow-100' 
                          : user?.verificationStatus === 'verified'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        {user?.verificationStatus === 'pending' ? (
                          <Clock className="w-5 h-5 text-yellow-600 animate-pulse" />
                        ) : user?.verificationStatus === 'verified' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Document Review</p>
                        <p className="text-sm text-gray-500">
                          {user?.verificationStatus === 'verified' 
                            ? 'Documents approved by our team'
                            : 'Our team is reviewing your documents'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user?.verificationStatus === 'verified' 
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        {user?.verificationStatus === 'verified' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Account Verified</p>
                        <p className="text-sm text-gray-500">
                          {user?.verificationStatus === 'verified'
                            ? 'Your account is fully verified'
                            : 'Pending document approval'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}