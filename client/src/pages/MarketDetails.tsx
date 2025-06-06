import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { ArrowLeft, MapPin, Users, Clock, Star, Shield, MessageSquare, Send } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSystem?: boolean;
}

const marketData = {
  'main-market': {
    name: 'Main Market',
    description: 'Bamenda\'s largest and most diverse commercial center',
    location: 'Central Bamenda',
    openHours: '6:00 AM - 8:00 PM',
    totalVendors: 450,
    rating: 4.8,
    sections: [
      { 
        id: 'back-market', 
        name: 'Back Market', 
        description: 'Secondary vendors and small traders offering affordable goods and local products',
        vendors: 85,
        specialties: ['Local Crafts', 'Second-hand Items', 'Affordable Goods']
      },
      { 
        id: 'onitsha-line', 
        name: 'Onitsha Line', 
        description: 'Electronics, imported goods, and technology products from major suppliers',
        vendors: 95,
        specialties: ['Electronics', 'Imported Goods', 'Mobile Phones', 'Accessories']
      },
      { 
        id: 'tailoring-line', 
        name: 'Tailoring Line', 
        description: 'Professional tailors, fabric sellers, and fashion designers',
        vendors: 70,
        specialties: ['Custom Tailoring', 'Fabrics', 'Fashion Design', 'Alterations']
      },
      { 
        id: 'cosmetics-line', 
        name: 'Cosmetics Line', 
        description: 'Beauty products, hair care, and personal grooming essentials',
        vendors: 60,
        specialties: ['Beauty Products', 'Hair Care', 'Skincare', 'Makeup']
      },
      { 
        id: 'shoe-line', 
        name: 'Shoe Line', 
        description: 'Footwear for all occasions from local and international brands',
        vendors: 45,
        specialties: ['Casual Shoes', 'Formal Wear', 'Sports Shoes', 'Sandals']
      },
      { 
        id: 'provisions-line', 
        name: 'Provisions Line', 
        description: 'Household items, cleaning supplies, and daily essentials',
        vendors: 95,
        specialties: ['Household Items', 'Cleaning Supplies', 'Toiletries', 'Basics']
      }
    ],
  },
  'food-market': {
    name: 'Food Market',
    description: 'Fresh produce and organic food items at competitive prices',
    location: 'Near Main Market',
    openHours: '5:00 AM - 7:00 PM',
    totalVendors: 280,
    rating: 4.9,
    sections: [
      { 
        id: 'bali-line', 
        name: 'Bali Line', 
        description: 'Fresh vegetables, fruits, and organic produce from local farms',
        vendors: 75,
        specialties: ['Fresh Vegetables', 'Organic Fruits', 'Local Produce', 'Herbs']
      },
      { 
        id: 'plantain-line', 
        name: 'Plantain Line', 
        description: 'Staple foods including plantains, yams, and root vegetables',
        vendors: 50,
        specialties: ['Plantains', 'Yams', 'Cassava', 'Sweet Potatoes']
      },
      { 
        id: 'green-spice-line', 
        name: 'Green Spice Line', 
        description: 'Traditional spices, herbs, and seasoning from across Cameroon',
        vendors: 40,
        specialties: ['Local Spices', 'Traditional Herbs', 'Seasonings', 'Medicinal Plants']
      },
      { 
        id: 'meat-fish-line', 
        name: 'Meat & Fish Line', 
        description: 'Fresh meat, fish, and poultry from trusted local suppliers',
        vendors: 55,
        specialties: ['Fresh Meat', 'Fish', 'Poultry', 'Seafood']
      },
      { 
        id: 'grains-line', 
        name: 'Grains Line', 
        description: 'Rice, beans, corn, and other grain products in bulk quantities',
        vendors: 60,
        specialties: ['Rice', 'Beans', 'Corn', 'Wheat Products']
      }
    ],
  },
  'computer-village': {
    name: 'Computer Village',
    description: 'Technology hub for computers, phones, and electronics',
    location: 'Commercial Avenue',
    openHours: '8:00 AM - 8:00 PM',
    totalVendors: 120,
    rating: 4.7,
    sections: [
      { 
        id: 'laptop-section', 
        name: 'Laptop Section', 
        description: 'New and refurbished laptops from trusted international brands',
        vendors: 35,
        specialties: ['New Laptops', 'Refurbished PCs', 'Gaming Laptops', 'Business Laptops']
      },
      { 
        id: 'phone-section', 
        name: 'Phone Section', 
        description: 'Latest smartphones, feature phones, and mobile accessories',
        vendors: 45,
        specialties: ['Smartphones', 'Feature Phones', 'Phone Cases', 'Chargers']
      },
      { 
        id: 'repair-section', 
        name: 'Repair Section', 
        description: 'Expert repair services for all types of electronic devices',
        vendors: 25,
        specialties: ['Phone Repairs', 'Laptop Repairs', 'Data Recovery', 'Screen Replacement']
      },
      { 
        id: 'accessories-section', 
        name: 'Accessories Section', 
        description: 'Electronic accessories, cables, and peripheral devices',
        vendors: 15,
        specialties: ['Cables', 'Power Banks', 'Headphones', 'Keyboards']
      }
    ],
  },
  'craft-market': {
    name: 'Arts & Crafts Market',
    description: 'Traditional Cameroonian arts and cultural items',
    location: 'Cultural Center Area',
    openHours: '7:00 AM - 6:00 PM',
    totalVendors: 85,
    rating: 4.6,
    sections: [
      { 
        id: 'traditional-art', 
        name: 'Traditional Art', 
        description: 'Authentic Cameroonian masks, sculptures, and traditional artwork',
        vendors: 25,
        specialties: ['Masks', 'Sculptures', 'Paintings', 'Wood Carvings']
      },
      { 
        id: 'jewelry-section', 
        name: 'Jewelry Section', 
        description: 'Handcrafted jewelry using local materials and traditional techniques',
        vendors: 20,
        specialties: ['Traditional Jewelry', 'Beadwork', 'Silver Items', 'Handcrafted Pieces']
      },
      { 
        id: 'textile-crafts', 
        name: 'Textile Crafts', 
        description: 'Traditional fabrics, woven items, and cultural clothing',
        vendors: 25,
        specialties: ['Traditional Fabrics', 'Woven Items', 'Cultural Clothing', 'Batik']
      },
      { 
        id: 'pottery-section', 
        name: 'Pottery Section', 
        description: 'Handmade pottery, ceramics, and traditional household items',
        vendors: 15,
        specialties: ['Clay Pots', 'Ceramics', 'Traditional Utensils', 'Decorative Items']
      }
    ],
  },
  'motor-park': {
    name: 'Motor Park Market',
    description: 'Automotive parts, services, and vehicle accessories',
    location: 'Motor Park Area',
    openHours: '7:00 AM - 7:00 PM',
    totalVendors: 95,
    rating: 4.5,
    sections: [
      { 
        id: 'auto-parts', 
        name: 'Auto Parts', 
        description: 'Engine parts, spare parts, and mechanical components for all vehicles',
        vendors: 40,
        specialties: ['Engine Parts', 'Brake Parts', 'Electrical Components', 'Filters']
      },
      { 
        id: 'tire-section', 
        name: 'Tire Section', 
        description: 'New and used tires for cars, motorcycles, and heavy vehicles',
        vendors: 20,
        specialties: ['Car Tires', 'Motorcycle Tires', 'Truck Tires', 'Wheel Rims']
      },
      { 
        id: 'repair-services', 
        name: 'Repair Services', 
        description: 'Professional vehicle repair and maintenance services',
        vendors: 25,
        specialties: ['Engine Repair', 'Body Work', 'Electrical Repair', 'Oil Changes']
      },
      { 
        id: 'accessories-shop', 
        name: 'Vehicle Accessories', 
        description: 'Car accessories, interior decorations, and enhancement items',
        vendors: 10,
        specialties: ['Car Accessories', 'Sound Systems', 'Interior Items', 'Lighting']
      }
    ],
  },
  'night-market': {
    name: 'Night Market',
    description: 'Evening entertainment, street food, and late-night shopping',
    location: 'City Center',
    openHours: '6:00 PM - 12:00 AM',
    totalVendors: 160,
    rating: 4.4,
    sections: [
      { 
        id: 'street-food', 
        name: 'Street Food', 
        description: 'Local delicacies, grilled items, and traditional Cameroonian dishes',
        vendors: 70,
        specialties: ['Grilled Fish', 'Suya', 'Local Dishes', 'Snacks']
      },
      { 
        id: 'beverage-stands', 
        name: 'Beverage Stands', 
        description: 'Fresh juices, local drinks, and refreshing beverages',
        vendors: 40,
        specialties: ['Fresh Juices', 'Local Drinks', 'Soft Drinks', 'Traditional Beverages']
      },
      { 
        id: 'entertainment', 
        name: 'Entertainment Zone', 
        description: 'Live music, games, and cultural performances',
        vendors: 30,
        specialties: ['Live Music', 'Cultural Shows', 'Games', 'Dancing']
      },
      { 
        id: 'late-shopping', 
        name: 'Late Shopping', 
        description: 'Essential items and convenience products for late-night needs',
        vendors: 20,
        specialties: ['Convenience Items', 'Toiletries', 'Snacks', 'Phone Cards']
      }
    ],
  }
};

