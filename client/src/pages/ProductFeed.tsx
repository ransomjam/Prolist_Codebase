import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, ShoppingBag, Shield, Star, Eye } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  vendorId: number;
  viewCount: number;
  createdAt: string;
}

export default function ProductFeed() {
  const [filter, setFilter] = useState('');

  // Fetch products from the API
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

  const filtered = products.filter((p: Product) => {
    return filter ? p.category === filter : true;
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'phones', label: 'Phones' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'food-beverages', label: 'Food & Beverages' },
    { value: 'arts-crafts', label: 'Arts & Crafts' },
    { value: 'services', label: 'Services' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'automotive', label: 'Automotive' }
  ];

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading marketplace...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <ShoppingBag className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to load products</h3>
          <p className="text-red-700">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold text-blue-600">Marketplace</h2>
        </div>
        <button 
          onClick={() => window.location.href = '/product-listing'}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <ShoppingBag size={20} />
          Sell Product
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)} 
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </div>
      </div>

      {/* Product Grid - Facebook Marketplace Style */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new listings</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item: Product) => (
            <div
              key={item.id}
              onClick={() => window.location.href = `/product/${item.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="w-full h-40 bg-gray-100 rounded-t-xl flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                {/* View Count Badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Eye size={12} />
                  {item.viewCount || 0}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                {/* Price */}
                <p className="text-green-600 font-bold text-lg">
                  {parseInt(item.price).toLocaleString()} XAF
                </p>
                
                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                  {item.title}
                </h3>
                
                {/* Location */}
                <p className="text-xs text-gray-500 mb-2">{item.location}</p>

                {/* Vendor Info */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield size={10} className="text-blue-600" />
                    </div>
                    <span className="text-gray-600">Vendor #{item.vendorId}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-blue-600">
                    <Shield size={12} />
                    <span className="font-medium">Verified</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full capitalize">
                    {item.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Time Posted */}
                <div className="mt-2 text-xs text-gray-400">
                  Posted {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (if needed for pagination) */}
      {filtered.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}