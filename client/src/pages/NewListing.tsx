import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function NewListing() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    location: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Get current user session to check posting permissions
  const { data: userSession } = useQuery({
    queryKey: ['/api/user/session'],
    queryFn: async () => {
      const response = await fetch('/api/user/session');
      if (!response.ok) return null;
      return response.json();
    }
  });

  const canPost = userSession?.accountType === 'premium' || (userSession?.listingsPosted || 0) < 1;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">📦 New Listing</h2>

      {/* Verification Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Get Your Business Verified!</h3>
            <p className="text-sm opacity-90">Verified listings get 3x more views and higher customer trust</p>
          </div>
          <a 
            href="/vendor-register"
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Apply Now
          </a>
        </div>
      </div>

      {!canPost && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 shadow">
          You've reached your free weekly limit. Upgrade to premium to post more listings.
        </div>
      )}

      <form className="bg-white rounded-xl shadow-md p-6 grid gap-4 w-full max-w-xl">
        <input 
          name="title" 
          onChange={handleChange} 
          placeholder="Title" 
          className="border p-2 rounded"
          value={form.title}
        />

        <select 
          name="category" 
          onChange={handleChange} 
          className="border p-2 rounded"
          value={form.category}
        >
          <option value="">Select Category</option>
          <option value="Phones">Phones</option>
          <option value="Shoes">Shoes</option>
          <option value="Clothes">Clothes & Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Assets">Assets & Vehicles</option>
          <option value="Services">Professional Services</option>
          <option value="Food & Beverages">Food & Beverages</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Arts & Crafts">Arts & Crafts</option>
          <option value="Automotive">Automotive</option>
          <option value="Books">Books & Media</option>
          <option value="Sports">Sports & Recreation</option>
        </select>

        <input 
          name="price" 
          onChange={handleChange} 
          placeholder="Price (CFA)" 
          className="border p-2 rounded"
          value={form.price}
        />
        <input 
          name="location" 
          onChange={handleChange} 
          placeholder="Location (e.g. Main Market)" 
          className="border p-2 rounded"
          value={form.location}
        />
        <input 
          name="image" 
          onChange={handleChange} 
          placeholder="Image URL" 
          className="border p-2 rounded"
          value={form.image}
        />

        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-2 px-4 rounded-xl font-semibold shadow-neonBlue hover:shadow-neonGreen disabled:opacity-50`}
          disabled={!canPost}
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}