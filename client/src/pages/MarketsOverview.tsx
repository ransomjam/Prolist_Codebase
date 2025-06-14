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

// Organized shop data by market sections
const marketSections = {
  "Main Market": {
    "Electronics Line": [
      { id: 1, name: "Shop A-12", rent: 50000, size: "12m²", status: "available" },
      { id: 2, name: "Shop A-15", rent: 55000, size: "14m²", status: "available" },
      { id: 3, name: "Shop A-8", rent: 45000, size: "10m²", status: "occupied" }
    ],
    "Fashion Line": [
      { id: 4, name: "Shop B-3", rent: 45000, size: "10m²", status: "available" },
      { id: 5, name: "Shop B-7", rent: 48000, size: "11m²", status: "available" },
      { id: 6, name: "Shop B-12", rent: 42000, size: "9m²", status: "occupied" }
    ],
    "Food & Provisions": [
      { id: 7, name: "Shop C-5", rent: 40000, size: "8m²", status: "available" },
      { id: 8, name: "Shop C-9", rent: 43000, size: "9m²", status: "available" }
    ]
  },
  "Food Market": {
    "Fresh Produce": [
      { id: 9, name: "Shop D-4", rent: 35000, size: "8m²", status: "available" },
      { id: 10, name: "Shop D-7", rent: 38000, size: "9m²", status: "available" },
      { id: 11, name: "Shop D-12", rent: 40000, size: "10m²", status: "occupied" }
    ],
    "Meat & Fish": [
      { id: 12, name: "Shop E-2", rent: 42000, size: "10m²", status: "available" },
      { id: 13, name: "Shop E-6", rent: 45000, size: "11m²", status: "available" }
    ]
  },
  "Nkwen Market": {
    "Household Items": [
      { id: 14, name: "Shop F-1", rent: 25000, size: "6m²", status: "available" },
      { id: 15, name: "Shop F-4", rent: 28000, size: "7m²", status: "available" }
    ],
    "Local Crafts": [
      { id: 16, name: "Shop G-2", rent: 22000, size: "5m²", status: "available" },
      { id: 17, name: "Shop G-5", rent: 24000, size: "6m²", status: "occupied" }
    ]
  },
  "Mile 4 Market": {
    "General Goods": [
      { id: 18, name: "Shop H-3", rent: 40000, size: "15m²", status: "available" },
      { id: 19, name: "Shop H-8", rent: 38000, size: "13m²", status: "available" }
    ],
    "Clothing": [
      { id: 20, name: "Shop I-1", rent: 35000, size: "10m²", status: "available" },
      { id: 21, name: "Shop I-6", rent: 37000, size: "11m²", status: "occupied" }
    ]
  }
};

// Flatten markets for filtering
const markets = marketGroups.flatMap(group => 
  group.markets.map(market => ({ ...market, groupId: group.id, groupName: group.name }))
);

const categories = ['All Categories', 'General', 'Food & Agriculture'];

