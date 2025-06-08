import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { currentUser } from '../data/demoData';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        window.location.href = '/app';
      } else {
        const error = await response.json();
        alert(error.message || "Invalid credentials. Please check your username and password.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert("Login failed. Please try again.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your ProList account</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-emerald text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all shadow-lg border-2 border-primary/20 hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Demo Credentials:</h3>
          <p className="text-sm text-yellow-700">
            Username: <code className="bg-yellow-100 px-1 rounded">jamprolist</code><br/>
            Password: <code className="bg-yellow-100 px-1 rounded">1234</code>
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:text-blue-700 font-medium">
              Sign up here
            </a>
          </p>
          <p className="text-gray-600 mt-2">
            <a href="/" className="text-primary hover:text-blue-700 font-medium">
              Back to Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}