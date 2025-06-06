import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Search, Filter, MessageSquare, Send, Users, ShoppingBag, Star, MapPin, Phone, Shield } from 'lucide-react';

// Sample market data structure
const marketData = {
  'main-market': {
    name: 'Main Market',
    location: 'Central Bamenda',
    lines: {
      'onitsha-line': {
        name: 'Onitsha Line',
        description: 'Electronics and imported goods from major suppliers',
        category: 'Electronics',
        shops: [
          {
            id: 1,
            name: 'Onitsha Electronics Hub',
            vendor: 'Pierre Fotso',
            category: 'Electronics',
            rating: 4.8,
            trustCount: 127,
            phone: '+237 684 567 890',
            specialties: ['Smartphones', 'Laptops', 'Accessories'],
            image: '📱',
            verified: true,
            openHours: '8:00 AM - 8:00 PM'
          },
          {
            id: 2,
            name: 'Tech World Bamenda',
            vendor: 'Samuel Nkeng',
            category: 'Electronics',
            rating: 4.6,
            trustCount: 89,
            phone: '+237 695 678 901',
            specialties: ['Laptops', 'Gaming', 'Repairs'],
            image: '💻',
            verified: true,
            openHours: '9:00 AM - 7:00 PM'
          },
          {
            id: 3,
            name: 'Digital Solutions',
            vendor: 'Marie Kenne',
            category: 'Software',
            rating: 4.4,
            trustCount: 67,
            phone: '+237 676 789 012',
            specialties: ['Software', 'Training', 'Support'],
            image: '🖥️',
            verified: true,
            openHours: '8:30 AM - 6:00 PM'
          },
          {
            id: 4,
            name: 'Mobile World',
            vendor: 'John Bih',
            category: 'Electronics',
            rating: 4.7,
            trustCount: 156,
            phone: '+237 687 234 567',
            specialties: ['Mobile Phones', 'Accessories', 'Repairs'],
            image: '📱',
            verified: true,
            openHours: '8:00 AM - 9:00 PM'
          },
          {
            id: 5,
            name: 'Audio Visual Center',
            vendor: 'Grace Mundi',
            category: 'Audio/Video',
            rating: 4.5,
            trustCount: 92,
            phone: '+237 698 345 678',
            specialties: ['Sound Systems', 'Cameras', 'Installation'],
            image: '🎵',
            verified: true,
            openHours: '9:00 AM - 6:30 PM'
          },
          {
            id: 6,
            name: 'Computer Paradise',
            vendor: 'David Che',
            category: 'Computers',
            rating: 4.9,
            trustCount: 203,
            phone: '+237 679 456 789',
            specialties: ['Desktop PCs', 'Custom Builds', 'Components'],
            image: '🖥️',
            verified: true,
            openHours: '8:00 AM - 7:00 PM'
          }
        ]
      },
      'tailoring-line': {
        name: 'Tailoring Line',
        description: 'Professional tailors and fashion designers',
        category: 'Fashion',
        shops: [
          {
            id: 7,
            name: 'Fashion Excellence',
            vendor: 'Beatrice Awah',
            category: 'Tailoring',
            rating: 4.9,
            trustCount: 234,
            phone: '+237 687 890 123',
            specialties: ['Wedding Dresses', 'Custom Suits', 'Alterations'],
            image: '👗',
            verified: true,
            openHours: '7:30 AM - 7:30 PM'
          },
          {
            id: 8,
            name: 'Modern Styles',
            vendor: 'David Che',
            category: 'Fashion',
            rating: 4.7,
            trustCount: 178,
            phone: '+237 698 901 234',
            specialties: ['Men\'s Suits', 'Casual Wear', 'Corporate'],
            image: '👔',
            verified: true,
            openHours: '8:00 AM - 6:30 PM'
          }
        ]
      }
    }
  },
  'food-market': {
    name: 'Food Market',
    location: 'Near Main Market',
    lines: {
      'bali-line': {
        name: 'Bali Line',
        description: 'Fresh vegetables and organic produce',
        category: 'Fresh Produce',
        shops: [
          {
            id: 9,
            name: 'Bali Fresh Fruits',
            vendor: 'Sophie Atanga',
            category: 'Fruits',
            rating: 4.9,
            trustCount: 298,
            phone: '+237 681 234 567',
            specialties: ['Organic Fruits', 'Local Produce', 'Seasonal'],
            image: '🍎',
            verified: true,
            openHours: '5:00 AM - 6:00 PM'
          }
        ]
      }
    }
  }
};

// Category options for filtering
const categoryOptions = [
  'All Categories',
  'Electronics',
  'Software', 
  'Audio/Video',
  'Computers',
  'Tailoring',
  'Fashion',
  'Fruits',
  'Fresh Produce'
];

