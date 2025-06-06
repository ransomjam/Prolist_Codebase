import { useState } from 'react';
import { Search, Filter, Star, Shield, MessageCircle, Eye, Grid3X3, List, SlidersHorizontal, Package } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showServiceListings, setShowServiceListings] = useState(false);

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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Verified Services</h1>
            <p className="text-lg text-blue-100 mb-6">
              Discover trusted professionals offering quality online services in Bamenda
            </p>
          </div>
        </div>
      </div>

      {/* Intro Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6">
        <div className="bg-white rounded-xl shadow-lg border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-4">
            {/* Stats Row */}
            <div className="flex justify-center sm:justify-start">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{dummyProfessionals.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Professionals</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{serviceCategories.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-teal-600">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href="/service-listings" className="flex-1 sm:flex-none">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm sm:text-base">
                  List Service
                </button>
              </Link>
              
              <button
                onClick={() => setShowServiceListings(!showServiceListings)}
                className={`flex-1 sm:flex-none px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base ${
                  showServiceListings 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {showServiceListings ? 'View Professionals' : 'View Service Listings'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Categories and Filters - Single Row */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          {/* Mobile: Stack vertically, Desktop: Single row */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Categories - Horizontal scroll on mobile */}
            <div className="flex-1">
              <div className="flex overflow-x-auto pb-2 lg:pb-0 scrollbar-hide gap-2">
                {categoryTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCategory(type.id)}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedCategory === type.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {type.label}
                    <span className="ml-1 text-xs">({type.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters - Compact row */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 lg:gap-3 items-center">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-0 flex-1 sm:flex-none"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-0 flex-1 sm:flex-none"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search professionals by name or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {showServiceListings ? (
              `${filteredServiceListings.length} Service${filteredServiceListings.length !== 1 ? 's' : ''} Available`
            ) : (
              `${filteredProfessionals.length} Professional${filteredProfessionals.length !== 1 ? 's' : ''} Found`
            )}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {showServiceListings ? 'Ready-to-order service packages' : 'Verified professionals offering quality services'}
          </p>
        </div>

        {/* Service Listings or Professionals Display */}
        {showServiceListings ? (
          /* Service Listings Grid/List */
          filteredServiceListings.length === 0 ? (
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
          )
        ) : (
          /* Professionals Grid/List */
          filteredProfessionals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No professionals found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProfessionals.map((professional) => {
                const category = serviceCategories.find(cat => cat.id === professional.category);
                
                return (
                  <div
                    key={professional.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 sm:p-6"
                  >
                    {/* Professional Image */}
                    <div className="mb-4">
                      <img
                        src={professional.avatar}
                        alt={professional.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 mx-auto"
                      />
                    </div>

                    {/* Professional Info */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <h3 className="font-bold text-gray-800 text-lg">{professional.name}</h3>
                        {professional.verified && (
                          <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={`w-3 h-3 bg-gradient-to-r ${category?.color} rounded-full`}></div>
                        <span className="text-gray-600 text-sm">{category?.name}</span>
                      </div>

                      <div className="flex items-center justify-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{professional.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-sm text-gray-600">{professional.trustCount} trust</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {professional.bio}
                      </p>

                      <div className="mb-4">
                        <span className="text-lg font-semibold text-blue-600">{professional.rate}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <Link href={`/service-checkout/${professional.id}`}>
                          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Hire Now
                          </button>
                        </Link>
                        
                        <div className="flex gap-2">
                          <Link href={`/professional/${professional.id}`} className="flex-1">
                            <button className="w-full flex items-center justify-center gap-1 px-3 py-2 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors text-sm">
                              <Eye className="w-4 h-4" />
                              Profile
                            </button>
                          </Link>
                          
                          <button
                            onClick={() => openChat(professional)}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
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
          )
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
    </div>
  );
}