import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import OptimizedProductCard from '../components/OptimizedProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { Filter, ShoppingBag, Search, Package, Star, Eye, MessageCircle, Shield } from 'lucide-react';

export default function Listings() {
  const [category, setCategory] = useState("All");
  const [location] = useLocation();

  // Check URL parameters for category filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [location]);

  // Fetch all products from the database with optimized settings
  const { data: products = [], isLoading, error, refetch } = useQuery({
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
    refetchInterval: false // Disable auto-refetch for better performance
  });

  // Listen for storage events to refresh when products are added
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'product_added') {
        refetch();
        localStorage.removeItem('product_added');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refetch]);

  // Memoize filtered products for better performance
  const filteredProducts = useMemo(() => {
    return category === "All"
      ? products
      : products.filter((product: any) => product.category === category);
  }, [products, category]);

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

  // Generate categories dynamically from products, plus common categories
  const allCategories: string[] = ["All", "Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Automotive", "Services"];
  const productCategories: string[] = Array.from(new Set(products.map((product: any) => product.category).filter(Boolean)));
  const categories: string[] = Array.from(new Set([...allCategories, ...productCategories]));

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    // Update URL to reflect category filter
    const url = new URL(window.location.href);
    if (newCategory === "All") {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', newCategory);
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Explore Listings</h2>

      <div className="flex gap-4 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              category === cat 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-2 text-xs opacity-75">
                ({filteredProducts.filter((p: any) => p.category === cat).length})
              </span>
            )}
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
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">No image</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                      {/* Vendor Verification Status */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Vendor #{product.vendorId} - Basic Verified
                          </span>
                        </div>
                      </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                  <p className="text-green-600 font-bold text-lg mb-2">
                        {product.price.replace('$', '').includes('XAF') ? product.price.replace('$', '') : `${product.price.replace('$', '')} XAF`}
                      </p>
                    </span>
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