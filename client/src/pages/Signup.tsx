import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { serviceCategories } from '../data/professionalData';

interface SignupForm {
  fullName: string;
  username: string;
  userType: string;
  vendorType: string;
  serviceCategory: string;
  location: string;
  password: string;
}

export default function Signup() {
  const { login } = useAuth();
  const [form, setForm] = useState<SignupForm>({
    fullName: '',
    username: '',
    userType: '',
    vendorType: '',
    serviceCategory: '',
    location: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!form.fullName || !form.username || !form.userType || !form.location || !form.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (form.userType === 'vendor' && !form.vendorType) {
      alert('Please select a vendor type');
      return;
    }

    if (form.userType === 'professional' && !form.serviceCategory) {
      alert('Please select a service category');
      return;
    }

    // Check if username already exists
    const registeredUsers = JSON.parse(localStorage.getItem('prolist_registered_users') || '[]');
    const userExists = registeredUsers.find((u: any) => u.username === form.username);
    
    if (userExists) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    // Save user to localStorage
    const newUser = {
      id: Date.now(),
      username: form.username,
      name: form.fullName,
      userType: form.userType,
      vendorType: form.vendorType,
      serviceCategory: form.serviceCategory,
      location: form.location,
      password: form.password
    };

    registeredUsers.push(newUser);
    localStorage.setItem('prolist_registered_users', JSON.stringify(registeredUsers));

    // Auto-login the new user
    const userData = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name
    };

    login(userData);
    window.location.href = '/app';
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
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              id="userType"
              name="userType"
              value={form.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">Select Account Type</option>
              <option value="vendor">Vendor</option>
              <option value="user">User</option>
              <option value="investor">Investor</option>
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