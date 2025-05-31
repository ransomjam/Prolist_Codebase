import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface VerificationForm {
  businessName: string;
  location: string;
  reason: string;
}

export default function Verification() {
  const { user } = useAuth();
  const [form, setForm] = useState<VerificationForm>({
    businessName: '',
    location: '',
    reason: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.businessName || !form.location || !form.reason) {
      alert('Please fill in all fields');
      return;
    }

    // Store verification request in localStorage for demo purposes
    const verificationRequest = {
      ...form,
      status: 'pending',
      submittedBy: user?.username,
      submittedAt: new Date().toISOString(),
      id: Date.now()
    };

    const existingRequests = JSON.parse(localStorage.getItem('verificationRequests') || '[]');
    existingRequests.push(verificationRequest);
    localStorage.setItem('verificationRequests', JSON.stringify(existingRequests));

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your verification request has been submitted successfully. We'll review your application and get back to you within 2-3 business days.
            </p>
            <a 
              href="/profile" 
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              View Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">Apply for Verification</h2>
          <p className="text-gray-600">Get your business verified on ProList to build trust with customers</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Business Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Main Market, Commercial Avenue"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Why should we verify your business?
            </label>
            <textarea
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Tell us about your business, how long you've been operating, and why verification would benefit your customers..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Verification Benefits:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Verified badge on your listings</li>
              <li>• Higher visibility in search results</li>
              <li>• Increased customer trust</li>
              <li>• Access to premium features</li>
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-emerald text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all shadow-lg border-2 border-primary/20 hover:shadow-xl"
          >
            Submit Verification Request
          </button>
        </form>

        <div className="text-center">
          <a href="/profile" className="text-primary hover:text-blue-700 font-medium">
            Back to Profile
          </a>
        </div>
      </div>
    </div>
  );
}