import { Link } from 'wouter';
import { MapPin, Users, Star, Shield, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import foodMarketImage from '@assets/image_1749255445560.png';

const markets = [
  {
    id: 'main-market',
    name: 'Main Market',
    description: 'Bamenda\'s busiest commercial hub with diverse sections offering everything from textiles to electronics.',
    vendors: 555,
    rating: 4.8,
    verified: true,
    sections: ['Electronics', 'Textiles', 'Fashion', 'Food Items', 'Cosmetics'],
    category: 'General',
    location: 'Central Bamenda'
  },
  {
    id: 'food-market',
    name: 'Food Market',
    description: 'Fresh produce and food items at competitive prices. The best place for organic vegetables and local spices.',
    vendors: 280,
    rating: 4.9,
    verified: true,
    sections: ['Fresh Produce', 'Meat & Fish', 'Spices', 'Grains'],
    category: 'Food & Agriculture',
    location: 'Near Main Market'
  },

];

const categories = ['All Categories', 'General', 'Food & Agriculture'];

export default function MarketsOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || market.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2 text-center">
            Bamenda Markets
          </h1>
          <p className="text-sm text-gray-600 text-center mb-3">
            Discover authentic local markets with trusted vendors
          </p>

          {/* Compact Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg p-3 mb-3">
            <div className="flex gap-2 items-center">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-6 py-2 border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 bg-white cursor-pointer appearance-none min-w-[160px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Compact Results Counter */}
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                {filteredMarkets.length} of {markets.length} markets
                {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
              </p>
            </div>
          </div>
        </div>

        {/* Compact Statistics Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Marketplace Statistics</h2>
            <p className="text-xs text-gray-500">Real-time data from Bamenda markets</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-blue-600 mb-1">2</div>
              <div className="text-xs text-gray-600">Major Markets</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-emerald-600 mb-1">835+</div>
              <div className="text-xs text-gray-600">Verified Vendors</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-xs text-gray-600">Market Hours</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-teal-600 mb-1">4.8★</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length === 0 ? (
          <div className="text-center bg-white rounded-3xl shadow-xl p-12">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Markets Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'All Categories' 
                ? `No markets match your search criteria. Try adjusting your filters or search terms.`
                : 'No markets are currently available.'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-10">
            {filteredMarkets.map((market, index) => (
            <div key={market.id} className="group">
              <Link to={`/markets/${market.id}`}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative">
                  {/* Compact Market Image */}
                  <div className="relative h-32 overflow-hidden">
                    {market.id === 'food-market' ? (
                      <img 
                        src={foodMarketImage} 
                        alt="Bamenda Food Market"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 flex items-center justify-center">
                        <div className="text-4xl opacity-30">🏪</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                    
                    {/* Compact Stats Overlay */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      {market.verified && (
                        <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Shield size={10} />
                          Verified
                        </div>
                      )}
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star size={10} />
                        {market.rating}
                      </div>
                    </div>

                    <div className="absolute top-2 right-2">
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Users size={10} />
                        {market.vendors}+
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Market Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {market.name}
                      </h2>
                      <MapPin className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300" size={16} />
                    </div>

                    {/* Centered Action Button */}
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-lg inline-block">
                        Explore Now →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Want to List Your Market or Shop?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join Bamenda's largest digital marketplace and connect with thousands of potential customers.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Submit Market Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}