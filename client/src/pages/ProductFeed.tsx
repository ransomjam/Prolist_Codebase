import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filter, ShoppingBag, Shield, Star, Eye, MessageCircle } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
import { listings, realEstate } from '../data/demoData';

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
  image?: string;
  marketId?: string;
  marketLine?: string;
}

export default function ProductFeed() {
  const [filter, setFilter] = useState('');
  const [marketLineFilter, setMarketLineFilter] = useState('');
  const [marketFilter, setMarketFilter] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<{vendorId: number, vendorName: string, productTitle: string} | null>(null);

  // Fetch vendor information for chat
  const { data: vendors = {} } = useQuery({
    queryKey: ['/api/vendor/applications'],
    queryFn: async () => {
      const response = await fetch('/api/vendor/applications');
      if (!response.ok) return {};
      const vendorList = await response.json();
      // Convert array to object for quick lookup
      return vendorList.reduce((acc: any, vendor: any) => {
        acc[vendor.userId] = vendor;
        return acc;
      }, {});
    }
  });

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

  // Fetch products from the API
  const { data: dbProducts = [], isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  // Transform demo data to match Product interface (for display only)
  const demoProducts = [
    ...listings.map(item => ({
      id: item.id + 10000, // High offset to avoid conflicts with real products
      title: item.title,
      category: item.category,
      price: item.price.replace(' FCFA', ''),
      description: `Quality ${item.category.toLowerCase()} item available in ${item.location}. Demo listing.`,
      location: item.location,
      vendorId: 999, // Demo vendor ID
      viewCount: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      image: item.image,
      isDemo: true
    })),
    ...realEstate.map(item => ({
      id: item.id + 20000, // High offset to avoid conflicts
      title: item.title,
      category: 'Real Estate',
      price: item.price.replace(' FCFA', '').replace('/month', ''),
      description: `Premium real estate property in ${item.location}. Demo listing.`,
      location: item.location,
      vendorId: 999, // Demo vendor ID
      viewCount: Math.floor(Math.random() * 150),
      createdAt: new Date().toISOString(),
      image: item.image,
      isDemo: true
    }))
  ];

  // Combine database products with demo products
  const allProducts = [...dbProducts, ...demoProducts];

  const filtered = allProducts.filter((p: Product) => {
    const categoryMatch = filter ? p.category === filter : true;
    const marketLineMatch = marketLineFilter ? p.marketLine === marketLineFilter : true;
    const marketMatch = marketFilter ? p.marketId === marketFilter : true;
    
    return categoryMatch && marketLineMatch && marketMatch;
  });

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
          {filtered.map((product: Product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {product.viewCount || 0}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{product.location || 'Bamenda'}</span>
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={`/product/${product.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </a>
                  <button
                    onClick={() => handleChatVendor(product)}
                    className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
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