import { useParams, Link } from 'wouter';
import { ArrowLeft, Shield, MapPin, Phone, Star, Clock, Users } from 'lucide-react';

interface Shop {
  id: number;
  name: string;
  number: string;
  vendor: string;
  trusted: boolean;
  rating: number;
  specialties: string[];
  openHours: string;
  contact: string;
}

interface SectionData {
  name: string;
  description: string;
  shops: Shop[];
}

type MarketData = {
  [marketId: string]: {
    [sectionId: string]: SectionData;
  };
};

const marketLinesData: MarketData = {
  'main-market': {
    'back-market': {
      name: 'Back Market',
      description: 'Secondary vendors and small traders offering affordable goods',
      shops: [
        { 
          id: 1, 
          name: 'Ngwa Electronics', 
          number: 'A12', 
          vendor: 'Emmanuel Ngwa', 
          trusted: true, 
          rating: 4.7,
          specialties: ['Electronics', 'Repairs', 'Accessories'],
          openHours: '8:00 AM - 6:00 PM',
          contact: '+237 670 123 456'
        },
        { 
          id: 2, 
          name: 'Mama\'s Fabrics', 
          number: 'B5', 
          vendor: 'Theresa Mbi', 
          trusted: true,
          rating: 4.9,
          specialties: ['Traditional Fabrics', 'Custom Tailoring', 'Clothing'],
          openHours: '7:00 AM - 7:00 PM',
          contact: '+237 681 234 567'
        },
        { 
          id: 3, 
          name: 'Local Crafts Hub', 
          number: 'C8', 
          vendor: 'John Tanyi', 
          trusted: true,
          rating: 4.5,
          specialties: ['Handmade Crafts', 'Wood Carvings', 'Souvenirs'],
          openHours: '9:00 AM - 5:00 PM',
          contact: '+237 692 345 678'
        },
        { 
          id: 4, 
          name: 'Second Hand Paradise', 
          number: 'D15', 
          vendor: 'Grace Fon', 
          trusted: true,
          rating: 4.3,
          specialties: ['Used Items', 'Vintage Goods', 'Affordable Options'],
          openHours: '8:30 AM - 6:30 PM',
          contact: '+237 673 456 789'
        }
      ]
    },
    'onitsha-line': {
      name: 'Onitsha Line',
      description: 'Electronics and imported goods from major suppliers',
      shops: [
        { 
          id: 5, 
          name: 'Onitsha Imports', 
          number: 'E3', 
          vendor: 'Pierre Fotso', 
          trusted: true,
          rating: 4.8,
          specialties: ['Imported Electronics', 'Mobile Phones', 'Accessories'],
          openHours: '8:00 AM - 8:00 PM',
          contact: '+237 684 567 890'
        },
        { 
          id: 6, 
          name: 'Tech World Bamenda', 
          number: 'F7', 
          vendor: 'Samuel Nkeng', 
          trusted: true,
          rating: 4.6,
          specialties: ['Laptops', 'Smartphones', 'Tech Repairs'],
          openHours: '9:00 AM - 7:00 PM',
          contact: '+237 695 678 901'
        },
        { 
          id: 7, 
          name: 'Digital Solutions', 
          number: 'G12', 
          vendor: 'Marie Kenne', 
          trusted: true,
          rating: 4.4,
          specialties: ['Computer Software', 'Digital Services', 'Training'],
          openHours: '8:30 AM - 6:00 PM',
          contact: '+237 676 789 012'
        }
      ]
    },
    'tailoring-line': {
      name: 'Tailoring Line',
      description: 'Professional tailors and fashion designers',
      shops: [
        { 
          id: 8, 
          name: 'Fashion Excellence', 
          number: 'H4', 
          vendor: 'Beatrice Awah', 
          trusted: true,
          rating: 4.9,
          specialties: ['Custom Tailoring', 'Wedding Dresses', 'Fashion Design'],
          openHours: '7:30 AM - 7:30 PM',
          contact: '+237 687 890 123'
        },
        { 
          id: 9, 
          name: 'Modern Styles', 
          number: 'I9', 
          vendor: 'David Che', 
          trusted: true,
          rating: 4.7,
          specialties: ['Men\'s Suits', 'Casual Wear', 'Alterations'],
          openHours: '8:00 AM - 6:30 PM',
          contact: '+237 698 901 234'
        }
      ]
    },
    'cosmetics-line': {
      name: 'Cosmetics Line',
      description: 'Beauty products and personal care items',
      shops: [
        { 
          id: 10, 
          name: 'Beauty Palace', 
          number: 'J2', 
          vendor: 'Jennifer Asong', 
          trusted: true,
          rating: 4.8,
          specialties: ['Skincare', 'Makeup', 'Hair Products'],
          openHours: '8:00 AM - 7:00 PM',
          contact: '+237 679 012 345'
        },
        { 
          id: 11, 
          name: 'Glamour Zone', 
          number: 'K6', 
          vendor: 'Rose Mbah', 
          trusted: true,
          rating: 4.6,
          specialties: ['Professional Makeup', 'Beauty Treatments', 'Fragrances'],
          openHours: '9:00 AM - 6:00 PM',
          contact: '+237 690 123 456'
        }
      ]
    }
  },
  'food-market': {
    'bali-line': {
      name: 'Bali Line',
      description: 'Fresh vegetables and organic produce',
      shops: [
        { 
          id: 12, 
          name: 'Bali Fresh Fruits', 
          number: 'L1', 
          vendor: 'Sophie Atanga', 
          trusted: true,
          rating: 4.9,
          specialties: ['Organic Fruits', 'Fresh Vegetables', 'Local Produce'],
          openHours: '5:00 AM - 6:00 PM',
          contact: '+237 681 234 567'
        },
        { 
          id: 13, 
          name: 'Green Valley Produce', 
          number: 'M5', 
          vendor: 'Paul Njume', 
          trusted: true,
          rating: 4.7,
          specialties: ['Farm Vegetables', 'Herbs', 'Seasonal Fruits'],
          openHours: '5:30 AM - 5:30 PM',
          contact: '+237 692 345 678'
        }
      ]
    },
    'plantain-line': {
      name: 'Plantain Line',
      description: 'Staple foods and root vegetables',
      shops: [
        { 
          id: 14, 
          name: 'Plantain Paradise', 
          number: 'N3', 
          vendor: 'Mary Tanyi', 
          trusted: true,
          rating: 4.8,
          specialties: ['Fresh Plantains', 'Yams', 'Cassava'],
          openHours: '5:00 AM - 7:00 PM',
          contact: '+237 673 456 789'
        }
      ]
    }
  },
  'computer-village': {
    'laptop-section': {
      name: 'Laptop Section',
      description: 'New and refurbished laptops',
      shops: [
        { 
          id: 15, 
          name: 'Laptop World', 
          number: 'O7', 
          vendor: 'Francis Bih', 
          trusted: true,
          rating: 4.8,
          specialties: ['New Laptops', 'Refurbished PCs', 'Gaming Laptops'],
          openHours: '8:00 AM - 8:00 PM',
          contact: '+237 684 567 890'
        },
        { 
          id: 16, 
          name: 'PC Solutions', 
          number: 'P12', 
          vendor: 'Alice Ngum', 
          trusted: true,
          rating: 4.6,
          specialties: ['Business Laptops', 'Custom PCs', 'Upgrades'],
          openHours: '8:30 AM - 7:30 PM',
          contact: '+237 695 678 901'
        }
      ]
    },
    'phone-section': {
      name: 'Phone Section',
      description: 'Latest smartphones and accessories',
      shops: [
        { 
          id: 17, 
          name: 'Smart Phone Hub', 
          number: 'Q4', 
          vendor: 'Robert Kum', 
          trusted: true,
          rating: 4.7,
          specialties: ['Latest Smartphones', 'Phone Accessories', 'Unlocking'],
          openHours: '8:00 AM - 8:00 PM',
          contact: '+237 676 789 012'
        }
      ]
    }
  }
};

