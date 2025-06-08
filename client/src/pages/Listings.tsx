import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ListingCard from '../components/ListingCard';

export default function Listings() {
  const [category, setCategory] = useState("All");

  // Fetch all products from the database
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  const filteredProducts = category === "All"
    ? products
    : products.filter((product: any) => product.category === category);

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primary mb-4">Explore Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primary mb-4">Explore Listings</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">Failed to load listings. Please try again.</p>
        </div>
      </div>
    );
  }

  const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Automotive", "Services"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Explore Listings</h2>

      <div className="flex gap-4 mb-6 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              category === cat 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
          <p className="text-gray-500 mb-6">
            {category === "All" 
              ? "No products have been listed yet. Be the first to add a listing!" 
              : `No products found in the ${category} category.`}
          </p>
          <a
            href="/product-listing"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Listing
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {product.location || 'Bamenda'}
                  </span>
                  <a
                    href={`/product/${product.id}`}
                    className="text-primary hover:text-blue-700 font-medium text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
