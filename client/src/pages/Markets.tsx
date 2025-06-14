import { useState, useEffect } from 'react';
import { MapPin, Store, Search, Users, Clock, Star, Building, ShoppingBag } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);

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

  // Create comprehensive market data with lines and shops
  const marketsData = [
    {
      id: 1,
      name: "Main Market",
      location: "Commercial Avenue",
      description: "Bamenda's largest marketplace with over 500 shops",
      totalShops: 150,
      activeShops: 120,
      lines: [
        {
          id: 1,
          name: "Electronics Line",
          shops: [
            { id: 1, name: "TechHub Electronics", owner: "John Doe", status: "claimed", category: "Electronics" },
            { id: 2, name: "Phone Repair Center", owner: "", status: "available", category: "Electronics" },
            { id: 3, name: "Computer World", owner: "Mary Ashu", status: "claimed", category: "Electronics" },
            { id: 4, name: "Gadget Zone", owner: "", status: "available", category: "Electronics" }
          ]
        },
        {
          id: 2,
          name: "Fashion Line",
          shops: [
            { id: 5, name: "Boutique Elegance", owner: "Sarah Mbah", status: "claimed", category: "Fashion" },
            { id: 6, name: "Men's Wear Hub", owner: "", status: "available", category: "Fashion" },
            { id: 7, name: "Kids Fashion", owner: "Grace Nkeng", status: "claimed", category: "Fashion" },
            { id: 8, name: "Shoes Paradise", owner: "", status: "available", category: "Fashion" }
          ]
        },
        {
          id: 3,
          name: "Food & Provisions",
          shops: [
            { id: 9, name: "Fresh Foods Market", owner: "Paul Che", status: "claimed", category: "Food" },
            { id: 10, name: "Spice Corner", owner: "", status: "available", category: "Food" },
            { id: 11, name: "Meat & Fish", owner: "Alice Fon", status: "claimed", category: "Food" },
            { id: 12, name: "Beverages Store", owner: "", status: "available", category: "Food" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Ntarikon Market",
      location: "Ntarikon Quarter",
      description: "Community market serving Ntarikon and surrounding areas",
      totalShops: 80,
      activeShops: 65,
      lines: [
        {
          id: 4,
          name: "General Merchandise",
          shops: [
            { id: 13, name: "General Store 1", owner: "Peter Tah", status: "claimed", category: "General" },
            { id: 14, name: "Hardware Store", owner: "", status: "available", category: "Hardware" },
            { id: 15, name: "Pharmacy", owner: "Dr. James", status: "claimed", category: "Health" },
            { id: 16, name: "Stationery Shop", owner: "", status: "available", category: "Stationery" }
          ]
        },
        {
          id: 5,
          name: "Fresh Produce",
          shops: [
            { id: 17, name: "Vegetable Corner", owner: "Maria Santos", status: "claimed", category: "Food" },
            { id: 18, name: "Fruit Stand", owner: "", status: "available", category: "Food" },
            { id: 19, name: "Local Herbs", owner: "Traditional Healer", status: "claimed", category: "Health" },
            { id: 20, name: "Organic Foods", owner: "", status: "available", category: "Food" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Up Station Market",
      location: "Up Station Area",
      description: "Strategic market location with high foot traffic",
      totalShops: 100,
      activeShops: 85,
      lines: [
        {
          id: 6,
          name: "Transportation Services",
          shops: [
            { id: 21, name: "Motor Parts", owner: "Engineer Mike", status: "claimed", category: "Automotive" },
            { id: 22, name: "Tire Center", owner: "", status: "available", category: "Automotive" },
            { id: 23, name: "Car Wash", owner: "Youth Group", status: "claimed", category: "Services" },
            { id: 24, name: "Mechanic Workshop", owner: "", status: "available", category: "Automotive" }
          ]
        }
      ]
    }
  ];

  const filteredMarkets = marketsData.filter((market) =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClaimShop = (shopId: number, shopName: string) => {
    // In a real app, this would open a shop claiming form
    alert(`Claiming process initiated for: ${shopName}\n\nYou'll be redirected to complete the verification process.`);
  };

  const totalMarkets = marketsData.length;
  const totalShops = marketsData.reduce((acc, market) => acc + market.totalShops, 0);
  const availableShops = marketsData.reduce((acc, market) => 
    acc + market.lines.reduce((lineAcc, line) => 
      lineAcc + line.shops.filter(shop => shop.status === 'available').length, 0
    ), 0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white">
          <div className="px-4 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Bamenda Markets</h1>
                <p className="text-green-100 text-sm">Find and claim your shop space</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30">
                <Store size={20} />
                List Your Shop
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
              onClick={() => setSelectedMarket(selectedMarket ? null : 1)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30"
            >
              <Store size={20} />
              List Your Shop
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search markets, locations, or shop types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <Store className="text-green-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-900">{totalMarkets}</div>
            <div className="text-sm text-gray-600">Active Markets</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <Building className="text-blue-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-900">{totalShops}</div>
            <div className="text-sm text-gray-600">Total Shops</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <ShoppingBag className="text-orange-600 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-900">{availableShops}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>

        {/* Markets List */}
        <div className="space-y-6">
          {filteredMarkets.map((market) => (
            <div key={market.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Market Header */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{market.name}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{market.location}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{market.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {market.activeShops}/{market.totalShops} Active
                    </div>
                    <button
                      onClick={() => setSelectedMarket(selectedMarket === market.id ? null : market.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      {selectedMarket === market.id ? 'Hide Shops' : 'View Shops'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Market Lines and Shops */}
              {selectedMarket === market.id && (
                <div className="p-6">
                  <div className="space-y-6">
                    {market.lines.map((line) => (
                      <div key={line.id}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Store className="w-5 h-5 text-blue-600" />
                          {line.name}
                          <span className="text-sm text-gray-500 ml-2">
                            ({line.shops.filter(s => s.status === 'available').length} available)
                          </span>
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {line.shops.map((shop) => (
                            <div key={shop.id} className="bg-gray-50 rounded-lg p-4 border">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{shop.name}</h4>
                                  <p className="text-sm text-gray-600">{shop.category}</p>
                                  {shop.owner && (
                                    <p className="text-xs text-green-600 mt-1">Owner: {shop.owner}</p>
                                  )}
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  shop.status === 'claimed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {shop.status === 'claimed' ? 'Claimed' : 'Available'}
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                {shop.status === 'available' ? (
                                  <button
                                    onClick={() => handleClaimShop(shop.id, shop.name)}
                                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                                  >
                                    Claim Shop
                                  </button>
                                ) : (
                                  <button className="flex-1 bg-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm font-semibold cursor-not-allowed">
                                    Claimed
                                  </button>
                                )}
                                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                  Info
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No markets found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms</p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}