import { useState } from 'react';
import { products } from '../data/demoData';
import ListingCard from '../components/ListingCard';

export default function Listings() {
  const [category, setCategory] = useState("All");

  const filteredProducts = category === "All"
    ? products
    : products.filter(item => item.category === category);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Explore Products</h2>

      <div className="flex gap-4 mb-4 overflow-x-auto">
        {["All", "Phones", "Shoes", "Clothes", "Electronics", "Assets", "Real Estate", "Services"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold ${category === cat ? 'bg-primary text-white shadow-neonBlue' : 'bg-gray-200 text-gray-600'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ListingCard key={product.id} listing={product} />
        ))}
      </div>
    </div>
  );
}
