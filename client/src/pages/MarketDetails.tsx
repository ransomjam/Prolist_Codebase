import { useParams, Link } from 'wouter';
import { ArrowLeft, MapPin, Users, Clock, Star, Shield } from 'lucide-react';

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
  const { id: marketId } = useParams();
  const market = marketData[marketId as keyof typeof marketData];

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

        {/* Market Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
                {market.name}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
                {market.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-blue-500" />
                  {market.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-emerald-500" />
                  {market.openHours}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} className="text-purple-500" />
                  {market.totalVendors}+ vendors
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star size={16} className="text-yellow-500" />
                  {market.rating} rating
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 rounded-3xl flex items-center justify-center text-8xl shadow-lg">
                🏪
              </div>
            </div>
          </div>
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

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {market.sections.map((section, index) => (
            <div key={section.id} className="group">
              <Link to={`/markets/${marketId}/${section.id}`}>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 relative h-full">
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
          ))}
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