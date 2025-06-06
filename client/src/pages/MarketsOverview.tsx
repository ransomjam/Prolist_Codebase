import { Link } from 'wouter';
import { MapPin, Users, Star, Shield, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

const markets = [
  {
    id: 'main-market',
    name: 'Main Market',
    description: 'Bamenda\'s busiest commercial hub with diverse sections offering everything from textiles to electronics.',
    vendors: 450,
    rating: 4.8,
    verified: true,
    sections: ['Electronics', 'Textiles', 'Food Items', 'Cosmetics'],
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
    id: 'computer-village',
    name: 'Computer Village',
    description: 'Technology hub specializing in computers, phones, and electronic accessories with expert repairs.',
    vendors: 120,
    rating: 4.7,
    verified: true,
    sections: ['Laptops', 'Smartphones', 'Accessories', 'Repairs'],
    category: 'Technology',
    location: 'Commercial Avenue'
  },
  {
    id: 'craft-market',
    name: 'Arts & Crafts Market',
    description: 'Traditional Cameroonian arts, crafts, and cultural items made by local artisans.',
    vendors: 85,
    rating: 4.6,
    verified: true,
    sections: ['Traditional Art', 'Jewelry', 'Sculptures', 'Textiles'],
    category: 'Arts & Culture',
    location: 'Cultural Center Area'
  },
  {
    id: 'motor-park',
    name: 'Motor Park Market',
    description: 'Automotive parts, accessories, and services including car repairs and maintenance.',
    vendors: 95,
    rating: 4.5,
    verified: true,
    sections: ['Auto Parts', 'Tires', 'Repairs', 'Accessories'],
    category: 'Automotive',
    location: 'Motor Park Area'
  },
  {
    id: 'night-market',
    name: 'Night Market',
    description: 'Evening entertainment, street food, and late-night shopping destination in central Bamenda.',
    vendors: 160,
    rating: 4.4,
    verified: true,
    sections: ['Street Food', 'Beverages', 'Entertainment', 'Snacks'],
    category: 'Entertainment & Food',
    location: 'City Center'
  }
];

const categories = ['All Categories', 'General', 'Food & Agriculture', 'Technology', 'Arts & Culture', 'Automotive', 'Entertainment & Food'];

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
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
            Bamenda Markets
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover authentic local markets offering everything from fresh produce to electronics. 
            Connect with trusted vendors and explore the vibrant commercial heart of Bamenda.
          </p>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search markets, locations, or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white cursor-pointer appearance-none min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Showing {filteredMarkets.length} of {markets.length} markets
                {selectedCategory !== 'All Categories' && (
                  <span className="ml-2">
                    in <span className="font-semibold text-blue-600">{selectedCategory}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Marketplace Statistics</h2>
            <p className="text-gray-600">Real-time data from Bamenda's marketplace ecosystem</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-sm sm:text-base text-gray-600">Major Markets</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">1,190+</div>
              <div className="text-sm sm:text-base text-gray-600">Verified Vendors</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600">Market Hours</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-600 mb-2">4.7★</div>
              <div className="text-sm sm:text-base text-gray-600">Avg Rating</div>
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
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative h-full">
                  {/* Market Image */}
                  <div className="relative h-56 lg:h-64 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 flex items-center justify-center">
                      <div className="text-6xl sm:text-7xl opacity-30">🏪</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Market Stats Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {market.verified && (
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <Shield size={12} />
                          Verified
                        </div>
                      )}
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Star size={12} />
                        {market.rating}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Users size={12} />
                        {market.vendors}+ vendors
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Info */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {market.name}
                      </h2>
                      <MapPin className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 flex-shrink-0 ml-2" size={20} />
                    </div>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                      {market.description}
                    </p>

                    {/* Market Sections */}
                    <div className="mb-6">
                      <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Available Sections</div>
                      <div className="flex flex-wrap gap-2">
                        {market.sections.slice(0, 3).map((section, idx) => (
                          <span
                            key={idx}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {section}
                          </span>
                        ))}
                        {market.sections.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            +{market.sections.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                        Open Now
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
                        Explore Market →
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