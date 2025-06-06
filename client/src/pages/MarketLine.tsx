import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Search, Filter, MessageSquare, Send, Users, ShoppingBag, Shield, Star, Phone, MessageCircle, Eye, Clock, Award, CheckCircle } from 'lucide-react';

interface Shop {
  id: number;
  name: string;
  category: string;
  vendor: string;
  trusted: boolean;
  rating: number;
  reviews: number;
  phone: string;
  specialties: string[];
  verified: boolean;
  yearsInBusiness: number;
  trustScore: number;
  followers?: number;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

const dummyShops: Shop[] = [
  { 
    id: 1, 
    name: 'Ngwa Electronics', 
    category: 'Electronics', 
    vendor: 'Emmanuel Ngwa', 
    trusted: true, 
    rating: 4.7, 
    reviews: 156,
    phone: '+237670123456',
    specialties: ['Smartphones', 'Laptops', 'Accessories'],
    verified: true,
    yearsInBusiness: 5,
    trustScore: 95,
    followers: 284
  },
  { 
    id: 2, 
    name: 'Mama Fabrics', 
    category: 'Tailoring', 
    vendor: 'Theresa Mbi', 
    trusted: true, 
    rating: 4.9, 
    reviews: 203,
    phone: '+237681234567',
    specialties: ['Traditional Wear', 'Modern Fashion', 'Alterations'],
    verified: true,
    yearsInBusiness: 8,
    trustScore: 98,
    followers: 452
  },
  { 
    id: 3, 
    name: 'Onitsha Imports', 
    category: 'Electronics', 
    vendor: 'Pierre Fotso', 
    trusted: false, 
    rating: 4.3, 
    reviews: 87,
    phone: '+237684567890',
    specialties: ['Import Electronics', 'Wholesale'],
    verified: false,
    yearsInBusiness: 2,
    trustScore: 72
  },
  { 
    id: 4, 
    name: 'Bali Fruits', 
    category: 'Food', 
    vendor: 'Sophie Atanga', 
    trusted: true, 
    rating: 4.8, 
    reviews: 134,
    phone: '+237681234567',
    specialties: ['Fresh Fruits', 'Organic Produce', 'Juices'],
    verified: true,
    yearsInBusiness: 6,
    trustScore: 92
  },
  { 
    id: 5, 
    name: 'Fresh Veggies', 
    category: 'Food', 
    vendor: 'David Nfah', 
    trusted: true, 
    rating: 4.6, 
    reviews: 98,
    phone: '+237692345678',
    specialties: ['Vegetables', 'Herbs', 'Spices'],
    verified: true,
    yearsInBusiness: 4,
    trustScore: 89
  },
  { 
    id: 6, 
    name: 'Kamer Tech', 
    category: 'Electronics', 
    vendor: 'Isaac Tanyi', 
    trusted: true, 
    rating: 4.5, 
    reviews: 112,
    phone: '+237673456789',
    specialties: ['Computer Repair', 'Software', 'Networking'],
    verified: true,
    yearsInBusiness: 7,
    trustScore: 91
  },
  { 
    id: 7, 
    name: 'Tailors United', 
    category: 'Tailoring', 
    vendor: 'Felicity Njie', 
    trusted: false, 
    rating: 4.2, 
    reviews: 45,
    phone: '+237687890123',
    specialties: ['Group Uniforms', 'Bulk Orders'],
    verified: false,
    yearsInBusiness: 1,
    trustScore: 68
  },
  { 
    id: 8, 
    name: 'Spice World', 
    category: 'Food', 
    vendor: 'James Mvondo', 
    trusted: true, 
    rating: 4.7, 
    reviews: 167,
    phone: '+237698901234',
    specialties: ['Local Spices', 'International Flavors', 'Seasonings'],
    verified: true,
    yearsInBusiness: 9,
    trustScore: 94
  },
  { 
    id: 9, 
    name: 'Tech Solutions', 
    category: 'Electronics', 
    vendor: 'Grace Mundi', 
    trusted: true, 
    rating: 4.8, 
    reviews: 189,
    phone: '+237679012345',
    specialties: ['Business Tech', 'Consulting', 'Installation'],
    verified: true,
    yearsInBusiness: 6,
    trustScore: 96
  },
  { 
    id: 10, 
    name: 'Fashion Hub', 
    category: 'Tailoring', 
    vendor: 'John Bih', 
    trusted: true, 
    rating: 4.6, 
    reviews: 145,
    phone: '+237690123456',
    specialties: ['Designer Wear', 'Accessories', 'Styling'],
    verified: true,
    yearsInBusiness: 5,
    trustScore: 88
  },
  { 
    id: 11, 
    name: 'Phone Palace', 
    category: 'Electronics', 
    vendor: 'Marie Kenne', 
    trusted: true, 
    rating: 4.9, 
    reviews: 234,
    phone: '+237676789012',
    specialties: ['Mobile Phones', 'Tablets', 'Warranties'],
    verified: true,
    yearsInBusiness: 8,
    trustScore: 97
  },
  { 
    id: 12, 
    name: 'Digital World', 
    category: 'Electronics', 
    vendor: 'David Che', 
    trusted: true, 
    rating: 4.4, 
    reviews: 76,
    phone: '+237687234567',
    specialties: ['Gaming', 'Entertainment', 'Digital Media'],
    verified: true,
    yearsInBusiness: 3,
    trustScore: 85
  },
];

const categories = ['All Categories', 'Electronics', 'Tailoring', 'Food'];

export default function MarketLine() {
  const { marketId, lineId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState('general');
  
  const [generalMessages, setGeneralMessages] = useState<Message[]>([
    { 
      id: 1,
      sender: 'Market Admin', 
      text: 'Welcome to the Main Market general chat!', 
      time: '9:30 AM',
      isSystem: true 
    },
    { 
      id: 2,
      sender: 'Pierre Fotso', 
      text: 'New smartphones just arrived at Onitsha Electronics!', 
      time: '10:15 AM' 
    },
    { 
      id: 3,
      sender: 'Sophie Atanga', 
      text: 'Fresh organic fruits available at Bali Fruits today.', 
      time: '10:45 AM' 
    },
  ]);
  
  const [lineMessages, setLineMessages] = useState<Message[]>([
    { 
      id: 1,
      sender: 'Line Moderator', 
      text: 'Welcome to Onitsha Line chat - Electronics specialists!', 
      time: '9:00 AM',
      isSystem: true 
    },
    { 
      id: 2,
      sender: 'Ngwa Electronics', 
      text: 'We have new phone accessories in stock!', 
      time: '9:30 AM' 
    },
    { 
      id: 3,
      sender: 'Kamer Tech', 
      text: 'Special discount on laptops this week!', 
      time: '10:00 AM' 
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const filteredShops = useMemo(() => {
    return dummyShops.filter(shop => {
      const matchesCategory = selectedCategory === 'All Categories' || shop.category === selectedCategory;
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           shop.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      sender: 'You',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    };
    
    if (activeChat === 'general') {
      setGeneralMessages(prev => [...prev, message]);
    } else {
      setLineMessages(prev => [...prev, message]);
    }
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handleCallClick = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleVendorChat = (vendor: string, shopName: string) => {
    alert(`Opening direct chat with ${vendor} from ${shopName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Compact Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <Link to={`/markets/${marketId}`}>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">Back to {marketId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span className="sm:hidden">Back</span>
              </button>
            </Link>
            <div className="text-center flex-1 mx-4">
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
                {lineId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                {lineId === 'onitsha-line' ? 'Electronics and imported goods' : 'Specialized vendors'}
              </p>
            </div>
            <div className="text-xs text-gray-500 hidden md:block">
              {filteredShops.length} shops
            </div>
          </div>
        </div>

        {/* Compact Chat Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-3 mb-4">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={20} />
              <div className="text-left">
                <div className="font-semibold text-sm">Market Chat</div>
                <div className="text-blue-100 text-xs">
                  {generalMessages.length + lineMessages.length} messages
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                {chatOpen ? 'Close' : 'Open'}
              </span>
              <div className={`transform transition-transform duration-300 ${chatOpen ? 'rotate-180' : ''}`}>
                ▼
              </div>
            </div>
          </button>

          {/* Expandable Chat Interface */}
          {chatOpen && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              {/* Chat Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1 mb-4">
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
                  Onitsha Line Chat
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                    {lineMessages.length}
                  </span>
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 border border-gray-300 rounded-2xl p-4 bg-gray-50">
                <div className="space-y-3">
                  {(activeChat === 'general' ? generalMessages : lineMessages).map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-xl ${
                        msg.isSystem
                          ? 'bg-yellow-100 text-yellow-800 text-center text-sm italic'
                          : msg.sender === 'You'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}>
                        {!msg.isSystem && msg.sender !== 'You' && (
                          <div className="text-xs font-semibold mb-1 text-blue-600">
                            {msg.sender}
                          </div>
                        )}
                        <div className="text-sm">{msg.text}</div>
                        <div className={`text-xs mt-1 ${
                          msg.isSystem 
                            ? 'text-yellow-600'
                            : msg.sender === 'You' 
                            ? 'text-blue-200' 
                            : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={`Message ${activeChat === 'general' ? 'general market' : 'Onitsha line'} chat...`}
                  className="flex-grow border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Minimal Search and Filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-8 pr-6 py-2 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer appearance-none min-w-[120px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {filteredShops.length} shops
          </span>
        </div>

        {/* Horizontal Shop Cards */}
        <div className="space-y-3">
          {filteredShops.length === 0 ? (
            <div className="col-span-full text-center bg-white rounded-3xl shadow-xl p-12">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Shops Found</h3>
              <p className="text-gray-600 mb-6">
                No shops match your search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredShops.map(shop => (
              <div key={shop.id} className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Shop Image Placeholder */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={20} className="sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  
                  {/* Shop Name & Status */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap sm:flex-nowrap">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{shop.name}</h3>
                      {shop.verified && (
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full text-xs flex-shrink-0">
                          <Shield size={10} className="sm:w-3 sm:h-3" />
                          <span className="hidden sm:inline">Verified</span>
                          <span className="sm:hidden">✓</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <Award size={12} className="sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-blue-600 font-medium">{shop.trustScore}%</span>
                      <span className="text-gray-500 hidden sm:inline">Trust Score</span>
                    </div>
                  </div>
                  
                  {/* View Button */}
                  <Link to={`/shop-profile/${shop.id}`} className="flex-shrink-0">
                    <button className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-xs sm:text-sm">
                      <Eye size={12} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">View</span>
                      <span className="sm:hidden">View</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}