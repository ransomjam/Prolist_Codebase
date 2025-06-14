import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Building, MapPin, Eye, MessageCircle, Shield, Star } from 'lucide-react';

export default function RealEstate() {
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

  // Fetch all products from the database
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    refetchOnWindowFocus: true,
    refetchInterval: 30000
  });

  // Listen for storage events to refresh when properties are added
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

  // Filter for real estate only
  const realEstateProducts = products.filter((product: any) => product.category === 'Real Estate');

  const filteredProducts = category === "All"
    ? realEstateProducts
    : realEstateProducts.filter((product: any) => {
        if (category === 'Houses') {
          return product.title.toLowerCase().includes('house') || 
                 product.title.toLowerCase().includes('duplex') ||
                 product.title.toLowerCase().includes('villa');
        }
        if (category === 'Apartments') {
          return product.title.toLowerCase().includes('apartment') || 
                 product.title.toLowerCase().includes('studio') ||
                 product.title.toLowerCase().includes('flat');
        }
        if (category === 'Commercial') {
          return product.title.toLowerCase().includes('commercial') || 
                 product.title.toLowerCase().includes('office') ||
                 product.title.toLowerCase().includes('shop');
        }
        return product.category === category;
      });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="px-4 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Verified Real Estate</h1>
                <p className="text-blue-100 text-sm">Trusted properties in Bamenda</p>
              </div>
              <button 
                onClick={() => window.location.href = '/real-estate-listing'}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30"
              >
                <Building size={20} />
                List Property
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="px-4 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Verified Real Estate</h1>
                <p className="text-blue-100 text-sm">Trusted properties in Bamenda</p>
              </div>
              <button 
                onClick={() => window.location.href = '/real-estate-listing'}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30"
              >
                <Building size={20} />
                List Property
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-gray-600">Failed to load properties. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  // Property categories based on actual data
  const allCategories = ["All", "Houses", "Apartments", "Commercial", "Land"];
  const productCategories = Array.from(new Set(realEstateProducts.map((product: any) => product.subcategory).filter(Boolean)));
  const categories = Array.from(new Set([...allCategories, ...productCategories]));

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const url = new URL(window.location.href);
    if (newCategory === "All") {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', newCategory);
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Verified Real Estate</h1>
              <p className="text-blue-100 text-sm">Trusted properties in Bamenda</p>
            </div>
            <button 
              onClick={() => window.location.href = '/real-estate-listing'}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30"
            >
              <Building size={20} />
              List Property
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex gap-4 mb-6 overflow-x-auto">
          {categories.map((cat: string) => (
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
                  ({filteredProducts.filter((p: any) => {
                    if (cat === 'Houses') {
                      return p.title.toLowerCase().includes('house') || 
                             p.title.toLowerCase().includes('duplex') ||
                             p.title.toLowerCase().includes('villa');
                    }
                    if (cat === 'Apartments') {
                      return p.title.toLowerCase().includes('apartment') || 
                             p.title.toLowerCase().includes('studio') ||
                             p.title.toLowerCase().includes('flat');
                    }
                    if (cat === 'Commercial') {
                      return p.title.toLowerCase().includes('commercial') || 
                             p.title.toLowerCase().includes('office') ||
                             p.title.toLowerCase().includes('shop');
                    }
                    return p.category === cat;
                  }).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">
              {category === "All" 
                ? "No real estate properties have been listed yet. Be the first to add a property!" 
                : `No properties found in the ${category} category.`}
            </p>
            <a
              href="/real-estate-listing"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Building className="w-5 h-5" />
              List Your Property
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((property: any) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  {property.imageUrls && property.imageUrls.length > 0 ? (
                    <img 
                      src={property.imageUrls[0]} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <Building className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {property.title}
                    </h3>
                    {property.verified && (
                      <Shield className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  
                  {property.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {property.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-green-600">
                      {parseInt(property.price).toLocaleString()} XAF
                    </div>
                    <div className="text-xs text-gray-500">
                      {property.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{property.viewCount || 0} views</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>5.0</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={`/product/${property.id}`}
                      className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-center text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </a>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}