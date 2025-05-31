import { useState } from 'react';
import { currentUser } from '../data/demoData';

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

  const canPost = currentUser.accountType === 'premium' || currentUser.listingsPosted < 1;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">📦 New Listing</h2>

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
          <option value="Clothes">Clothes</option>
          <option value="Electronics">Electronics</option>
          <option value="Assets">Assets</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Services">Professional Services</option>
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