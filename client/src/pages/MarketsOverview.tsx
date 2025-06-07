import { Link } from 'wouter';
import { MapPin, Users, Star, Shield, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import foodMarketImage from '@assets/image_1749255445560.png';

const marketGroups = [
  {
    id: 'bamenda-markets',
    name: 'Bamenda Markets',
    description: 'Central markets serving Bamenda and surrounding areas',
    totalVendors: 1230,
    averageRating: 4.6,
    markets: [
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
      {
        id: 'mile-4-market',
        name: 'Mile 4 Market',
        description: 'Vibrant commercial hub serving the Mile 4 community with diverse goods and services.',
        vendors: 180,
        rating: 4.6,
        verified: true,
        sections: ['General Goods', 'Clothing', 'Food Items', 'Electronics'],
        category: 'General',
        location: 'Mile 4, Bamenda'
      },
      {
        id: 'nkwen-market',
        name: 'Nkwen Market',
        description: 'Community market in Nkwen offering fresh produce and essential household items.',
        vendors: 120,
        rating: 4.5,
        verified: true,
        sections: ['Fresh Produce', 'Household Items', 'Local Crafts', 'Provisions'],
        category: 'General',
        location: 'Nkwen, Bamenda'
      },
      {
        id: 'ntarinkon-market',
        name: 'Ntarinkon Market',
        description: 'Traditional market serving Ntarinkon area with agricultural products and daily necessities.',
        vendors: 95,
        rating: 4.4,
        verified: true,
        sections: ['Agricultural Products', 'Traditional Items', 'Food Supplies', 'Textiles'],
        category: 'Food & Agriculture',
        location: 'Ntarinkon, Bamenda'
      }
    ]
  },
  {
    id: 'kumba-markets',
    name: 'Kumba Markets',
    description: 'Commercial markets serving Kumba and the Southwest region',
    totalVendors: 420,
    averageRating: 4.5,
    markets: [
      {
        id: 'kumba-central-market',
        name: 'Kumba Central Market',
        description: 'Main commercial center of Kumba with extensive trading activities and diverse merchandise.',
        vendors: 240,
        rating: 4.6,
        verified: true,
        sections: ['General Merchandise', 'Food Products', 'Clothing', 'Electronics'],
        category: 'General',
        location: 'Central Kumba'
      },
      {
        id: 'kumba-farm-market',
        name: 'Kumba Farm Market',
        description: 'Agricultural hub specializing in fresh farm produce and livestock products from local farmers.',
        vendors: 180,
        rating: 4.4,
        verified: true,
        sections: ['Fresh Produce', 'Livestock Products', 'Agricultural Tools', 'Local Crops'],
        category: 'Food & Agriculture',
        location: 'Kumba Agricultural Zone'
      }
    ]
  }
];

// Flatten markets for filtering
const markets = marketGroups.flatMap(group => 
  group.markets.map(market => ({ ...market, groupId: group.id, groupName: group.name }))
);

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

        {/* Regional Markets Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2">
            Regional Markets
          </h1>
          <p className="text-gray-600">Authentic local markets with verified vendors across Cameroon</p>
        </div>

        {/* Compact Statistics Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Marketplace Statistics</h2>
            <p className="text-xs text-gray-500">Real-time data from regional markets</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-blue-600 mb-1">7</div>
              <div className="text-xs text-gray-600">Total Markets</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-emerald-600 mb-1">1,650+</div>
              <div className="text-xs text-gray-600">Verified Vendors</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-purple-600 mb-1">2</div>
              <div className="text-xs text-gray-600">Market Regions</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-teal-600 mb-1">4.6★</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Market Groups Display */}
        {marketGroups.length === 0 ? (
          <div className="text-center bg-white rounded-3xl shadow-xl p-12">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Markets Found</h3>
            <p className="text-gray-600 mb-6">No market regions are currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {marketGroups.map((group) => (
              <div key={group.id} className="group">
                <Link to={`/markets/${group.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative">
                    {/* Market Group Image */}
                    <div className="relative h-48 overflow-hidden">
                      {group.id === 'bamenda-markets' ? (
                        <img 
                          src={foodMarketImage} 
                          alt="Bamenda Markets"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center">
                          <div className="text-6xl opacity-30">🏪</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Stats Overlay */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Shield size={12} />
                          Verified Region
                        </div>
                        <div className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Star size={12} />
                          {group.averageRating}★
                        </div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Users size={12} />
                          {group.totalVendors}+
                        </div>
                      </div>

                      {/* Market Group Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
                          {group.name}
                        </h2>
                        <p className="text-white/90 text-sm mb-3">{group.description}</p>
                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{group.markets.length}</div>
                            <div className="text-xs text-white/80">Markets</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">{group.totalVendors}+</div>
                            <div className="text-xs text-white/80">Vendors</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="p-6 text-center">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-lg inline-block">
                        Explore {group.name} →
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