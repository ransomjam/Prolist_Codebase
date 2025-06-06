import { useState } from 'react';
import { Search, Filter, Star, Shield, MessageCircle, Eye, User, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Link } from 'wouter';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
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

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Verified Services</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover trusted professionals offering quality online services in Bamenda
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{dummyProfessionals.length}</div>
                <div className="text-sm text-blue-100">Verified Professionals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">{serviceCategories.length}</div>
                <div className="text-sm text-blue-100">Service Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex overflow-x-auto">
            {categoryTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedCategory(type.id)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedCategory === type.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {type.label}
                <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search professionals by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                  showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 border-l border-gray-200 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View Options</label>
                <Link href="/service-listings">
                  <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    Service Listings
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''} Found
          </h2>
        </div>

        {/* Professionals Grid/List */}
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No professionals found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProfessionals.map((professional) => {
              const category = serviceCategories.find(cat => cat.id === professional.category);
              
              return (
                <div
                  key={professional.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                    viewMode === 'list' ? 'flex p-6 gap-6' : 'p-6'
                  }`}
                >
                  {/* Professional Image */}
                  <div className={viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}>
                    <img
                      src={professional.avatar}
                      alt={professional.name}
                      className={`rounded-full object-cover border-2 border-gray-200 ${
                        viewMode === 'list' ? 'w-20 h-20' : 'w-24 h-24 mx-auto'
                      }`}
                    />
                  </div>

                  {/* Professional Info */}
                  <div className={`flex-1 ${viewMode === 'list' ? '' : 'text-center'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                      <h3 className="font-bold text-gray-800 text-lg">{professional.name}</h3>
                      {professional.verified && (
                        <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-2 mb-3 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                      <div className={`w-3 h-3 bg-gradient-to-r ${category?.color} rounded-full`}></div>
                      <span className="text-gray-600">{category?.name}</span>
                    </div>

                    <div className={`flex items-center space-x-4 mb-3 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{professional.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm text-gray-600">{professional.trustCount} trust</span>
                      </div>
                    </div>

                    <p className={`text-gray-600 mb-4 ${viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                      {professional.bio}
                    </p>

                    <div className={`flex items-center mb-4 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                      <span className="text-lg font-semibold text-blue-600">{professional.rate}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-2 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                      <Link href={`/professional/${professional.id}`}>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Profile</span>
                        </button>
                      </Link>
                      
                      <button
                        onClick={() => openChat(professional)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">Chat</span>
                      </button>

                      <Link href={`/service-checkout/${professional.id}`}>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                          Hire Now
                        </button>
                      </Link>
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
    </div>
  );
}