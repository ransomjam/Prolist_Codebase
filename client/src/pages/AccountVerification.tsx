import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Upload, CheckCircle, AlertCircle, Clock, FileText, Camera, MapPin, Phone, User } from 'lucide-react';

interface VerificationForm {
  businessName: string;
  businessAddress: string;
  businessDescription: string;
  idDocument: File | null;
  businessLicense: File | null;
  businessPhoto: File | null;
  portfolioItems: FileList | null;
  verificationSlot: string;
}

export default function AccountVerification() {
  const { user } = useAuth();
  const [form, setForm] = useState<VerificationForm>({
    businessName: '',
    businessAddress: '',
    businessDescription: '',
    idDocument: null,
    businessLicense: null,
    businessPhoto: null,
    portfolioItems: null,
    verificationSlot: ''
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof VerificationForm) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, [field]: file }));
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, portfolioItems: e.target.files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmissionStatus('success');
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  const getAccountTypeDetails = () => {
    switch (user?.accountType) {
      case 'shop_owner': 
        return {
          label: 'Shop Owner',
          title: 'Shop Verification',
          description: 'Verify your shop to start selling products on ProList',
          icon: '🏪',
          benefits: ['List unlimited products', 'Access to analytics', 'Customer messaging', 'Payment processing']
        };
      case 'professional': 
        return {
          label: 'Professional Service Provider',
          title: 'Professional Services Verification',
          description: 'Verify your professional credentials to offer services',
          icon: '💼',
          benefits: ['Service portfolio showcase', 'Client booking system', 'Project management', 'Escrow payments']
        };
      case 'real_estate': 
        return {
          label: 'Real Estate Agent',
          title: 'Real Estate License Verification',
          description: 'Verify your real estate credentials to list properties',
          icon: '🏠',
          benefits: ['Property listing management', 'Virtual tours', 'Lead generation', 'Commission tracking']
        };
      default: 
        return {
          label: 'User Account',
          title: 'Account Verification',
          description: 'Verify your account for enhanced platform access',
          icon: '👤',
          benefits: ['Enhanced security', 'Priority support', 'Special offers', 'Trusted status']
        };
    }
  };

  const getRequiredDocuments = () => {
    switch (user?.accountType) {
      case 'shop_owner':
        return [
          'National ID or Passport',
          'Business License (if applicable)',
          'Shop/Store Photos',
          'Product Sample Photos'
        ];
      case 'professional':
        return [
          'National ID or Passport',
          'Professional Certifications',
          'Portfolio/Work Samples',
          'Client Testimonials'
        ];
      case 'real_estate':
        return [
          'National ID or Passport',
          'Real Estate License',
          'Office/Agency Photos',
          'Property Listings Portfolio'
        ];
      default:
        return ['National ID or Passport', 'Business Documentation'];
    }
  };

  if (user?.verificationStatus === 'verified') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Verified!</h1>
            <p className="text-gray-600 mb-6">
              Your {getAccountTypeLabel()} account has been successfully verified. You now have full access to all platform features.
            </p>
            <button
              onClick={() => window.location.href = '/app'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (user?.verificationStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Pending</h1>
            <p className="text-gray-600 mb-6">
              Your {getAccountTypeLabel()} verification is currently being reviewed. This process typically takes 1-3 business days.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">What happens next?</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Our team will review your submitted documents</li>
                <li>• You may be contacted for additional information</li>
                <li>• You'll receive an email notification once verified</li>
                <li>• Full platform access will be granted upon approval</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/app'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your verification documents. Our team will review your application and get back to you within 1-3 business days.
            </p>
            <button
              onClick={() => window.location.href = '/app'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getAccountTypeDetails().icon}</div>
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getAccountTypeDetails().title}</h1>
          <p className="text-gray-600">{getAccountTypeDetails().description}</p>
        </div>

        {/* Required Documents Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <FileText size={20} />
            Required Documents
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-800">
            {getRequiredDocuments().map((doc, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-600" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {user?.accountType === 'shop_owner' ? 'Shop/Store Name' : 
                   user?.accountType === 'professional' ? 'Business/Professional Name' :
                   user?.accountType === 'real_estate' ? 'Real Estate Agency Name' : 'Business Name'}
                </label>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(e) => setForm(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <input
                  type="text"
                  value={form.businessAddress}
                  onChange={(e) => setForm(prev => ({ ...prev, businessAddress: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Business Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {user?.accountType === 'shop_owner' ? 'Products & Services You Offer' :
                 user?.accountType === 'professional' ? 'Your Professional Services & Expertise' :
                 user?.accountType === 'real_estate' ? 'Your Real Estate Services & Market Focus' : 'Business Description'}
              </label>
              <textarea
                value={form.businessDescription}
                onChange={(e) => setForm(prev => ({ ...prev, businessDescription: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Document Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  National ID or Passport
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'idDocument')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  {user?.accountType === 'real_estate' ? 'Real Estate License' : 'Business License (Optional)'}
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, 'businessLicense')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={user?.accountType === 'real_estate'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="inline w-4 h-4 mr-1" />
                  {user?.accountType === 'shop_owner' ? 'Shop/Store Photo' :
                   user?.accountType === 'real_estate' ? 'Office Photo' : 'Workplace Photo'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'businessPhoto')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-1" />
                  {user?.accountType === 'shop_owner' ? 'Product Photos' :
                   user?.accountType === 'professional' ? 'Portfolio/Work Samples' :
                   user?.accountType === 'real_estate' ? 'Property Listings' : 'Work Samples'}
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handlePortfolioChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Verification Slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Verification Call Time (Optional)
              </label>
              <select
                value={form.verificationSlot}
                onChange={(e) => setForm(prev => ({ ...prev, verificationSlot: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a time slot</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 7 PM)</option>
              </select>
            </div>

            {/* Terms and Submit */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-4">
                By submitting this verification, you confirm that all information provided is accurate and you agree to our terms of service and verification process.
              </p>
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {submissionStatus === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting Verification...
                  </span>
                ) : (
                  'Submit for Verification'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}