import { useState } from 'react';
import { MapPin, Filter, Search, Home, Building, Calendar, SlidersHorizontal, Grid3X3, List, Eye, Heart, Share2, Wifi, Car, Bath, Bed, MapPin as LocationIcon, DollarSign, TrendingUp, Shield, Star } from 'lucide-react';
import { realEstate } from '../data/demoData';
import RealEstateCard from '../components/RealEstateCard';

export default function RealEstate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState(new Set());

  const propertyTypes = [
    { id: 'all', label: 'All Properties', count: realEstate.length },
    { id: 'apartment', label: 'Apartments', count: realEstate.filter(p => p.title.toLowerCase().includes('apartment')).length },
    { id: 'house', label: 'Houses', count: realEstate.filter(p => p.title.toLowerCase().includes('house') || p.title.toLowerCase().includes('duplex')).length },
    { id: 'commercial', label: 'Commercial', count: realEstate.filter(p => p.title.toLowerCase().includes('commercial') || p.title.toLowerCase().includes('building')).length }
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-50k', label: 'Under 50,000 CFA' },
    { id: '50k-200k', label: '50,000 - 200,000 CFA' },
    { id: '200k-500k', label: '200,000 - 500,000 CFA' },
    { id: 'above-500k', label: 'Above 500,000 CFA' },
    { id: 'sale-only', label: 'For Sale Only' }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'commercial-avenue', label: 'Commercial Avenue' },
    { id: 'ntarikon', label: 'Ntarikon' },
    { id: 'up-station', label: 'Up Station' },
    { id: 'nkwen', label: 'Nkwen' },
    { id: 'main-market', label: 'Main Market Area' }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'most-trusted', label: 'Most Trusted' }
  ];

  const filteredProperties = realEstate.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesType = selectedType === 'all';
    if (selectedType === 'apartment') {
      matchesType = property.title.toLowerCase().includes('apartment') || property.title.toLowerCase().includes('studio');
    } else if (selectedType === 'house') {
      matchesType = property.title.toLowerCase().includes('house') || property.title.toLowerCase().includes('duplex');
    } else if (selectedType === 'commercial') {
      matchesType = property.title.toLowerCase().includes('commercial') || property.title.toLowerCase().includes('building');
    }

    let matchesLocation = selectedLocation === 'all';
    if (selectedLocation !== 'all') {
      const locationMap: Record<string, string> = {
        'commercial-avenue': 'commercial avenue',
        'ntarikon': 'ntarikon',
        'up-station': 'up station',
        'nkwen': 'nkwen',
        'main-market': 'main market'
      };
      matchesLocation = property.location.toLowerCase().includes(locationMap[selectedLocation] || '');
    }

    let matchesPrice = priceRange === 'all';
    if (priceRange === 'sale-only') {
      matchesPrice = !property.price.toLowerCase().includes('month');
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setShowPropertyModal(true);
  };

  const handleToggleFavorite = (propertyId) => {
    const newFavorites = new Set(favoriteProperties);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavoriteProperties(newFavorites);
  };

  const handleShare = (property) => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} - ${property.price}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${property.title} - ${property.price} - ${window.location.href}`);
      // Could add a toast notification here
    }
  };

  const handleContactOwner = (property) => {
    // Simulate contacting property owner
    const message = `Hi, I'm interested in your property: ${property.title}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/237670000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleScheduleViewing = (property) => {
    // Simulate scheduling a viewing
    const message = `Hi, I would like to schedule a viewing for: ${property.title}. When would be a convenient time?`;
    const whatsappUrl = `https://wa.me/237670000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewProfile = (property) => {
    // Close the property modal first
    setShowPropertyModal(false);
    // Navigate to profile page with vendor info
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">Verified Real Estate</h1>
            <p className="text-blue-100 text-sm">Trusted properties in Bamenda</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="px-4 py-4 max-w-7xl mx-auto">
          {/* Main Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by property name, location, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-sm"
            />
          </div>

          {/* Category and Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label} ({type.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Advanced Filters</span>
              </button>
              
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal size={20} />
                Advanced Filters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priceRanges.map((range) => (
                      <option key={range.id} value={range.id}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                    setSortBy('newest');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Simple Results Counter */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProperties.length > 0 ? `${filteredProperties.length} Properties Available` : 'No Properties Found'}
          </h2>
        </div>

        {/* Properties Display */}
        {filteredProperties.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredProperties.map((property) => (
              viewMode === 'grid' ? (
                <div key={property.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {property.verified && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Shield size={12} />
                            Verified
                          </span>
                        )}
                        <button 
                          onClick={() => handleToggleFavorite(property.id)}
                          className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                        >
                          <Heart 
                            size={16} 
                            className={favoriteProperties.has(property.id) ? "text-red-500 fill-current" : "text-gray-600"} 
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {property.price}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {property.title}
                      </h3>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <LocationIcon size={16} className="mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1 text-blue-600">
                            <Eye size={14} />
                            <span>{property.trustCount}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleShare(property)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Share2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleViewProperty(property)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-64">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-48 sm:h-full object-cover"
                      />
                      {property.verified && (
                        <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Shield size={12} />
                          Verified
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl text-gray-900">{property.title}</h3>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleToggleFavorite(property.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Heart 
                              size={18} 
                              className={favoriteProperties.has(property.id) ? "text-red-500 fill-current" : "text-gray-400"} 
                            />
                          </button>
                          <button 
                            onClick={() => handleShare(property)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <LocationIcon size={16} className="mr-2" />
                        <span>{property.location}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                          {property.price}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Eye size={16} />
                            <span>{property.trustCount} views</span>
                          </div>
                          <button 
                            onClick={() => handleViewProperty(property)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                          >
                            View Property
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="max-w-md mx-auto">
              <Home size={64} className="mx-auto mb-6 text-gray-300" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedLocation('all');
                    setPriceRange('all');
                  }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Browse All Properties
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Find Your Dream Property?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Connect with trusted property owners and real estate professionals in Bamenda. 
              Get personalized assistance for your property search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleContactOwner(filteredProperties[0])}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Property Owner
              </button>
              <button 
                onClick={() => handleScheduleViewing(filteredProperties[0])}
                className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule Viewing
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {showPropertyModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="w-full h-40 md:h-48 object-cover rounded-t-xl"
              />
              <button 
                onClick={() => setShowPropertyModal(false)}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full transition-colors"
              >
                <div className="w-4 h-4 flex items-center justify-center text-gray-600 font-bold">×</div>
              </button>
              <div className="absolute top-2 left-2 flex gap-1">
                {selectedProperty.verified && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Shield size={10} />
                    Verified
                  </span>
                )}
                <button 
                  onClick={() => handleToggleFavorite(selectedProperty.id)}
                  className="bg-white/90 hover:bg-white p-1.5 rounded-full transition-colors"
                >
                  <Heart 
                    size={14} 
                    className={favoriteProperties.has(selectedProperty.id) ? "text-red-500 fill-current" : "text-gray-600"} 
                  />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded-full">
                <span className="text-lg font-bold">{selectedProperty.price}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900">{selectedProperty.title}</h2>
                <button 
                  onClick={() => handleShare(selectedProperty)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <LocationIcon size={14} className="mr-1" />
                <span className="text-sm">{selectedProperty.location}</span>
              </div>

              {/* Vendor Information */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Property Owner</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedProperty.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">Professional Property Owner</h4>
                      {selectedProperty.verified && (
                        <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                          <Shield size={10} />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Home size={12} />
                        <span>15+ Properties</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{selectedProperty.trustCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button 
                      onClick={() => handleContactOwner(selectedProperty)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Contact
                    </button>
                    <button 
                      onClick={() => handleViewProfile(selectedProperty)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Property Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Property Type</span>
                      <span className="font-medium text-sm">
                        {selectedProperty.title.toLowerCase().includes('apartment') ? 'Apartment' :
                         selectedProperty.title.toLowerCase().includes('duplex') ? 'Duplex' :
                         selectedProperty.title.toLowerCase().includes('house') ? 'House' :
                         selectedProperty.title.toLowerCase().includes('studio') ? 'Studio' :
                         selectedProperty.title.toLowerCase().includes('commercial') ? 'Commercial' : 'Property'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Listing Type</span>
                      <span className="font-medium text-sm">
                        {selectedProperty.price.includes('month') ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Views</span>
                      <span className="font-medium text-sm">{selectedProperty.trustCount} views</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-gray-600 text-sm">Status</span>
                      <span className={`font-medium text-sm ${selectedProperty.verified ? 'text-green-600' : 'text-gray-500'}`}>
                        {selectedProperty.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Features & Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Wifi size={14} className="text-blue-600" />
                      <span className="text-xs">WiFi Ready</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Car size={14} className="text-green-600" />
                      <span className="text-xs">Parking</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Building size={14} className="text-purple-600" />
                      <span className="text-xs">Modern Design</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Shield size={14} className="text-orange-600" />
                      <span className="text-xs">Security</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This beautiful property in {selectedProperty.location} offers modern living with excellent accessibility to local amenities. 
                  The property features contemporary design elements and is situated in one of Bamenda's most sought-after neighborhoods. 
                  Perfect for those seeking quality accommodation in a prime location with easy access to markets, schools, and transportation.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => handleContactOwner(selectedProperty)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    Contact Owner
                  </button>
                  <button 
                    onClick={() => handleScheduleViewing(selectedProperty)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Calendar size={16} />
                    Schedule Viewing
                  </button>
                </div>
                <div className="flex justify-center mt-3">
                  <button 
                    onClick={() => setShowPropertyModal(false)}
                    className="text-gray-500 hover:text-gray-700 px-4 py-1 text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}