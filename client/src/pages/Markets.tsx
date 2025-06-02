import { useState } from 'react';
import { MapPin, Store, Search, Users, Clock, Star } from 'lucide-react';
import { markets } from '../data/demoData';
import MarketCard from '../components/MarketCard';

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = markets.filter(market =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMarkets = markets.length;
  const activeMarkets = markets.length; // All markets are active in demo
  const totalVendors = markets.length * 25; // Estimated vendors per market

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
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Store className="text-blue-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-blue-600">{totalMarkets}</div>
              <div className="text-xs text-blue-700">Total Markets</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <Users className="text-green-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-green-600">{totalVendors}+</div>
              <div className="text-xs text-green-700">Active Vendors</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <MapPin className="text-purple-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-purple-600">6+</div>
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