export default function LineDetails() {
  const { id: marketId, sectionId } = useParams();
  
  const sectionData = marketLinesData[marketId as string]?.[sectionId as string];
  const shops = sectionData?.shops || [];

  if (!sectionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Section Not Found</h2>
          <p className="text-gray-600 mb-6">The market section you're looking for doesn't exist.</p>
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
          <Link to={`/markets/${marketId}`}>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              <ArrowLeft size={20} />
              Back to Market Sections
            </button>
          </Link>
        </div>

        {/* Section Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 mb-4">
              {sectionData.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              {sectionData.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Users size={16} />
                {shops.length} Active Shops
              </div>
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full">
                <Shield size={16} />
                100% Verified Vendors
              </div>
              <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Clock size={16} />
                Open Daily
              </div>
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        {shops.length === 0 ? (
          <div className="text-center bg-white rounded-3xl shadow-xl p-12">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Shops Found</h3>
            <p className="text-gray-600">This section is currently being developed. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {shops.map((shop) => (
              <div key={shop.id} className="group">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 relative h-full">
                  {/* Shop Header */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-6 text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                          Shop #{shop.number}
                        </div>
                        {shop.trusted && (
                          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Shield size={12} />
                            Verified
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2">
                        {shop.name}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Owned by {shop.vendor}
                      </p>
                    </div>
                  </div>
                  
                  {/* Shop Content */}
                  <div className="p-6 flex-1">
                    {/* Rating and Contact */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-800">{shop.rating}</span>
                        <span className="text-gray-500 text-sm">rating</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} />
                        Open Now
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-blue-500" />
                        <span>{shop.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={14} className="text-emerald-500" />
                        <span>{shop.openHours}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Specialties</div>
                      <div className="flex flex-wrap gap-2">
                        {shop.specialties.slice(0, 3).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Link to={`/shop-profile/${shop.id}`}>
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                          View Shop Profile
                        </button>
                      </Link>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-emerald-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors duration-300">
                          WhatsApp
                        </button>
                        <button className="bg-gray-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors duration-300">
                          Call Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Want to List Your Shop Here?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join {sectionData.name} and connect with thousands of potential customers in Bamenda.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Register Your Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}