import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Shield, Star, TrendingUp, Clock } from 'lucide-react';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import { useAuth } from '../hooks/useAuth';

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
  imageUrl: string;
  vendor: {
    id: number;
    name: string;
    verificationStatus: 'none' | 'basic_verified' | 'premium_verified';
    rating: number;
    salesCount: number;
    lastChecked?: string;
  };
  viewCount: number;
  salesCount: number;
  timeAgo: string;
  category: string;
}

export default function Marketplace() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // In a real app, this would fetch from /api/products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      // For now, returning mock data that represents the trust-based marketplace
      const mockProducts: Product[] = [
        {
          id: 1,
          title: "Fresh Cameroon Coffee Beans - 1kg Premium Grade",
          price: "XAF 8,500",
          location: "Bamenda Central Market",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 101,
            name: "Mbah Coffee Farms",
            verificationStatus: "premium_verified",
            rating: 4.8,
            salesCount: 156,
            lastChecked: "2 days ago"
          },
          viewCount: 245,
          salesCount: 89,
          timeAgo: "3 hours ago",
          category: "Food & Beverages"
        },
        {
          id: 2,
          title: "Handcrafted Ndop Traditional Textile",
          price: "XAF 15,000",
          location: "Ndop Village",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 102,
            name: "Fon Palace Crafts",
            verificationStatus: "premium_verified",
            rating: 4.9,
            salesCount: 203,
            lastChecked: "1 day ago"
          },
          viewCount: 189,
          salesCount: 67,
          timeAgo: "1 day ago",
          category: "Arts & Crafts"
        },
        {
          id: 3,
          title: "Samsung Galaxy A54 - Unlocked, Like New",
          price: "XAF 185,000",
          location: "Commercial Avenue",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 103,
            name: "TechHub Bamenda",
            verificationStatus: "basic_verified",
            rating: 4.5,
            salesCount: 89,
          },
          viewCount: 567,
          salesCount: 23,
          timeAgo: "5 hours ago",
          category: "Electronics"
        },
        {
          id: 4,
          title: "Fresh Plantains - Bundle of 10",
          price: "XAF 2,500",
          location: "Food Market, Bamenda",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 104,
            name: "Mama Grace Produce",
            verificationStatus: "basic_verified",
            rating: 4.6,
            salesCount: 321,
          },
          viewCount: 123,
          salesCount: 145,
          timeAgo: "30 minutes ago",
          category: "Food & Beverages"
        },
        {
          id: 5,
          title: "Motorcycle Repair Services - Honda, Yamaha",
          price: "XAF 5,000",
          location: "Mechanic Street",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 105,
            name: "Bro John Motors",
            verificationStatus: "premium_verified",
            rating: 4.7,
            salesCount: 78,
            lastChecked: "3 days ago"
          },
          viewCount: 89,
          salesCount: 34,
          timeAgo: "2 hours ago",
          category: "Services"
        },
        {
          id: 6,
          title: "Women's Fashion Shoes - Size 38-42",
          price: "XAF 12,000",
          location: "Main Market",
          imageUrl: "/api/placeholder/300/200",
          vendor: {
            id: 106,
            name: "Fashion Queen Boutique",
            verificationStatus: "basic_verified",
            rating: 4.3,
            salesCount: 67,
          },
          viewCount: 234,
          salesCount: 45,
          timeAgo: "6 hours ago",
          category: "Fashion"
        }
      ];
      return mockProducts;
    }
  });

  const categories = [
    'all',
    'Food & Beverages',
    'Electronics',
    'Fashion',
    'Arts & Crafts',
    'Services',
    'Home & Garden',
    'Automotive'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesVerification = verificationFilter === 'all' || 
                               product.vendor.verificationStatus === verificationFilter;
    
    return matchesSearch && matchesCategory && matchesVerification;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'price_high':
        return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      case 'rating':
        return b.vendor.rating - a.vendor.rating;
      case 'popular':
        return b.viewCount - a.viewCount;
      default: // newest
        return 0; // In real app, would sort by created date
    }
  });

  const handleViewProduct = (productId: number) => {
    console.log('Viewing product:', productId);
    // In real app, would navigate to product detail page
  };

  const handleAddToCart = (productId: number) => {
    console.log('Adding to cart:', productId);
    // In real app, would add to cart or initiate order flow
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Verified Listings</h1>
                <p className="text-gray-600">Trusted local commerce in Bamenda</p>
              </div>
            </div>
            {!isAuthenticated && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Want to sell here?</p>
                <a
                  href="/vendor-register"
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all"
                >
                  Become a Vendor
                </a>
              </div>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products, vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={verificationFilter}
                onChange={(e) => setVerificationFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Vendors</option>
                <option value="premium_verified">Premium Verified</option>
                <option value="basic_verified">Basic Verified</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield size={24} />
                <span className="text-2xl font-bold">156</span>
              </div>
              <p className="text-blue-100">Verified Vendors</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star size={24} />
                <span className="text-2xl font-bold">4.7</span>
              </div>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp size={24} />
                <span className="text-2xl font-bold">2,340</span>
              </div>
              <p className="text-blue-100">Successful Orders</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={24} />
                <span className="text-2xl font-bold">24hrs</span>
              </div>
              <p className="text-blue-100">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {sortedProducts.length} Products Found
          </h2>
          {verificationFilter !== 'all' && (
            <div className="flex items-center gap-2 text-blue-600">
              <Shield size={18} />
              <span className="text-sm font-medium">
                Showing {verificationFilter.replace('_', ' ')} vendors only
              </span>
            </div>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}