export default function MarketsOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showListingForm, setShowListingForm] = useState(false);
  const [listingFormType, setListingFormType] = useState<'choose-shop' | 'add-line' | 'appointment' | null>(null);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);

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

  const handleChooseShop = (market: string, line: string, shop: any) => {
    setSelectedShop({ ...shop, market, line });
    setShowRegistrationMessage(true);
    setTimeout(() => {
      setShowRegistrationMessage(false);
      setListingFormType('appointment');
    }, 2000);
  };

  const handleAddNewLine = (formData: any) => {
    setShowRegistrationMessage(true);
    setTimeout(() => {
      setShowRegistrationMessage(false);
      setListingFormType('appointment');
    }, 2000);
  };

  const handleBookAppointment = (appointmentData: any) => {
    alert(`Appointment booked successfully!\n\nAgent: ${appointmentData.agent}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\nLocation: ${appointmentData.location}\n\nYou will receive a confirmation SMS shortly.`);
    setShowListingForm(false);
    setListingFormType(null);
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

                  </div>
                  
                  {/* Market Group Details Below Image */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                      {group.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{group.markets.length}</div>
                          <div className="text-xs text-gray-600">Markets</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{group.totalVendors}+</div>
                          <div className="text-xs text-gray-600">Vendors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {group.markets.reduce((acc, market) => acc + (market.availableShops || 0), 0)}
                          </div>
                          <div className="text-xs text-gray-600">Available</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 shadow-lg">
                        Explore →
                      </div>
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

              {showRegistrationMessage ? (
                <div className="text-center py-12">
                  <div className="bg-orange-100 text-orange-800 p-6 rounded-xl mb-4">
                    <h3 className="text-xl font-bold mb-2">Physical Registration Required</h3>
                    <p className="text-sm">To complete your shop registration, you need to visit our office with required documents for verification.</p>
                  </div>
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-600 mt-4">Redirecting to appointment booking...</p>
                </div>
              ) : !listingFormType ? (
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
                <ShopSelectionForm 
                  marketSections={marketSections}
                  onSelectShop={handleChooseShop}
                  onBack={() => setListingFormType(null)}
                />
              ) : listingFormType === 'appointment' ? (
                <AppointmentBookingForm 
                  selectedShop={selectedShop}
                  onBookAppointment={handleBookAppointment}
                  onBack={() => setListingFormType(null)}
                />
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

// Shop Selection Form Component
function ShopSelectionForm({ marketSections, onSelectShop, onBack }: { 
  marketSections: any, 
  onSelectShop: (market: string, line: string, shop: any) => void, 
  onBack: () => void 
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Available Shops by Market</h3>
      <div className="space-y-6 max-h-96 overflow-y-auto">
        {Object.entries(marketSections).map(([marketName, lines]: [string, any]) => (
          <div key={marketName} className="border rounded-lg p-4">
            <h4 className="text-md font-semibold text-gray-900 mb-3">{marketName}</h4>
            
            {Object.entries(lines).map(([lineName, shops]: [string, any]) => (
              <div key={lineName} className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Store size={16} className="text-blue-600" />
                  {lineName}
                  <span className="text-xs text-gray-500">
                    ({shops.filter((s: any) => s.status === 'available').length} available)
                  </span>
                </h5>
                
                <div className="grid grid-cols-1 gap-2 ml-6">
                  {shops
                    .filter((shop: any) => shop.status === 'available')
                    .map((shop: any) => (
                    <div key={shop.id} className="border rounded-lg p-3 bg-gray-50 hover:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h6 className="font-medium text-sm">{shop.name}</h6>
                          <p className="text-xs text-gray-600">
                            Size: {shop.size} | Rent: {shop.rent.toLocaleString()} FCFA/month
                          </p>
                        </div>
                        <button
                          onClick={() => onSelectShop(marketName, lineName, shop)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={onBack}
        className="mt-4 text-gray-600 hover:text-gray-800"
      >
        ← Back to options
      </button>
    </div>
  );
}

// Appointment Booking Form Component
function AppointmentBookingForm({ selectedShop, onBookAppointment, onBack }: { 
  selectedShop: any, 
  onBookAppointment: (data: any) => void, 
  onBack: () => void 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    agent: '',
    date: '',
    time: '',
    location: 'ProList Office - Commercial Avenue'
  });

  const agents = [
    'Agent Sarah Mbah - Main Market Specialist',
    'Agent Paul Che - Food Market Expert', 
    'Agent Grace Nkeng - General Markets',
    'Agent John Tah - New Registrations'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBookAppointment(formData);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Book Agent Appointment</h3>
      
      {selectedShop && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-blue-900">Selected Shop</h4>
          <p className="text-sm text-blue-800">
            {selectedShop.name} - {selectedShop.market} ({selectedShop.line})
          </p>
          <p className="text-xs text-blue-700">
            Rent: {selectedShop.rent?.toLocaleString()} FCFA/month | Size: {selectedShop.size}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="6XX XXX XXX"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Agent</label>
          <select
            value={formData.agent}
            onChange={(e) => setFormData({...formData, agent: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select an agent</option>
            {agents.map(agent => (
              <option key={agent} value={agent}>{agent}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select time</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Required Documents</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• National ID Card or Passport</li>
            <li>• Business Registration Certificate (if applicable)</li>
            <li>• Tax Clearance Certificate</li>
            <li>• 2 Passport Photos</li>
            <li>• Proof of Address</li>
          </ul>
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
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </div>
      </form>
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