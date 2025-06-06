import { useState, useMemo } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Search, Filter, MessageSquare, Send, Users, ShoppingBag, Shield } from 'lucide-react';

const dummyShops = [
  { id: 1, name: 'Ngwa Electronics', category: 'Electronics', vendor: 'Emmanuel Ngwa', trusted: true, rating: 4.7, phone: '+237 670 123 456' },
  { id: 2, name: 'Mama Fabrics', category: 'Tailoring', vendor: 'Theresa Mbi', trusted: true, rating: 4.9, phone: '+237 681 234 567' },
  { id: 3, name: 'Onitsha Imports', category: 'Electronics', vendor: 'Pierre Fotso', trusted: false, rating: 4.3, phone: '+237 684 567 890' },
  { id: 4, name: 'Bali Fruits', category: 'Food', vendor: 'Sophie Atanga', trusted: true, rating: 4.8, phone: '+237 681 234 567' },
  { id: 5, name: 'Fresh Veggies', category: 'Food', vendor: 'David Nfah', trusted: true, rating: 4.6, phone: '+237 692 345 678' },
  { id: 6, name: 'Kamer Tech', category: 'Electronics', vendor: 'Isaac Tanyi', trusted: true, rating: 4.5, phone: '+237 673 456 789' },
  { id: 7, name: 'Tailors United', category: 'Tailoring', vendor: 'Felicity Njie', trusted: false, rating: 4.2, phone: '+237 687 890 123' },
  { id: 8, name: 'Spice World', category: 'Food', vendor: 'James Mvondo', trusted: true, rating: 4.7, phone: '+237 698 901 234' },
  { id: 9, name: 'Tech Solutions', category: 'Electronics', vendor: 'Grace Mundi', trusted: true, rating: 4.8, phone: '+237 679 012 345' },
  { id: 10, name: 'Fashion Hub', category: 'Tailoring', vendor: 'John Bih', trusted: true, rating: 4.6, phone: '+237 690 123 456' },
  { id: 11, name: 'Phone Palace', category: 'Electronics', vendor: 'Marie Kenne', trusted: true, rating: 4.9, phone: '+237 676 789 012' },
  { id: 12, name: 'Digital World', category: 'Electronics', vendor: 'David Che', trusted: true, rating: 4.4, phone: '+237 687 234 567' },
];

const categories = ['All Categories', 'Electronics', 'Tailoring', 'Food'];

export default function MarketLine() {
  const { marketId, lineId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState('general');
  const [generalMessages, setGeneralMessages] = useState([
    { sender: 'Market Admin', text: 'Welcome to the Main Market general chat!', time: new Date().toLocaleTimeString(), isSystem: true },
    { sender: 'Pierre Fotso', text: 'New smartphones just arrived at Onitsha Electronics!', time: new Date().toLocaleTimeString() },
    { sender: 'Sophie Atanga', text: 'Fresh organic fruits available at Bali Fruits today.', time: new Date().toLocaleTimeString() },
  ]);
  const [lineMessages, setLineMessages] = useState([
    { sender: 'Line Moderator', text: 'Welcome to Onitsha Line chat - Electronics specialists!', time: new Date().toLocaleTimeString(), isSystem: true },
    { sender: 'Ngwa Electronics', text: 'We have new phone accessories in stock!', time: new Date().toLocaleTimeString() },
    { sender: 'Kamer Tech', text: 'Special discount on laptops this week!', time: new Date().toLocaleTimeString() },
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
    const message = {
      sender: 'You',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString(),
    };
    if (activeChat === 'general') {
      setGeneralMessages([...generalMessages, message]);
    } else {
      setLineMessages([...lineMessages, message]);
    }
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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

        {/* Interactive Chat Button */}
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

          {/* Expandable Chat Section */}
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
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 border border-gray-300 rounded-2xl p-4 bg-gray-50">
                {(activeChat === 'general' ? generalMessages : lineMessages).map((msg, i) => (
                  <div key={i} className={`mb-3 p-3 rounded-xl ${
                    msg.isSystem 
                      ? 'bg-yellow-100 text-yellow-800 text-center text-sm italic'
                      : msg.sender === 'You' 
                      ? 'bg-blue-600 text-white ml-auto max-w-xs' 
                      : 'bg-white text-gray-800 shadow-sm max-w-xs'
                  }`}>
                    {!msg.isSystem && msg.sender !== 'You' && (
                      <p className="font-semibold text-blue-600 text-sm mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isSystem ? 'text-yellow-600' : msg.sender === 'You' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow border border-gray-300 rounded-2xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
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

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search shops or vendors..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
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

        {/* Shops Grid - 4+ per row on mobile */}
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
              <div key={shop.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">{shop.name}</h3>
                    {shop.trusted && (
                      <Shield size={16} className="text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">by {shop.vendor}</p>
                  <p className="text-xs text-blue-600 mb-3 font-medium">{shop.category}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium text-gray-700">{shop.rating}</span>
                    </div>
                    {shop.trusted && (
                      <span className="text-emerald-600 text-xs font-semibold">Trusted</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                      View Shop
                    </button>
                    <div className="grid grid-cols-2 gap-2">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}