import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, X, MapPin, Star, Shield, ShoppingBag } from "lucide-react";
import { BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';

export default function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  // Fetch authentic data from APIs
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) return [];
      return response.json();
    }
  });

  const { data: auctions = [] } = useQuery({
    queryKey: ['/api/auctions'],
    queryFn: async () => {
      const response = await fetch('/api/auctions');
      if (!response.ok) return [];
      return response.json();
    }
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = [];

      // Search in products (Services and Real Estate)
      const matchingProducts = products.filter((item: any) => 
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query))
      ).slice(0, 5).map((item: any) => ({ ...item, type: 'product' }));

      // Search in auctions
      const matchingAuctions = auctions.filter((item: any) => 
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      ).slice(0, 3).map((item: any) => ({ ...item, type: 'auction' }));

      results.push(...matchingProducts, ...matchingAuctions);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const getResultLink = (result: any) => {
    switch (result.type) {
      case 'product': 
        if (result.category === 'Services') return '/services';
        if (result.category === 'Real Estate') return '/real-estate';
        return '/marketplace';
      case 'auction': return `/auction/${result.id}`;
      default: return '/marketplace';
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'listing': return <ShoppingBag className="w-5 h-5 text-blue-600" />;
      case 'market': return <BuildingStorefrontIcon className="w-5 h-5 text-green-600" />;
      case 'realestate': return <HomeModernIcon className="w-5 h-5 text-purple-600" />;
      case 'auction': return <CurrencyDollarIcon className="w-5 h-5 text-red-600" />;
      case 'business': return <Shield className="w-5 h-5 text-yellow-600" />;
      default: return <MapPin className="w-5 h-5 text-gray-600" />;
    }
  };

  const getResultPrice = (result: any) => {
    if (result.price) return result.price;
    if (result.originalPrice) return result.originalPrice;
    if (result.discountPrice) return result.discountPrice;
    return null;
  };

  return (
    <div className="relative flex-1 max-w-md" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search businesses, markets, properties..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && (searchQuery.length > 0 || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {searchQuery.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Search results for "{searchQuery}"
                </span>
                <span className="text-xs text-gray-500">
                  {searchResults.length} results
                </span>
              </div>
            </div>
          )}

          <div className="max-h-80 overflow-y-auto">
            {searchResults.length === 0 && searchQuery.length > 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Search size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-sm mt-1">Try different keywords or browse categories</p>
              </div>
            ) : (
              searchResults.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id || index}`}
                  to={getResultLink(result)}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchQuery("");
                    // Store search query in sessionStorage for destination page
                    sessionStorage.setItem('searchQuery', searchQuery);
                    sessionStorage.setItem('searchResult', JSON.stringify(result));
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {result.image ? (
                        <img 
                          src={result.image} 
                          alt={result.title || result.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                          {getResultIcon(result.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {result.title || result.name}
                        </h4>
                        {result.verified && (
                          <Shield className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize">
                          {result.type}
                        </span>
                        {(result.category || result.type === 'business') && (
                          <span className="text-xs text-gray-500">
                            {result.category || 'Business'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <MapPin size={12} />
                          <span>{result.location}</span>
                        </div>
                        {getResultPrice(result) && (
                          <span className="text-sm font-semibold text-green-600">
                            {getResultPrice(result)}
                          </span>
                        )}
                      </div>
                      {result.rating && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{result.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button 
                className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                onClick={() => {
                  setIsOpen(false);
                  sessionStorage.setItem('searchQuery', searchQuery);
                  setLocation('/marketplace');
                }}
              >
                View all results for "{searchQuery}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}