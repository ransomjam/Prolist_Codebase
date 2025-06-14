import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import OptimizedProductCard from '../components/OptimizedProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { Filter, ShoppingBag, Shield, Star, Eye, MessageCircle } from 'lucide-react';
import ChatBox from '@/components/ChatBox';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location?: string;
  vendorId: number;
  viewCount?: number;
  createdAt: string;
  imageUrls?: string[];
  image?: string; // Keep for backwards compatibility
  marketId?: string;
  marketLine?: string;
}

export default function ProductFeed() {
  const [filter, setFilter] = useState('');
  const [marketLineFilter, setMarketLineFilter] = useState('');
  const [marketFilter, setMarketFilter] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<{vendorId: number, vendorName: string, productTitle: string} | null>(null);

  // Fetch vendor applications and users data
  const { data: vendorApplications = [] } = useQuery({
    queryKey: ['/api/vendor/applications'],
    queryFn: async () => {
      const response = await fetch('/api/vendor/applications');
      if (!response.ok) return [];
      return response.json();
    }
  });

  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) return [];
      return response.json();
    }
  });

  // Combine vendor applications with user data
  const vendors = vendorApplications.reduce((acc: any, vendor: any) => {
    const user = users.find((u: any) => u.id === vendor.userId);
    acc[vendor.userId] = {
      ...vendor,
      username: user?.username || vendor.fullName,
      fullName: vendor.fullName
    };
    return acc;
  }, {});

  const handleChatVendor = (product: Product) => {
    const vendor = vendors[product.vendorId];
    setSelectedVendor({
      vendorId: product.vendorId,
      vendorName: vendor?.fullName || `Vendor #${product.vendorId}`,
      productTitle: product.title
    });
    setShowChat(true);
  };

  // Check URL parameters for market line filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lineParam = urlParams.get('line');
    const marketParam = urlParams.get('market');
    
    if (lineParam) {
      setMarketLineFilter(lineParam);
    }
    if (marketParam) {
      setMarketFilter(marketParam);
    }
  }, []);

  // Fetch products from the API with optimization
  const { data: dbProducts = [], isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchInterval: false
  });

  // Use only authentic database products and sort by latest first
  const allProducts = useMemo(() => 
    dbProducts.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ), [dbProducts]
  );

  const filtered = useMemo(() => 
    allProducts.filter((p: Product) => {
      const categoryMatch = filter ? p.category === filter : true;
      const marketLineMatch = marketLineFilter ? p.marketLine === marketLineFilter : true;
      const marketMatch = marketFilter ? p.marketId === marketFilter : true;
      
      return categoryMatch && marketLineMatch && marketMatch;
    }), [allProducts, filter, marketLineFilter, marketFilter]
  );

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Phones', label: 'Phones' },
    { value: 'Shoes', label: 'Shoes' },
    { value: 'Clothes', label: 'Clothes' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Assets', label: 'Assets' },
    { value: 'Services', label: 'Services' },
    { value: 'Real Estate', label: 'Real Estate' }
  ];

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
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
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 leading-tight">
            {marketLineFilter ? `${marketLineFilter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Products` : 'All Products'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Trusted products from verified vendors
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="min-w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="inline w-4 h-4 mr-1" />
              Category
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingBag className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            {filter || marketLineFilter 
              ? "Try adjusting your filters to see more products." 
              : "No products have been listed yet. Be the first to add a product!"}
          </p>
          <a
            href="/product-listing"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Add Product
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product: Product, index: number) => (
            <OptimizedProductCard
              key={product.id}
              product={product}
              priority={index < 8}
              onProductClick={(id) => window.location.href = `/product/${id}`}
            />
          ))}
        </div>
      )}

      {/* Chat Component */}
      {showChat && selectedVendor && (
        <ChatBox
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          vendorId={selectedVendor.vendorId}
          vendorName={selectedVendor.vendorName}
          productTitle={selectedVendor.productTitle}
        />
      )}
    </div>
  );
}