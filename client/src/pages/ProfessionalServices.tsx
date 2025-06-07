import { useState } from 'react';
import { Search, Filter, Star, Shield, MessageCircle, Eye, Grid3X3, List, SlidersHorizontal, Package, ArrowUpDown } from 'lucide-react';
import { Link } from 'wouter';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

// Dummy service listings data
const dummyServiceListings = [
  {
    id: 'logo-design-1',
    title: 'Professional Logo Design Package',
    description: 'Get a unique, memorable logo that represents your brand identity. Includes 3 concepts, unlimited revisions, and source files.',
    professional: dummyProfessionals[0],
    category: 'graphic-design',
    price: '25,000 FCFA',
    deliveryTime: '3-5 days',
    features: ['3 Logo Concepts', 'Unlimited Revisions', 'Source Files', 'Commercial License'],
    rating: 4.9,
    orders: 156,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400'
  },
  {
    id: 'business-card-1',
    title: 'Business Card Design',
    description: 'Professional business card design that matches your brand identity. Print-ready files included.',
    professional: dummyProfessionals[0],
    category: 'graphic-design',
    price: '15,000 FCFA',
    deliveryTime: '2-3 days',
    features: ['Front & Back Design', 'Print-Ready Files', 'Multiple Formats', 'Revisions'],
    rating: 4.8,
    orders: 89,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
  },
  {
    id: 'video-edit-1',
    title: 'Social Media Video Editing',
    description: 'Transform your raw footage into engaging social media content. Perfect for Instagram, TikTok, and Facebook.',
    professional: dummyProfessionals[1],
    category: 'video-editing',
    price: '35,000 FCFA',
    deliveryTime: '2-4 days',
    features: ['Color Correction', 'Motion Graphics', 'Sound Design', 'Multiple Formats'],
    rating: 4.7,
    orders: 203,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400'
  },
  {
    id: 'website-basic-1',
    title: 'Business Website Development',
    description: 'Professional responsive website with modern design, contact forms, and mobile optimization.',
    professional: dummyProfessionals[2],
    category: 'web-development',
    price: '85,000 FCFA',
    deliveryTime: '7-10 days',
    features: ['Responsive Design', 'Contact Forms', 'SEO Optimized', '1 Year Support'],
    rating: 4.8,
    orders: 67,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400'
  },
  {
    id: 'resume-pro-1',
    title: 'Professional Resume & Cover Letter',
    description: 'ATS-friendly resume design with keyword optimization and compelling cover letter.',
    professional: dummyProfessionals[3],
    category: 'resume-writing',
    price: '15,000 FCFA',
    deliveryTime: '1-2 days',
    features: ['ATS-Friendly Format', 'Keyword Optimization', 'Cover Letter', 'LinkedIn Profile'],
    rating: 4.9,
    orders: 234,
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
  },
  {
    id: 'data-analysis-1',
    title: 'Business Data Analysis Report',
    description: 'Comprehensive data analysis with visualizations and actionable insights for business decisions.',
    professional: dummyProfessionals[4],
    category: 'data-analysis',
    price: '45,000 FCFA',
    deliveryTime: '3-5 days',
    features: ['Data Visualization', 'Trend Analysis', 'Report Creation', 'Recommendations'],
    rating: 4.6,
    orders: 78,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400'
  }
];

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const categoryTypes = [
    { id: 'all', label: 'All Services', count: dummyProfessionals.length },
    ...serviceCategories.map(cat => ({
      id: cat.id,
      label: cat.name,
      count: dummyProfessionals.filter(p => p.category === cat.id).length
    }))
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-25k', label: 'Under 25,000 FCFA' },
    { id: '25k-50k', label: '25,000 - 50,000 FCFA' },
    { id: '50k-100k', label: '50,000 - 100,000 FCFA' },
    { id: 'above-100k', label: 'Above 100,000 FCFA' }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'rating-high', label: 'Highest Rated' },
    { id: 'trust-high', label: 'Most Trusted' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' }
  ];

  // Filter professionals based on search and category
  const filteredProfessionals = dummyProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || professional.category === selectedCategory;
    
    let matchesPrice = priceRange === 'all';
    if (priceRange !== 'all') {
      const price = parseInt(professional.rate.replace(/[^0-9]/g, ''));
      switch (priceRange) {
        case 'under-25k':
          matchesPrice = price < 25000;
          break;
        case '25k-50k':
          matchesPrice = price >= 25000 && price <= 50000;
          break;
        case '50k-100k':
          matchesPrice = price >= 50000 && price <= 100000;
          break;
        case 'above-100k':
          matchesPrice = price > 100000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Filter service listings based on search and category
  const filteredServiceListings = dummyServiceListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    
    let matchesPrice = priceRange === 'all';
    if (priceRange !== 'all') {
      const price = parseInt(listing.price.replace(/[^0-9]/g, ''));
      switch (priceRange) {
        case 'under-25k':
          matchesPrice = price < 25000;
          break;
        case '25k-50k':
          matchesPrice = price >= 25000 && price <= 50000;
          break;
        case '50k-100k':
          matchesPrice = price >= 50000 && price <= 100000;
          break;
        case 'above-100k':
          matchesPrice = price > 100000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Verified Services</h1>
              <p className="text-blue-100 text-sm">Trusted professionals offering quality services in Bamenda</p>
            </div>
            <Link href="/service-listings">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/30">
                <Package size={20} />
                List Service
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="px-4 py-4 max-w-7xl mx-auto">
          {/* Main Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by professional name, service type, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm shadow-sm"
            />
          </div>

          {/* Category, Price, and Sort in one line */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
              >
                {categoryTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label} ({type.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort</label>
              <button
                onClick={() => {
                  const currentIndex = sortOptions.findIndex(option => option.id === sortBy);
                  const nextIndex = (currentIndex + 1) % sortOptions.length;
                  setSortBy(sortOptions[nextIndex].id);
                }}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors text-xs flex items-center justify-center gap-1"
                title={`Sort by: ${sortOptions.find(option => option.id === sortBy)?.label}`}
              >
                <ArrowUpDown className="w-3 h-3 text-gray-600" />
                <span className="text-gray-600 truncate">{sortOptions.find(option => option.id === sortBy)?.label}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Verified Services Title - Full Width */}
        <div className="mb-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
              Verified Services
            </h2>
          </div>
        </div>

        {/* Service Listings Display */}
        {filteredServiceListings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No service listings found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredServiceListings.map((listing) => {
              const category = serviceCategories.find(cat => cat.id === listing.category);
              
              return (
                <div
                  key={listing.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {/* Service Image */}
                  <div>
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                  </div>

                  {/* Service Info */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 bg-gradient-to-r ${category?.color} rounded-full`}></div>
                      <span className="text-sm text-gray-600">{category?.name}</span>
                    </div>

                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">{listing.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{listing.description}</p>

                    {/* Professional Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={listing.professional.avatar}
                        alt={listing.professional.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-800">{listing.professional.name}</span>
                          {listing.professional.verified && (
                            <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{listing.rating}</span>
                          <span>•</span>
                          <span>{listing.orders} orders</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {listing.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                        {listing.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                            +{listing.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-purple-600">{listing.price}</div>
                          <div className="text-sm text-gray-500">{listing.deliveryTime}</div>
                        </div>
                        
                        <Link href={`/service-checkout/${listing.professional.id}`}>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Order Now
                          </button>
                        </Link>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link href={`/professional/${listing.professional.id}`} className="flex-1">
                          <button className="w-full flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors text-sm">
                            <Eye className="w-4 h-4" />
                            Profile
                          </button>
                        </Link>
                        
                        <button
                          onClick={() => openChat(listing.professional)}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Component */}
      {chatOpen && selectedProfessional && (
        <ChatBox
          vendorName={selectedProfessional.name}
          buyerName="You"
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}

      {/* Floating List Service Button */}
      <button className="fixed bottom-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50">
        <div className="flex items-center gap-1">
          <Package className="w-3 h-3" />
          <span className="font-medium text-xs">List Service</span>
        </div>
      </button>
    </div>
  );
}