export default function MarketDetails() {
  const { marketId } = useParams();
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  const [marketMessages, setMarketMessages] = useState<Message[]>([
    { 
      id: 1,
      sender: 'Market Admin', 
      text: `Welcome to ${marketId?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} chat! Connect with vendors and customers.`, 
      time: '9:00 AM',
      isSystem: true 
    },
    { 
      id: 2,
      sender: 'Vendor Association', 
      text: 'New vendor registration drive starts next week - join us for better market coordination!', 
      time: '10:30 AM' 
    },
    { 
      id: 3,
      sender: 'Customer Service', 
      text: 'Report any issues or feedback to help us improve your market experience.', 
      time: '11:15 AM' 
    },
  ]);
  
  const market = marketData[marketId as keyof typeof marketData];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now(),
      sender: 'You',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    };
    
    setMarketMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!market) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Market Not Found</h2>
          <p className="text-gray-600 mb-6">The market you're looking for doesn't exist.</p>
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
        <div className="mb-6 sm:mb-8">
          <Link to="/markets">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              <ArrowLeft size={20} />
              Back to Markets
            </button>
          </Link>
        </div>

        {/* Compact Market Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-2">
                {market.name}
              </h1>
              <p className="text-sm text-gray-600 mb-3">
                {market.description}
              </p>
              
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={12} className="text-blue-500" />
                  {market.location}
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Users size={12} className="text-purple-500" />
                  {market.totalVendors}+ vendors
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Star size={12} className="text-yellow-500" />
                  {market.rating} rating
                </div>
              </div>
            </div>
            
            <div className="ml-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 rounded-xl flex items-center justify-center text-3xl">
                🏪
              </div>
            </div>
          </div>
        </div>

        {/* Market Chat Interface */}
        <div className="bg-white rounded-3xl shadow-2xl p-4 mb-8">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={24} />
              <div className="text-left">
                <div className="font-semibold">Market Community Chat</div>
                <div className="text-blue-100 text-sm">
                  {marketMessages.length} messages · Connect with vendors and customers
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
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 border border-gray-300 rounded-2xl p-4 bg-gray-50">
                <div className="space-y-3">
                  {marketMessages.map((msg) => (
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
                  placeholder="Message the market community..."
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

        {/* Sections Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Market Sections & Lines
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the different sections within {market.name}. Each section specializes in specific products and services.
          </p>
        </div>

        {/* Market Lines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-10">
          {market.sections.map((section, index) => {
            // All items now route to MarketLine
            const linkPath = `/markets/${marketId}/lines/${section.id}`;
            
            return (
              <div key={section.id} className="group">
                <Link to={linkPath}>
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative h-full">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-6 text-white relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                            {section.name}
                          </h3>
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
                            <Shield size={16} />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm opacity-90">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            {section.vendors} vendors
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Section Content */}
                    <div className="p-6 flex-1">
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                        {section.description}
                      </p>

                      {/* Specialties */}
                      <div className="mb-6">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Specialties</div>
                        <div className="flex flex-wrap gap-2">
                          {section.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                              key={idx}
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                          {section.specialties.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                              +{section.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Explore Section
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
                          Browse →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Need Help Finding Something?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our local guides can help you navigate {market.name} and find exactly what you're looking for.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Get Local Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}