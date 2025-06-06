import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Search, Filter, MessageSquare, Send, Users, ShoppingBag, Shield, Star, Phone, MessageCircle, Eye, Clock, Award } from 'lucide-react';

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
    trustScore: 95
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
    trustScore: 98
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
        
        {/* Header Navigation */}
        <div className="mb-6">
          <Link to="/markets">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              <ArrowLeft size={20} />
              Back to Markets
            </button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
            Market Line: Onitsha Line
          </h1>
          <p className="text-lg text-gray-600">Electronics and imported goods from major suppliers</p>
        </div>

        {/* Interactive Chat Button at Top */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 mb-8">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={24} />
              <div className="text-left">
                <div className="font-semibold">Market Chat Groups</div>
                <div className="text-blue-100 text-sm">
                  {generalMessages.length + lineMessages.length} messages total
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {chatOpen ? 'Close' : 'Open'} Chat
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

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search shops or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white cursor-pointer appearance-none min-w-[200px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing {filteredShops.length} of {dummyShops.length} shops
            </p>
          </div>
        </div>

        {/* Enhanced Shops Grid - 4+ per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
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
              <div key={shop.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
                {/* Shop Image Header */}
                <div className="relative h-32 sm:h-36 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <ShoppingBag size={32} className="mx-auto mb-2 opacity-60" />
                      <div className="text-xs font-medium opacity-80">{shop.category}</div>
                    </div>
                  </div>
                  
                  {/* Verification Badge */}
                  {shop.verified && (
                    <div className="absolute top-2 right-2 z-20">
                      <div className="bg-emerald-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                        <Shield size={12} />
                        Verified
                      </div>
                    </div>
                  )}
                  
                  {/* Trust Score */}
                  <div className="absolute bottom-2 left-2 z-20">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-sm">
                      <Award size={12} className="text-blue-600" />
                      {shop.trustScore}%
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  {/* Shop Information */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {shop.name}
                      </h3>
                      {shop.trusted && (
                        <Shield size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">by {shop.vendor}</p>
                    <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full inline-block">
                      {shop.category}
                    </p>
                  </div>

                  {/* Rating and Business Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{shop.rating}</span>
                      <span className="text-xs text-gray-500">({shop.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {shop.yearsInBusiness}y
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {shop.specialties.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {shop.specialties.length > 2 && (
                        <span className="text-xs text-blue-600 font-medium">
                          +{shop.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link to={`/shop-profile/${shop.id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105">
                        <Eye size={14} />
                        View Shop
                      </button>
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => handleWhatsAppClick(shop.phone)}
                        className="bg-emerald-500 text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <MessageCircle size={12} />
                        WhatsApp
                      </button>
                      <button 
                        onClick={() => handleCallClick(shop.phone)}
                        className="bg-blue-500 text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-blue-600 transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <Phone size={12} />
                        Call
                      </button>
                    </div>
                    
                    {/* Direct Vendor Chat */}
                    <button 
                      onClick={() => handleVendorChat(shop.vendor, shop.name)}
                      className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl text-xs font-medium hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={12} />
                      Chat with Vendor
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}