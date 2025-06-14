import { Link } from 'wouter';
import { MapPin, Users, Star, Shield, Search, Filter, Store, Plus, Building } from 'lucide-react';
import { useState, useMemo } from 'react';
import foodMarketImage from '@assets/image_1749255445560.png';
import bamendaMarketsImage from '@assets/image_1749257345512.png';

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
        location: 'Central Bamenda',
        availableShops: 15
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
        location: 'Near Main Market',
        availableShops: 8
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
        location: 'Mile 4, Bamenda',
        availableShops: 12
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
        location: 'Nkwen, Bamenda',
        availableShops: 6
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
        location: 'Ntarinkon, Bamenda',
        availableShops: 4
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
        location: 'Central Kumba',
        availableShops: 18
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
        location: 'Kumba Agricultural Zone',
        availableShops: 10
      }
    ]
  }
];

// Sample available shops data for forms
const availableShops = [
  { id: 1, name: "Shop A-12", market: "Main Market", line: "Electronics Line", rent: 50000, size: "12m²" },
  { id: 2, name: "Shop B-8", market: "Main Market", line: "Fashion Line", rent: 45000, size: "10m²" },
  { id: 3, name: "Shop C-15", market: "Food Market", line: "Fresh Produce", rent: 35000, size: "8m²" },
  { id: 4, name: "Shop D-3", market: "Nkwen Market", line: "Household Items", rent: 25000, size: "6m²" },
  { id: 5, name: "Shop E-7", market: "Mile 4 Market", line: "General Goods", rent: 40000, size: "15m²" }
];

// Flatten markets for filtering
const markets = marketGroups.flatMap(group => 
  group.markets.map(market => ({ ...market, groupId: group.id, groupName: group.name }))
);

const categories = ['All Categories', 'General', 'Food & Agriculture'];

export default function MarketsOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showListingForm, setShowListingForm] = useState(false);
  const [listingFormType, setListingFormType] = useState<'choose-shop' | 'add-line' | null>(null);
  const [selectedShop, setSelectedShop] = useState<any>(null);

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           market.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || market.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleListYourShop = () => {
    setShowListingForm(true);
    setListingFormType(null);
  };

  const handleChooseShop = (shop: any) => {
    setSelectedShop(shop);
    // In real app, this would redirect to shop claiming form
    alert(`Selected: ${shop.name} in ${shop.market}\nRent: ${shop.rent} FCFA/month\nSize: ${shop.size}\n\nProceed to claim this shop?`);
  };

  const handleAddNewLine = (formData: any) => {
    // In real app, this would submit to backend
    alert(`New market line request submitted:\nMarket: ${formData.market}\nLine Name: ${formData.lineName}\nShop Count: ${formData.shopCount}`);
    setShowListingForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Bamenda Markets</h1>
              <p className="text-green-100 text-sm">Find and claim your shop space</p>
            </div>
            <button 
              onClick={handleListYourShop}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 border border-white/30"
            >
              <Store size={20} />
              List Your Shop
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-3 mb-6">
          <div className="flex gap-2 items-center">
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
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              {filteredMarkets.length} of {markets.length} markets
              {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Regional Markets Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2">
            Regional Markets
          </h1>
          <p className="text-gray-600">Authentic local markets with verified vendors across Cameroon</p>
        </div>

        {/* Statistics Dashboard */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {marketGroups.map((group) => (
            <div key={group.id} className="group">
              <Link to={`/markets/${group.id}`}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.02] relative">
                  {/* Market Group Image */}
                  <div className="relative h-48 overflow-hidden">
                    {group.id === 'bamenda-markets' ? (
                      <img 
                        src={bamendaMarketsImage} 
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
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200">
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
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {group.markets.reduce((acc, market) => acc + (market.availableShops || 0), 0)}
                          </div>
                          <div className="text-xs text-white/80">Available</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="p-6 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 shadow-lg inline-block">
                      Explore {group.name} →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* List Your Shop Modal */}
      {showListingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">List Your Shop</h2>
                <button 
                  onClick={() => setShowListingForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {!listingFormType ? (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-6">Choose how you'd like to list your shop:</p>
                  
                  <button
                    onClick={() => setListingFormType('choose-shop')}
                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Store className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Choose Available Shop</h3>
                        <p className="text-gray-600 text-sm">Select from existing available shop spaces</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setListingFormType('add-line')}
                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Plus className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Add New Market Line</h3>
                        <p className="text-gray-600 text-sm">Request to add a new market line with shops</p>
                      </div>
                    </div>
                  </button>
                </div>
              ) : listingFormType === 'choose-shop' ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Available Shops</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {availableShops.map(shop => (
                      <div key={shop.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{shop.name}</h4>
                            <p className="text-sm text-gray-600">{shop.market} - {shop.line}</p>
                            <p className="text-sm text-gray-500">Size: {shop.size} | Rent: {shop.rent.toLocaleString()} FCFA/month</p>
                          </div>
                          <button
                            onClick={() => handleChooseShop(shop)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setListingFormType(null)}
                    className="mt-4 text-gray-600 hover:text-gray-800"
                  >
                    ← Back to options
                  </button>
                </div>
              ) : (
                <AddMarketLineForm 
                  onSubmit={handleAddNewLine}
                  onBack={() => setListingFormType(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add Market Line Form Component
function AddMarketLineForm({ onSubmit, onBack }: { onSubmit: (data: any) => void, onBack: () => void }) {
  const [formData, setFormData] = useState({
    market: '',
    lineName: '',
    shopCount: 1,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Add New Market Line</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
          <select
            value={formData.market}
            onChange={(e) => setFormData({...formData, market: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Market</option>
            <option value="main-market">Main Market</option>
            <option value="food-market">Food Market</option>
            <option value="nkwen-market">Nkwen Market</option>
            <option value="mile-4-market">Mile 4 Market</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Line Name</label>
          <input
            type="text"
            value={formData.lineName}
            onChange={(e) => setFormData({...formData, lineName: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Hardware Line, Beauty Products Line"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Shops</label>
          <input
            type="number"
            min="1"
            max="50"
            value={formData.shopCount}
            onChange={(e) => setFormData({...formData, shopCount: parseInt(e.target.value)})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Describe the type of businesses this line will serve..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}