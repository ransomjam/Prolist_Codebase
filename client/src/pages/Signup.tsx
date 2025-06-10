import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { serviceCategories } from '../data/professionalData';

interface SignupForm {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  accountType: string;
  specialization: string;
  location: string;
  password: string;
  profilePicture: File | null;
  businessName: string;
  marketLocation: string;
  marketLine: string;
  shopNumber: string;
  acceptTerms: boolean;
  physicalVerificationAvailable: boolean;
}

export default function Signup() {
  const { login } = useAuth();
  const [form, setForm] = useState<SignupForm>({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    accountType: '',
    specialization: '',
    location: '',
    password: '',
    profilePicture: null,
    businessName: '',
    marketLocation: '',
    marketLine: '',
    shopNumber: '',
    acceptTerms: false,
    physicalVerificationAvailable: false,
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Market data for location selection
  const marketData = {
    'Main Market': ['Electronics Line', 'Fashion Line', 'Food Line', 'Cosmetics Line', 'Hardware Line'],
    'Ntarikon Market': ['Vegetable Line', 'Meat Line', 'Fish Line', 'Spices Line'],
    'Food Market': ['Fresh Produce Line', 'Processed Foods Line', 'Beverages Line'],
    'Mankon Market': ['Clothing Line', 'Shoes Line', 'Bags Line'],
    'Commercial Avenue': ['Tech Shops Line', 'Phone Accessories Line', 'Computer Line'],
    'Nkwen Market': ['Traditional Items Line', 'Crafts Line', 'Art Line']
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, profilePicture: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.fullName || !form.username || !form.accountType || !form.location || !form.password) {
      alert('Please fill in all required fields');
      return;
    }

    if ((form.accountType === 'professional' || form.accountType === 'shop_owner') && !form.specialization) {
      alert('Please specify your specialization');
      return;
    }

    try {
      // Create user account
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          email: form.email,
          phone: form.phone,
          location: form.location,
          accountType: form.accountType,
          specialization: form.specialization || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Registration failed:', error);
        alert(error.message || 'Registration failed');
        return;
      }

      const newUser = await response.json();
      console.log('Registration successful:', newUser);
      
      // Auto-login the new user
      login(newUser);
      
      // Redirect based on account type
      if (form.accountType === 'user') {
        window.location.href = '/app';
      } else {
        // Redirect to verification page for business accounts
        window.location.href = '/vendor-register';
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">Create Your ProList Account</h2>
          <p className="text-gray-600">Join Bamenda's digital marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a unique username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {previewUrl ? (
                  <img
                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                    src={previewUrl}
                    alt="Profile preview"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              id="accountType"
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Account Type</option>
              <option value="user">User (Browse & Shop)</option>
              <option value="shop_owner">Shop Owner (Markets)</option>
              <option value="professional">Professional Service Provider</option>
              <option value="real_estate">Real Estate Agent</option>
            </select>
          </div>

          {/* Show specialization selection when business account is selected */}
          {(form.accountType === 'shop_owner' || form.accountType === 'professional' || form.accountType === 'real_estate') && (
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
                {form.accountType === 'shop_owner' && 'Shop Category'}
                {form.accountType === 'professional' && 'Service Category'}
                {form.accountType === 'real_estate' && 'Real Estate Specialization'}
              </label>
              <select
                id="specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Specialization</option>
                {form.accountType === 'shop_owner' && (
                  <>
                    <option value="electronics">Electronics & Tech</option>
                    <option value="fashion">Fashion & Clothing</option>
                    <option value="food">Food & Beverages</option>
                    <option value="beauty">Beauty & Cosmetics</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports & Recreation</option>
                    <option value="books">Books & Education</option>
                    <option value="crafts">Local Crafts & Art</option>
                  </>
                )}
                {form.accountType === 'professional' && 
                  serviceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
                {form.accountType === 'real_estate' && (
                  <>
                    <option value="residential_sales">Residential Sales</option>
                    <option value="commercial_sales">Commercial Sales</option>
                    <option value="rentals">Property Rentals</option>
                    <option value="land_sales">Land Sales</option>
                    <option value="property_management">Property Management</option>
                    <option value="investment_consulting">Investment Consulting</option>
                  </>
                )}
              </select>
            </div>
          )}

          {/* Business Details - Only for business accounts */}
          {form.accountType === 'shop_owner' && (
            <>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
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

              {/* Market Selection */}
              <div>
                <label htmlFor="marketLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Market Location
                </label>
                <select
                  id="marketLocation"
                  name="marketLocation"
                  value={form.marketLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Market (Optional)</option>
                  {Object.keys(marketData).map(market => (
                    <option key={market} value={market}>{market}</option>
                  ))}
                </select>
              </div>

              {form.marketLocation && (
                <div>
                  <label htmlFor="marketLine" className="block text-sm font-medium text-gray-700 mb-1">
                    Market Line/Section
                  </label>
                  <select
                    id="marketLine"
                    name="marketLine"
                    value={form.marketLine}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Line/Section</option>
                    {marketData[form.marketLocation as keyof typeof marketData]?.map(line => (
                      <option key={line} value={line}>{line}</option>
                    ))}
                  </select>
                </div>
              )}

              {form.marketLine && (
                <div>
                  <label htmlFor="shopNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Number/Location
                  </label>
                  <input
                    id="shopNumber"
                    name="shopNumber"
                    type="text"
                    value={form.shopNumber}
                    onChange={handleChange}
                    placeholder="e.g., Shop 45, Stall B12, Corner near entrance"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Nkwen Market, Commercial Avenue"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                I accept the{' '}
                <a href="#" className="text-primary hover:text-blue-700 underline">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-blue-700 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Physical Verification Availability - Only for business accounts */}
            {(form.accountType === 'shop_owner' || form.accountType === 'professional' || form.accountType === 'real_estate') && (
              <div className="flex items-start space-x-3">
                <input
                  id="physicalVerificationAvailable"
                  name="physicalVerificationAvailable"
                  type="checkbox"
                  checked={form.physicalVerificationAvailable}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="physicalVerificationAvailable" className="text-sm text-gray-700">
                  I'm available for physical verification if needed (recommended for faster approval)
                </label>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!form.acceptTerms}
            className="w-full bg-gradient-to-r from-primary to-emerald text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all shadow-lg border-2 border-primary/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-primary hover:text-blue-700 font-medium">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}