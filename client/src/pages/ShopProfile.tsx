import { useParams, Link } from 'wouter';
import { ArrowLeft, Shield, Star, MapPin, Phone, Clock, MessageCircle, Package, Award, Users } from 'lucide-react';
import { useState } from 'react';
import ChatBox from '../components/ChatBox';

interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  inStock: boolean;
  image?: string;
}

interface ShopData {
  name: string;
  number: string;
  vendor: string;
  trustScore: number;
  rating: number;
  bio: string;
  specialties: string[];
  location: string;
  openHours: string;
  contact: string;
  whatsapp: string;
  established: string;
  totalSales: number;
  products: Product[];
  marketId: string;
  sectionId: string;
}

const shopsData: { [key: string]: ShopData } = {
  '1': {
    name: 'Ngwa Electronics',
    number: 'A12',
    vendor: 'Emmanuel Ngwa',
    trustScore: 95,
    rating: 4.7,
    bio: 'Leading electronics vendor in Back Market specializing in mobile phones, repairs, and accessories. With over 8 years of experience, we provide quality products and reliable after-sales service to customers across Bamenda.',
    specialties: ['Mobile Phones', 'Electronics Repair', 'Phone Accessories', 'Warranty Service'],
    location: 'Back Market, Main Market',
    openHours: '8:00 AM - 6:00 PM',
    contact: '+237 670 123 456',
    whatsapp: '+237 670 123 456',
    established: '2016',
    totalSales: 1250,
    marketId: 'main-market',
    sectionId: 'back-market',
    products: [
      { id: 'p1', title: 'Samsung Galaxy A54', price: '180,000', category: 'Smartphones', inStock: true },
      { id: 'p2', title: 'iPhone 13', price: '350,000', category: 'Smartphones', inStock: true },
      { id: 'p3', title: 'Tecno Spark 10', price: '85,000', category: 'Smartphones', inStock: true },
      { id: 'p4', title: 'Phone Screen Protector', price: '2,500', category: 'Accessories', inStock: true },
      { id: 'p5', title: 'Fast Charging Cable', price: '3,000', category: 'Accessories', inStock: true },
      { id: 'p6', title: 'Wireless Earbuds', price: '15,000', category: 'Accessories', inStock: false }
    ]
  },
  '2': {
    name: 'Mama\'s Fabrics',
    number: 'B5',
    vendor: 'Theresa Mbi',
    trustScore: 98,
    rating: 4.9,
    bio: 'Premier fabric store and tailoring service in Back Market. Specializing in traditional African fabrics, custom tailoring, and modern fashion designs. Known for exceptional quality and attention to detail.',
    specialties: ['Traditional Fabrics', 'Custom Tailoring', 'Fashion Design', 'Alterations'],
    location: 'Back Market, Main Market',
    openHours: '7:00 AM - 7:00 PM',
    contact: '+237 681 234 567',
    whatsapp: '+237 681 234 567',
    established: '2012',
    totalSales: 2100,
    marketId: 'main-market',
    sectionId: 'back-market',
    products: [
      { id: 'p7', title: 'Ankara Fabric (6 yards)', price: '25,000', category: 'Fabrics', inStock: true },
      { id: 'p8', title: 'Kente Cloth', price: '45,000', category: 'Fabrics', inStock: true },
      { id: 'p9', title: 'Custom Tailored Dress', price: '35,000', category: 'Tailoring', inStock: true },
      { id: 'p10', title: 'Men\'s Traditional Outfit', price: '50,000', category: 'Tailoring', inStock: true },
      { id: 'p11', title: 'School Uniform (Complete Set)', price: '18,000', category: 'Tailoring', inStock: true }
    ]
  },
  '5': {
    name: 'Onitsha Imports',
    number: 'E3',
    vendor: 'Pierre Fotso',
    trustScore: 92,
    rating: 4.8,
    bio: 'Authorized dealer of imported electronics and technology products. Direct partnerships with international suppliers ensure authentic products at competitive prices. Specializing in laptops, smartphones, and business equipment.',
    specialties: ['Imported Electronics', 'Business Equipment', 'Laptops', 'Smartphones'],
    location: 'Onitsha Line, Main Market',
    openHours: '8:00 AM - 8:00 PM',
    contact: '+237 684 567 890',
    whatsapp: '+237 684 567 890',
    established: '2018',
    totalSales: 850,
    marketId: 'main-market',
    sectionId: 'onitsha-line',
    products: [
      { id: 'p12', title: 'HP Pavilion Laptop', price: '420,000', category: 'Laptops', inStock: true },
      { id: 'p13', title: 'Dell Inspiron 15', price: '380,000', category: 'Laptops', inStock: true },
      { id: 'p14', title: 'Canon Printer', price: '85,000', category: 'Office Equipment', inStock: true },
      { id: 'p15', title: 'Wireless Mouse', price: '12,000', category: 'Accessories', inStock: true },
      { id: 'p16', title: 'External Hard Drive 1TB', price: '45,000', category: 'Storage', inStock: false }
    ]
  },
  '12': {
    name: 'Bali Fresh Fruits',
    number: 'L1',
    vendor: 'Sophie Atanga',
    trustScore: 96,
    rating: 4.9,
    bio: 'Family-owned business providing the freshest organic fruits and vegetables from local farms. Direct farm-to-market supply chain ensures quality and freshness. Supporting local farmers and promoting healthy eating in Bamenda.',
    specialties: ['Organic Fruits', 'Fresh Vegetables', 'Local Produce', 'Seasonal Items'],
    location: 'Bali Line, Food Market',
    openHours: '5:00 AM - 6:00 PM',
    contact: '+237 681 234 567',
    whatsapp: '+237 681 234 567',
    established: '2014',
    totalSales: 3200,
    marketId: 'food-market',
    sectionId: 'bali-line',
    products: [
      { id: 'p17', title: 'Fresh Avocados (per kg)', price: '2,000', category: 'Fruits', inStock: true },
      { id: 'p18', title: 'Organic Tomatoes (per kg)', price: '1,500', category: 'Vegetables', inStock: true },
      { id: 'p19', title: 'Sweet Oranges (per dozen)', price: '1,200', category: 'Fruits', inStock: true },
      { id: 'p20', title: 'Fresh Lettuce (per head)', price: '500', category: 'Vegetables', inStock: true },
      { id: 'p21', title: 'Pineapples (large)', price: '2,500', category: 'Fruits', inStock: true }
    ]
  }
};

