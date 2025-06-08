import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, X, MapPin, Star, Shield, ShoppingBag, Filter, TrendingUp, Clock, Users } from "lucide-react";
import { BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useQuery } from "@tanstack/react-query";

interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  type: 'product' | 'market' | 'service' | 'user' | 'category';
  image?: string;
  price?: string;
  rating?: number;
  location?: string;
  verified?: boolean;
  link: string;
}

export default function EnhancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  // Popular searches and quick categories
  const popularSearches = [
    "Electronics", "Clothing", "Food items", "Home decor", "Mobile phones"
  ];

  const quickCategories = [
    { name: "Products", icon: ShoppingBag, link: "/products", color: "text-blue-600" },
    { name: "Markets", icon: BuildingStorefrontIcon, link: "/markets", color: "text-green-600" },
    { name: "Real Estate", icon: HomeModernIcon, link: "/realestate", color: "text-purple-600" },
    { name: "Auctions", icon: CurrencyDollarIcon, link: "/auctions", color: "text-red-600" }
  ];

  // Get products for search
  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    enabled: searchQuery.length > 0
  });

  // Type guard for products array
  const typedProducts = Array.isArray(products) ? products : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          } else if (searchQuery.trim()) {
            // Navigate to search results page
            setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, searchResults, searchQuery, setLocation]);

  // Perform search
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      
      // Simulate search delay
      const timeoutId = setTimeout(() => {
        const query = searchQuery.toLowerCase();
        const results: SearchResult[] = [];

        // Search in products
        if (typedProducts.length > 0) {
          const matchingProducts = typedProducts
            .filter((product: any) => 
              product.title?.toLowerCase().includes(query) ||
              product.category?.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query)
            )
            .slice(0, 5)
            .map((product: any) => ({
              id: `product-${product.id}`,
              title: product.title,
              subtitle: product.category,
              type: 'product' as const,
              price: product.price ? `${product.price} FCFA` : undefined,
              location: product.location,
              image: product.imageUrls?.[0],
              link: `/product/${product.id}`
            }));
          
          results.push(...matchingProducts);
        }

        // Add some category matches
        const categories = ["Electronics", "Clothing", "Food & Beverages", "Home & Garden", "Sports"];
        const matchingCategories = categories
          .filter(cat => cat.toLowerCase().includes(query))
          .slice(0, 2)
          .map(cat => ({
            id: `category-${cat}`,
            title: cat,
            subtitle: "Browse category",
            type: 'category' as const,
            link: `/products?category=${encodeURIComponent(cat.toLowerCase())}`,
          }));
        
        results.push(...matchingCategories);

        setSearchResults(results);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]); // Remove typedProducts from dependencies

  const handleResultClick = (result: SearchResult) => {
    setLocation(result.link);
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(-1);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'product': return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'category': return <Filter className="w-4 h-4 text-gray-600" />;
      case 'market': return <BuildingStorefrontIcon className="w-4 h-4 text-green-600" />;
      case 'service': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'user': return <Users className="w-4 h-4 text-orange-600" />;
      default: return <Search className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products, services, markets..."
              className="w-full pl-10 pr-10 py-2.5 bg-gray-100 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setSelectedIndex(-1);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {searchQuery.trim().length === 0 ? (
            /* Quick Access */
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Access</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.link}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <category.icon className={`w-4 h-4 ${category.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setSearchQuery(search);
                        setLocation(`/products?search=${encodeURIComponent(search)}`);
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-6 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Search size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="font-medium">No results found</p>
                  <p className="text-sm mt-1">Try different keywords or</p>
                  <button
                    onClick={() => {
                      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
                      setIsOpen(false);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                  >
                    Browse all products →
                  </button>
                </div>
              ) : (
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={result.id}
                      className={`w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === selectedIndex ? 'bg-blue-50 border-blue-100' : ''
                      }`}
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {result.image ? (
                            <img 
                              src={result.image} 
                              alt={result.title}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              {getResultIcon(result.type)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm text-gray-900 truncate">
                              {result.title}
                            </h4>
                            {result.verified && (
                              <Shield className="w-3 h-3 text-green-600" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {result.subtitle && (
                              <span className="text-xs text-gray-500">{result.subtitle}</span>
                            )}
                            {result.location && (
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {result.location}
                              </span>
                            )}
                          </div>
                        </div>
                        {result.price && (
                          <div className="text-right">
                            <div className="font-semibold text-sm text-green-600">
                              {result.price}
                            </div>
                            {result.rating && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {result.rating}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {searchResults.length > 0 && (
                    <div className="p-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
                          setIsOpen(false);
                        }}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}