export default function MarketLine() {
  const { marketId, lineId } = useParams();
  
  // Component state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeChat, setActiveChat] = useState('general'); // 'general' or 'line'
  const [generalMessages, setGeneralMessages] = useState([
    { id: 1, user: 'MarketModerator', message: 'Welcome to Main Market general chat!', time: '10:30 AM', isSystem: true },
    { id: 2, user: 'PierreFotso', message: 'Good morning everyone! New smartphones just arrived at Onitsha Electronics Hub.', time: '10:45 AM' },
    { id: 3, user: 'SamuelNkeng', message: 'We have gaming laptops on special offer this week at Tech World.', time: '11:15 AM' },
  ]);
  const [lineMessages, setLineMessages] = useState([
    { id: 1, user: 'LineModerator', message: 'Welcome to Onitsha Line chat - Electronics specialists!', time: '10:30 AM', isSystem: true },
    { id: 2, user: 'PierreFotso', message: 'Just received latest iPhone models. First come, first served!', time: '11:00 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Get market and line data
  const market = marketData[marketId];
  const line = market?.lines?.[lineId];
  const shops = line?.shops || [];

  // Filter shops based on search and category
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || shop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [generalMessages, lineMessages, activeChat]);

  // Handle sending new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (activeChat === 'general') {
      setGeneralMessages(prev => [...prev, message]);
    } else {
      setLineMessages(prev => [...prev, message]);
    }
    
    setNewMessage('');
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!market || !line) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Line Not Found</h2>
          <p className="text-gray-600 mb-6">The market line you're looking for doesn't exist.</p>
          <Link to="/markets">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Browse All Markets
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="mb-6">
          <Link to={`/markets/${marketId}`}>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              <ArrowLeft size={20} />
              Back to {market.name}
            </button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
              {line.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6">
              {line.description} • {market.location}
            </p>

            {/* Search and Filter Section */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search shops, vendors, or products..."
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
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mt-4">
              <p className="text-gray-600">
                Showing {filteredShops.length} of {shops.length} shops
                {selectedCategory !== 'All Categories' && (
                  <span className="ml-2">
                    in <span className="font-semibold text-blue-600">{selectedCategory}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        {filteredShops.length === 0 ? (
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 mb-8">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Shops Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'All Categories' 
                ? 'No shops match your search criteria. Try adjusting your filters.'
                : 'No shops are currently available in this line.'
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-8">
            {filteredShops.map((shop) => (
              <div key={shop.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 relative h-full">
                  {/* Shop Header */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-4 text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-2">{shop.image}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {shop.verified && (
                          <Shield size={12} className="text-emerald-300" />
                        )}
                        <Star size={12} className="text-yellow-300 fill-current" />
                        <span className="text-xs font-semibold">{shop.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Shop Content */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-800 mb-1 leading-tight">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      by {shop.vendor}
                    </p>

                    {/* Trust Count */}
                    <div className="flex items-center gap-1 mb-2">
                      <Users size={10} className="text-emerald-500" />
                      <span className="text-xs text-gray-600">{shop.trustCount} trusted</span>
                    </div>

                    {/* Specialties */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {shop.specialties.slice(0, 2).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Actions */}
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                        View Shop
                      </button>
                      <div className="grid grid-cols-2 gap-1">
                        <button className="bg-emerald-500 text-white py-1 px-2 rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors duration-300">
                          WhatsApp
                        </button>
                        <button className="bg-gray-500 text-white py-1 px-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition-colors duration-300">
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
          {/* Chat Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setActiveChat('general')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeChat === 'general'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users size={18} />
              General Market Chat
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                {generalMessages.length}
              </span>
            </button>
            <button
              onClick={() => setActiveChat('line')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                activeChat === 'line'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ShoppingBag size={18} />
              {line.name} Chat
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                {lineMessages.length}
              </span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="bg-gray-50 rounded-2xl p-4 h-80 overflow-y-auto mb-4">
            <div className="space-y-4">
              {(activeChat === 'general' ? generalMessages : lineMessages).map((msg) => (
                <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isSystem
                      ? 'bg-yellow-100 text-yellow-800 text-center text-sm italic'
                      : msg.user === 'You'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    {!msg.isSystem && msg.user !== 'You' && (
                      <div className="text-xs font-semibold mb-1 text-blue-600">
                        {msg.user}
                      </div>
                    )}
                    <div className="text-sm">{msg.message}</div>
                    <div className={`text-xs mt-1 ${
                      msg.isSystem 
                        ? 'text-yellow-600'
                        : msg.user === 'You' 
                        ? 'text-blue-200' 
                        : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${activeChat === 'general' ? 'general market' : line.name} chat...`}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}