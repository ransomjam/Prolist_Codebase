import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, ShoppingBag, Shield, Star, Eye } from 'lucide-react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

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
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations({
    enableParallax: true,
    staggerDelay: 80
  });

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
    <div className="p-4 max-w-7xl mx-auto scroll-smooth">
      {/* Header */}
      <div 
        ref={(el) => setElementRef('header', el)}
        data-animation-id="header"
        className={`flex items-center justify-between mb-6 gpu-accelerated will-change-transform ${getAnimationClass('header', 0)}`}
        style={getAnimationStyle(0)}
      >
        <div>
          <h2 
            ref={(el) => setElementRef('title', el)}
            data-animation-id="title"
            className={`text-2xl sm:text-3xl font-bold text-blue-600 leading-tight ${getAnimationClass('title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Listings
          </h2>
          <p 
            ref={(el) => setElementRef('subtitle', el)}
            data-animation-id="subtitle"
            className={`text-gray-600 text-sm mt-1 ${getAnimationClass('subtitle', 2)}`}
            style={getAnimationStyle(2)}
          >
            Trusted products from verified vendors
          </p>
        </div>
        <button 
          ref={(el) => setElementRef('list-button', el)}
          data-animation-id="list-button"
          onClick={() => window.location.href = '/product-listing'}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm gpu-accelerated will-change-transform ${getAnimationClass('list-button', 3)}`}
          style={getAnimationStyle(3)}
        >
          <ShoppingBag size={16} />
          List Product
        </button>
      </div>

      {/* Filter Bar */}
      <div 
        ref={(el) => setElementRef('filter-bar', el)}
        data-animation-id="filter-bar"
        className={`mb-6 flex items-center gap-4 gpu-accelerated will-change-transform ${getAnimationClass('filter-bar', 4)}`}
        style={getAnimationStyle(4)}
      >
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <select 
            value={filter}
            onChange={e => setFilter(e.target.value)} 
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div 
          ref={(el) => setElementRef('product-count', el)}
          data-animation-id="product-count"
          className={`text-sm text-gray-600 ${getAnimationClass('product-count', 5)}`}
          style={getAnimationStyle(5)}
        >
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
          {filtered.map((item: Product, index: number) => (
            <div
              key={item.id}
              ref={(el) => setElementRef(`product-${item.id}`, el)}
              data-animation-id={`product-${item.id}`}
              onClick={() => window.location.href = `/product/${item.id}`}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-gray-100 gpu-accelerated will-change-transform ${getAnimationClass(`product-${item.id}`, index + 6)}`}
              style={getAnimationStyle(index + 6)}
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