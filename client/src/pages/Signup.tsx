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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
        const error = await response.text();
        alert(error || 'Registration failed');
        return;
      }

      const newUser = await response.json();
      
      // Auto-login the new user
      const userData = {
        id: newUser.id,
        username: newUser.username,
        name: form.fullName,
        accountType: newUser.accountType,
        verificationStatus: newUser.verificationStatus
      };

      login(userData);
      
      // Redirect based on account type
      if (form.accountType === 'user') {
        window.location.href = '/app';
      } else {
        // Redirect to verification page for business accounts
        window.location.href = '/apply-verification';
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

          {/* Show vendor type selection only when vendor is selected */}
          {form.userType === 'vendor' && (
            <div>
              <label htmlFor="vendorType" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor Type
              </label>
              <select
                id="vendorType"
                name="vendorType"
                value={form.vendorType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Vendor Type</option>
                <option value="online">Online Vendor</option>
                <option value="shop">Shop Owner</option>
              </select>
            </div>
          )}

          {/* Show service category selection only when professional is selected */}
          {form.userType === 'professional' && (
            <div>
              <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Service Category
              </label>
              <select
                id="serviceCategory"
                name="serviceCategory"
                value={form.serviceCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Service Category</option>
                {serviceCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-emerald text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all shadow-lg border-2 border-primary/20 hover:shadow-xl"
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