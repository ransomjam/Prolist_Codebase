import { useState, useEffect } from 'react';
import { MapPin, Store, Search, Users, Clock, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MarketCard from '../components/MarketCard';

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState('');

  // Check for search query from global search
  useEffect(() => {
    const savedSearchQuery = sessionStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setSearchTerm(savedSearchQuery);
      sessionStorage.removeItem('searchQuery');
    }
  }, []);

  // Fetch real market data from API
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    }
  });

  // Create market data from actual product locations
  const marketLocations = [...new Set(products.map((p: any) => p.location).filter(Boolean))] as string[];
  const markets = marketLocations.map((location: string, index: number) => ({
    id: index + 1,
    name: `${location} Market`,
    location: location,
    vendors: products.filter((p: any) => p.location === location).length,
    description: `Local market serving the ${location} community`,
    image: '/api/placeholder/600/300'
  }));

  const filteredMarkets = markets.filter((market: any) =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMarkets = markets.length;
  const activeMarkets = markets.length;
  const totalVendors = products.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Markets in Bamenda</h1>
          <p className="text-gray-600 text-sm mb-4">Discover local markets and connect with vendors in your community</p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center relative overflow-hidden group hover:bg-blue-100 transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-float-gentle absolute top-2 right-2" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <Store className="text-blue-600 mx-auto mb-1 animate-float-icon" size={20} />
              <div className="text-lg font-bold text-blue-600 animate-float-number">{totalMarkets}</div>
              <div className="text-xs text-blue-700">Total Markets</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center relative overflow-hidden group hover:bg-green-100 transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-float-gentle absolute top-2 left-2" style={{ animationDelay: '1s' }}></div>
              </div>
              <Users className="text-green-600 mx-auto mb-1 animate-float-icon" size={20} style={{ animationDelay: '0.3s' }} />
              <div className="text-lg font-bold text-green-600 animate-float-number" style={{ animationDelay: '0.1s' }}>{totalVendors}+</div>
              <div className="text-xs text-green-700">Active Vendors</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center relative overflow-hidden group hover:bg-purple-100 transition-all duration-300">
              <div className="absolute inset-0 opacity-20">
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-float-gentle absolute bottom-2 right-2" style={{ animationDelay: '1.5s' }}></div>
              </div>
              <MapPin className="text-purple-600 mx-auto mb-1 animate-float-icon" size={20} style={{ animationDelay: '0.6s' }} />
              <div className="text-lg font-bold text-purple-600 animate-float-number" style={{ animationDelay: '0.2s' }}>6+</div>
              <div className="text-xs text-purple-700">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Market Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Main Market</h3>
              <p className="text-blue-100 text-sm">Bamenda's largest marketplace</p>
              <div className="flex items-center mt-2 text-sm">
                <Clock size={14} className="mr-1" />
                <span>Open 6 AM - 8 PM</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-300 mb-1">
                <Star size={16} className="mr-1 fill-current" />
                <span className="text-sm font-semibold">Featured</span>
              </div>
              <button className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-50 transition">
                Visit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="px-4 pb-6">
        {filteredMarkets.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">All Markets</h2>
              <span className="text-sm text-gray-600">{filteredMarkets.length} markets found</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMarkets.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Store size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No markets found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <MapPin size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Get Directions</span>
            </button>
            <button className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Clock size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Market Hours</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
