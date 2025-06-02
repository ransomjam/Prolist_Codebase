import { useState } from 'react';
import { MapPin, Filter, Search, Home, Building, Calendar, SlidersHorizontal, Grid3X3, List, Eye, Heart, Share2, Wifi, Car, Bath, Bed, MapPin as LocationIcon, DollarSign, TrendingUp, Shield } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Premium Real Estate</h1>
            <p className="text-blue-100 text-lg">Discover exceptional properties in Bamenda's prime locations</p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{realEstate.length}</div>
                <div className="text-blue-200 text-sm">Premium Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-blue-200 text-sm">Prime Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-blue-200 text-sm">Verified Listings</div>
              </div>
            </div>
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

          {/* Quick Filter Tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedType === type.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label} ({type.count})
                </button>
              ))}
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
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length > 0 ? `${filteredProperties.length} Properties Found` : 'No Properties Found'}
            </h2>
            {filteredProperties.length > 0 && (
              <p className="text-gray-600 mt-1">
                {selectedType !== 'all' && `${propertyTypes.find(t => t.id === selectedType)?.label} • `}
                {selectedLocation !== 'all' && `${locations.find(l => l.id === selectedLocation)?.label} • `}
                Premium listings in Bamenda
              </p>
            )}
          </div>
          
          {filteredProperties.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <TrendingUp size={16} />
                <span>Market trends available</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{filteredProperties.reduce((sum, p) => sum + (p.trustCount || 0), 0)} total views</span>
              </div>
            </div>
          )}
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
                        <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                          <Heart size={16} className="text-gray-600" />
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
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Share2 size={16} />
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
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
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={18} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
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
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
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
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Property Owner
              </button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule Viewing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}