export default function ShopProfile() {
  const { shopId } = useParams();
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations();
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const shop = shopsData[shopId as string];

  if (!shop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop Not Found</h2>
          <p className="text-gray-600 mb-6">The shop you're looking for doesn't exist.</p>
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
        <div 
          ref={(el) => setElementRef('header-nav', el)}
          data-animation-id="header-nav"
          className={`mb-6 sm:mb-8 ${getAnimationClass('header-nav', 0, 'slide')}`}
          style={getAnimationStyle(0)}
        >
          <Link to={`/markets/${shop.marketId}/${shop.sectionId}`}>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              <ArrowLeft size={20} />
              Back to {shop.location}
            </button>
          </Link>
        </div>

        {/* Shop Header */}
        <div 
          ref={(el) => setElementRef('shop-header', el)}
          data-animation-id="shop-header"
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 sm:mb-12 ${getAnimationClass('shop-header', 1, 'slide')}`}
          style={getAnimationStyle(1)}
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 p-6 sm:p-8 lg:p-12 text-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
                      Shop #{shop.number}
                    </div>
                    <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Shield size={16} />
                      Verified {shop.trustScore}%
                    </div>
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                    {shop.name}
                  </h1>
                  
                  <p className="text-xl text-blue-100 mb-4">
                    Owned by {shop.vendor}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span>{shop.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{shop.totalSales}+ sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} />
                      <span>Since {shop.established}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 lg:w-48 lg:h-48 mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-teal-100 rounded-3xl flex items-center justify-center text-6xl lg:text-8xl shadow-lg">
                    🏪
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="bg-gray-50 px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                {shop.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-500" />
                {shop.openHours}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-purple-500" />
                {shop.contact}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div 
              ref={(el) => setElementRef('about-section', el)}
              data-animation-id="about-section"
              className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 ${getAnimationClass('about-section', 2, 'slide')}`}
              style={getAnimationStyle(2)}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">About This Shop</h2>
              <p className="text-gray-600 leading-relaxed text-justify mb-6">
                {shop.bio}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {shop.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div 
              ref={(el) => setElementRef('products-section', el)}
              data-animation-id="products-section"
              className={`bg-white rounded-3xl shadow-2xl p-6 sm:p-8 ${getAnimationClass('products-section', 3, 'slide')}`}
              style={getAnimationStyle(3)}
            >
              <div className="flex items-center gap-3 mb-6">
                <Package size={24} className="text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Products & Services</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {shop.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800 leading-tight">{product.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="text-lg font-bold text-emerald-600">{product.price} CFA</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div 
              ref={(el) => setElementRef('contact-card', el)}
              data-animation-id="contact-card"
              className={`bg-white rounded-3xl shadow-2xl p-6 ${getAnimationClass('contact-card', 4, 'slide')}`}
              style={getAnimationStyle(4)}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Chat with {shop.vendor}
                </button>
                
                <a 
                  href={`https://wa.me/${shop.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 text-white py-3 px-4 rounded-2xl font-semibold hover:bg-emerald-600 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  WhatsApp
                </a>
                
                <a 
                  href={`tel:${shop.contact}`}
                  className="w-full bg-gray-500 text-white py-3 px-4 rounded-2xl font-semibold hover:bg-gray-600 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Trust Score Card */}
            <div 
              ref={(el) => setElementRef('trust-card', el)}
              data-animation-id="trust-card"
              className={`bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-6 text-white ${getAnimationClass('trust-card', 5, 'slide')}`}
              style={getAnimationStyle(5)}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} />
                <h3 className="text-xl font-bold">Trust Score</h3>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{shop.trustScore}%</div>
                <p className="text-emerald-100 text-sm">Verified Professional</p>
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Customer Reviews</span>
                  <span>★ {shop.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Sales</span>
                  <span>{shop.totalSales}+</span>
                </div>
                <div className="flex justify-between">
                  <span>Years in Business</span>
                  <span>{new Date().getFullYear() - parseInt(shop.established)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Component */}
        <ChatBox
          vendorName={shop.vendor}
          buyerName="Customer"
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </div>
    </div>
  );
}